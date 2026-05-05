import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_PAGE = '/api/domain-hosting-server-page'

const DASHBOARD_SECTIONS = [
  'quickLinks',
  'domainServices',
  'hostingStacks',
  'serverOpsFlow',
  'supportPackages',
  'securityCoverage',
  'migrationChecklist',
  'platformCoverage',
  'reliabilityMetrics',
  'faqs',
]

const initialPageForm = {
  heroImage: '',
  badge: 'Domain + Hosting + Server Excellence',
  title: 'Domain, Hosting, Server Management & Support Packages',
  subtitle: '',
}

const initialForms = {
  quickLinks: { label: '', to: '' },
  domainServices: { title: '', detail: '' },
  hostingStacks: { type: '', useCase: '', featuresInput: '' },
  serverOpsFlow: { step: '01', heading: '', text: '' },
  supportPackages: { name: '', timeline: '', featuresInput: '', price: '' },
  securityCoverage: { title: '', pointsInput: '' },
  migrationChecklist: { text: '' },
  platformCoverage: { name: '', detail: '' },
  reliabilityMetrics: { value: '', label: '' },
  faqs: { q: '', a: '' },
}

const sectionLabels = {
  quickLinks: 'Quick links',
  domainServices: 'Domain services',
  hostingStacks: 'Hosting stacks',
  serverOpsFlow: 'Server operations flow',
  supportPackages: 'Support packages',
  securityCoverage: 'Security coverage',
  migrationChecklist: 'Migration checklist',
  platformCoverage: 'Platform coverage',
  reliabilityMetrics: 'Reliability metrics',
  faqs: 'FAQs',
}

const initialEditing = DASHBOARD_SECTIONS.reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {})

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'Request failed')
  return data
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${API_BASE_URL}/api/upload`, { method: 'POST', body: formData })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'File upload failed')
  const fileUrl = data?.file?.url ? `${API_BASE_URL}${data.file.url}` : ''
  if (!fileUrl) throw new Error('Uploaded file URL not found')
  return fileUrl
}

export default function DomainHostingManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialForms)
  const [editing, setEditing] = useState(initialEditing)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingSection, setSavingSection] = useState('')
  const [deletingKey, setDeletingKey] = useState('')
  const [uploadingField, setUploadingField] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest(API_PAGE)
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        badge: data.badge || initialPageForm.badge,
        title: data.title || initialPageForm.title,
        subtitle: data.subtitle || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load domain hosting server data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPageData()
  }, [])

  const handlePageChange = (event) => {
    const { name, value } = event.target
    setPageForm((current) => ({ ...current, [name]: value }))
  }

  const handleSectionFormChange = (section, event) => {
    const { name, value } = event.target
    setSectionForms((current) => ({
      ...current,
      [section]: { ...current[section], [name]: value },
    }))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingField('heroImage')
    setMessage('')
    setError('')
    try {
      const uploadedUrl = await uploadFile(file)
      setPageForm((current) => ({ ...current, heroImage: uploadedUrl }))
      setMessage('heroImage uploaded successfully')
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload file')
    } finally {
      setUploadingField('')
      event.target.value = ''
    }
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    setSavingPage(true)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(API_PAGE, { method: 'PUT', body: JSON.stringify(pageForm) })
      setMessage(result.message || 'Domain hosting server page updated successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const getSectionPayload = (section) => {
    const form = sectionForms[section]
    if (section === 'hostingStacks' || section === 'supportPackages') {
      return {
        ...form,
        features: form.featuresInput.split(',').map((item) => item.trim()).filter(Boolean),
      }
    }
    if (section === 'securityCoverage') {
      return {
        title: form.title,
        points: form.pointsInput.split(',').map((item) => item.trim()).filter(Boolean),
      }
    }
    return form
  }

  const handleSectionSubmit = async (section, event) => {
    event.preventDefault()
    setSavingSection(section)
    setMessage('')
    setError('')
    try {
      const editingId = editing[section]
      const path = editingId ? `${API_PAGE}/${section}/${editingId}` : `${API_PAGE}/${section}`
      const method = editingId ? 'PATCH' : 'POST'
      const result = await apiRequest(path, { method, body: JSON.stringify(getSectionPayload(section)) })
      setMessage(result.message || `${sectionLabels[section]} updated successfully`)
      setSectionForms((current) => ({ ...current, [section]: initialForms[section] }))
      setEditing((current) => ({ ...current, [section]: '' }))
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save section item')
    } finally {
      setSavingSection('')
    }
  }

  const handleEditItem = (section, item) => {
    let nextForm
    if (section === 'quickLinks') nextForm = { label: item.label || '', to: item.to || '' }
    else if (section === 'domainServices') nextForm = { title: item.title || '', detail: item.detail || '' }
    else if (section === 'hostingStacks') {
      nextForm = { type: item.type || '', useCase: item.useCase || '', featuresInput: Array.isArray(item.features) ? item.features.join(', ') : '' }
    } else if (section === 'serverOpsFlow') nextForm = { step: item.step || '', heading: item.heading || '', text: item.text || '' }
    else if (section === 'supportPackages') {
      nextForm = {
        name: item.name || '',
        timeline: item.timeline || '',
        featuresInput: Array.isArray(item.features) ? item.features.join(', ') : '',
        price: item.price || '',
      }
    } else if (section === 'securityCoverage') {
      nextForm = { title: item.title || '', pointsInput: Array.isArray(item.points) ? item.points.join(', ') : '' }
    } else if (section === 'migrationChecklist') nextForm = { text: item.text || item || '' }
    else if (section === 'platformCoverage') nextForm = { name: item.name || '', detail: item.detail || '' }
    else if (section === 'reliabilityMetrics') nextForm = { value: item.value || '', label: item.label || '' }
    else nextForm = { q: item.q || '', a: item.a || '' }

    setSectionForms((current) => ({ ...current, [section]: nextForm }))
    setEditing((current) => ({ ...current, [section]: item._id }))
    setMessage('')
    setError('')
  }

  const handleDeleteItem = async (section, itemId) => {
    setDeletingKey(`${section}-${itemId}`)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`${API_PAGE}/${section}/${itemId}`, { method: 'DELETE' })
      setMessage(result.message || `${sectionLabels[section]} item deleted successfully`)
      if (editing[section] === itemId) {
        setEditing((current) => ({ ...current, [section]: '' }))
        setSectionForms((current) => ({ ...current, [section]: initialForms[section] }))
      }
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete section item')
    } finally {
      setDeletingKey('')
    }
  }

  const handleCancelEdit = (section) => {
    setEditing((current) => ({ ...current, [section]: '' }))
    setSectionForms((current) => ({ ...current, [section]: initialForms[section] }))
  }

  const renderSectionForm = (section) => {
    const form = sectionForms[section]
    const editingId = editing[section]
    return (
      <form className="mt-5 space-y-4" onSubmit={(event) => handleSectionSubmit(section, event)}>
        {section === 'quickLinks' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Label" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="to" value={form.to} onChange={(event) => handleSectionFormChange(section, event)} placeholder="/domain-hosting-server-management" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'domainServices' ? (
          <>
            <input type="text" name="title" value={form.title} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Service title" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="detail" value={form.detail} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Service detail" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'hostingStacks' ? (
          <>
            <input type="text" name="type" value={form.type} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Stack type" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="useCase" value={form.useCase} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Use case" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="featuresInput" value={form.featuresInput} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Feature 1, Feature 2, Feature 3" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'serverOpsFlow' ? (
          <>
            <input type="text" name="step" value={form.step} onChange={(event) => handleSectionFormChange(section, event)} placeholder="01" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="heading" value={form.heading} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Heading" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Flow text" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'supportPackages' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Package name" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="timeline" value={form.timeline} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Timeline" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="featuresInput" value={form.featuresInput} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Feature 1, Feature 2, Feature 3" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="price" value={form.price} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Price" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'securityCoverage' ? (
          <>
            <input type="text" name="title" value={form.title} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Coverage title" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="pointsInput" value={form.pointsInput} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Point 1, Point 2, Point 3" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'migrationChecklist' ? (
          <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Checklist item" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
        ) : null}
        {section === 'platformCoverage' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Platform name" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="detail" value={form.detail} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Platform detail" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'reliabilityMetrics' ? (
          <>
            <input type="text" name="value" value={form.value} onChange={(event) => handleSectionFormChange(section, event)} placeholder="99.95%" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Metric label" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        {section === 'faqs' ? (
          <>
            <input type="text" name="q" value={form.q} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Question" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="a" value={form.a} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Answer" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={savingSection === section} className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70">
            {savingSection === section ? 'Saving...' : editingId ? 'Update item' : 'Create item'}
          </button>
          {editingId ? (
            <button type="button" onClick={() => handleCancelEdit(section)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22">
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>
    )
  }

  const renderItemTitle = (section, item) => {
    if (section === 'quickLinks') return item.label
    if (section === 'domainServices') return item.title
    if (section === 'hostingStacks') return item.type
    if (section === 'serverOpsFlow') return `${item.step || ''} - ${item.heading || ''}`
    if (section === 'supportPackages') return item.name
    if (section === 'securityCoverage') return item.title
    if (section === 'migrationChecklist') return 'Checklist item'
    if (section === 'platformCoverage') return item.name
    if (section === 'reliabilityMetrics') return item.label
    return item.q
  }

  const renderItemDescription = (section, item) => {
    if (section === 'quickLinks') return item.to
    if (section === 'domainServices') return item.detail
    if (section === 'hostingStacks') {
      const features = Array.isArray(item.features) ? item.features.join(' | ') : ''
      return `${item.useCase || ''} | ${features}`
    }
    if (section === 'serverOpsFlow') return item.text
    if (section === 'supportPackages') {
      const features = Array.isArray(item.features) ? item.features.join(' | ') : ''
      return `${features} | ${item.timeline || ''} | ${item.price || ''}`
    }
    if (section === 'securityCoverage') return Array.isArray(item.points) ? item.points.join(' | ') : ''
    if (section === 'migrationChecklist') return item.text || item
    if (section === 'platformCoverage') return item.detail
    if (section === 'reliabilityMetrics') return item.value
    return item.a
  }

  return (
    <DashboardShell
      title="Domain hosting management"
      subtitle={
        <>
          Public page:{' '}
          <Link to="/domain-hosting-server-management" className="text-[#00d2ff] underline hover:text-white">
            /domain-hosting-server-management
          </Link>{' '}
          — domain, hosting, server and support sections — CRUD from here.
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero</h2>
              </div>
              <button type="button" onClick={loadPageData} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22">
                Refresh
              </button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handlePageSubmit}>
              {[
                ['badge', 'Badge'],
                ['title', 'Title'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label}</span>
                  <input type="text" name={name} value={pageForm[name]} onChange={handlePageChange} className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40" />
                </label>
              ))}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Subtitle</span>
                <textarea name="subtitle" value={pageForm.subtitle} onChange={handlePageChange} rows="4" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Hero image upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]" />
                <p className="mt-2 text-xs text-white/50">{uploadingField === 'heroImage' ? 'Uploading...' : 'Choose an image file'}</p>
                {pageForm.heroImage ? <p className="mt-2 break-all text-xs text-white/45">{pageForm.heroImage}</p> : null}
              </label>
              <button type="submit" disabled={savingPage || Boolean(uploadingField)} className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70">
                {savingPage ? 'Saving...' : 'Save page content'}
              </button>
            </form>
          </div>
          {DASHBOARD_SECTIONS.map((section) => (
            <div key={section} className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{sectionLabels[section]}</p>
              <h2 className="mt-3 text-2xl font-black text-white">Manage {sectionLabels[section]}</h2>
              {renderSectionForm(section)}
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Current data</p>
          <h2 className="mt-3 text-2xl font-black text-white">Live API content</h2>
          {message ? <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p> : null}
          {error ? <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
          <div className="mt-6 space-y-5">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">Loading...</div>
            ) : pageData ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
                  <p className="font-bold text-white/90">Scalars snapshot</p>
                  <p className="mt-2 break-words"><span className="text-[#00d2ff]">title:</span> {pageData.title}</p>
                  <p className="mt-1 break-words"><span className="text-[#00d2ff]">badge:</span> {pageData.badge}</p>
                </div>
                {DASHBOARD_SECTIONS.map((section) => (
                  <div key={section} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-lg font-bold text-white">{sectionLabels[section]}</h3>
                    <div className="mt-4 space-y-3">
                      {(pageData[section] || []).length ? (
                        pageData[section].map((item) => (
                          <div key={item._id} className="rounded-2xl border border-white/10 bg-[#0a3146]/22 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <p className="text-base font-bold text-white">{renderItemTitle(section, item)}</p>
                                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-white/68">{renderItemDescription(section, item)}</p>
                              </div>
                              <div className="flex shrink-0 flex-wrap gap-2">
                                <button type="button" onClick={() => handleEditItem(section, item)} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#00d2ff]/22">Edit</button>
                                <button type="button" onClick={() => handleDeleteItem(section, item._id)} disabled={deletingKey === `${section}-${item._id}`} className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-65">
                                  {deletingKey === `${section}-${item._id}` ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-white/68">
                          No items in {sectionLabels[section]}.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
