import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_PAGE = '/api/website-development-page'

const DASHBOARD_SECTIONS = [
  'introPoints',
  'quickLinks',
  'designPillars',
  'deliveryTracks',
  'packageGrid',
  'serviceDetails',
  'projectShowcase',
  'stack',
  'stats',
  'faqs',
]

const initialPageForm = {
  heroImage: '',
  eyebrow: 'Creative Web Studio',
  title: 'Website Design & Development',
  subtitle: '',
}

const initialForms = {
  introPoints: { text: '' },
  quickLinks: { label: '', to: '' },
  designPillars: { name: '', detail: '' },
  deliveryTracks: { track: 'Track 01', title: '', text: '' },
  packageGrid: { type: '', scope: '', eta: '', price: '' },
  serviceDetails: { title: '', text: '' },
  projectShowcase: {
    name: '',
    category: '',
    summary: '',
    liveLink: '',
    githubLink: '',
    image: '',
    techInput: '',
  },
  stack: { text: '' },
  stats: { value: '', label: '' },
  faqs: { q: '', a: '' },
}

const sectionLabels = {
  introPoints: 'What you get points',
  quickLinks: 'Quick links',
  designPillars: 'Design pillars',
  deliveryTracks: 'Delivery tracks',
  packageGrid: 'Package cards',
  serviceDetails: 'Service details',
  projectShowcase: 'Project showcase',
  stack: 'Tech stack chips',
  stats: 'Stats cards',
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
  if (!response.ok) {
    throw new Error(data?.error || 'Request failed')
  }
  return data
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.error || 'File upload failed')
  }

  const fileUrl = data?.file?.url ? `${API_BASE_URL}${data.file.url}` : ''
  if (!fileUrl) throw new Error('Uploaded file URL not found')
  return fileUrl
}

export default function WebsiteDevelopmentManagement() {
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
        eyebrow: data.eyebrow || initialPageForm.eyebrow,
        title: data.title || initialPageForm.title,
        subtitle: data.subtitle || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load website development page data')
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
      [section]: {
        ...current[section],
        [name]: value,
      },
    }))
  }

  const handleFileUpload = async (event, fieldName, section = '') => {
    const file = event.target.files?.[0]
    if (!file) return
    const uploadKey = section ? `${section}-${fieldName}` : fieldName
    setUploadingField(uploadKey)
    setMessage('')
    setError('')
    try {
      const uploadedUrl = await uploadFile(file)
      if (section) {
        setSectionForms((current) => ({
          ...current,
          [section]: { ...current[section], [fieldName]: uploadedUrl },
        }))
      } else {
        setPageForm((current) => ({ ...current, [fieldName]: uploadedUrl }))
      }
      setMessage(`${fieldName} uploaded successfully`)
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
      const result = await apiRequest(API_PAGE, {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'Website development page updated successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
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
      const form = sectionForms[section]
      const payload =
        section === 'projectShowcase'
          ? {
              name: form.name,
              category: form.category,
              summary: form.summary,
              liveLink: form.liveLink,
              githubLink: form.githubLink,
              image: form.image,
              tech: form.techInput
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            }
          : form

      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(payload),
      })
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
    if (section === 'introPoints' || section === 'stack') nextForm = { text: item.text || item || '' }
    else if (section === 'quickLinks') nextForm = { label: item.label || '', to: item.to || '' }
    else if (section === 'designPillars') nextForm = { name: item.name || '', detail: item.detail || '' }
    else if (section === 'deliveryTracks') nextForm = { track: item.track || '', title: item.title || '', text: item.text || '' }
    else if (section === 'packageGrid') {
      nextForm = { type: item.type || '', scope: item.scope || '', eta: item.eta || '', price: item.price || '' }
    } else if (section === 'serviceDetails') nextForm = { title: item.title || '', text: item.text || '' }
    else if (section === 'projectShowcase') {
      nextForm = {
        name: item.name || '',
        category: item.category || '',
        summary: item.summary || '',
        liveLink: item.liveLink || '',
        githubLink: item.githubLink || '',
        image: item.image || '',
        techInput: Array.isArray(item.tech) ? item.tech.join(', ') : '',
      }
    } else if (section === 'stats') nextForm = { value: item.value || '', label: item.label || '' }
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
        {section === 'introPoints' || section === 'stack' ? (
          <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Text" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
        ) : null}

        {section === 'quickLinks' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Label" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="to" value={form.to} onChange={(event) => handleSectionFormChange(section, event)} placeholder="/website-development" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'designPillars' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Name" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="detail" value={form.detail} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Detail" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'deliveryTracks' ? (
          <>
            <input type="text" name="track" value={form.track} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Track 01" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="title" value={form.title} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Text" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'packageGrid' ? (
          <>
            <input type="text" name="type" value={form.type} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Type" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="scope" value={form.scope} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Scope" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="eta" value={form.eta} onChange={(event) => handleSectionFormChange(section, event)} placeholder="ETA" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="price" value={form.price} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Price" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'serviceDetails' ? (
          <>
            <input type="text" name="title" value={form.title} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Text" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'projectShowcase' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Project name" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="category" value={form.category} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Category" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="summary" value={form.summary} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Summary" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="liveLink" value={form.liveLink} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Live link" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="githubLink" value={form.githubLink} onChange={(event) => handleSectionFormChange(section, event)} placeholder="GitHub link" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Project image upload</span>
              <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, 'image', section)} className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]" />
              <p className="mt-2 text-xs text-white/50">{uploadingField === 'projectShowcase-image' ? 'Uploading…' : 'Or paste URL'}</p>
              {form.image ? <p className="mt-2 break-all text-xs text-white/45">{form.image}</p> : null}
            </label>
            <input type="text" name="techInput" value={form.techInput} onChange={(event) => handleSectionFormChange(section, event)} placeholder="React, Tailwind, Node.js" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'stats' ? (
          <>
            <input type="text" name="value" value={form.value} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Value" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Label" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'faqs' ? (
          <>
            <input type="text" name="q" value={form.q} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Question" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="a" value={form.a} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Answer" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={savingSection === section || uploadingField === 'projectShowcase-image'} className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70">
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
    if (section === 'introPoints' || section === 'stack') return item.text || item
    if (section === 'quickLinks' || section === 'stats') return item.label
    if (section === 'designPillars') return item.name
    if (section === 'deliveryTracks') return `${item.track || ''} — ${item.title || ''}`
    if (section === 'packageGrid') return item.type
    if (section === 'serviceDetails') return item.title
    if (section === 'projectShowcase') return item.name
    return item.q
  }

  const renderItemDescription = (section, item) => {
    if (section === 'introPoints' || section === 'stack') return item.text || item
    if (section === 'quickLinks') return item.to
    if (section === 'designPillars') return item.detail
    if (section === 'deliveryTracks') return item.text
    if (section === 'packageGrid') return `Scope: ${item.scope} | ETA: ${item.eta} | Price: ${item.price}`
    if (section === 'serviceDetails') return item.text
    if (section === 'projectShowcase') return `${item.category} | ${item.summary}`
    if (section === 'stats') return item.value
    return item.a
  }

  return (
    <DashboardShell
      title="Website development management"
      subtitle={
        <>
          Public page:{' '}
          <Link to="/website-development" className="text-[#00d2ff] underline hover:text-white">
            /website-development
          </Link>{' '}
          — hero, details, tracks, packages, project showcase and FAQs — CRUD from here.
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
                ['eyebrow', 'Eyebrow'],
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
                <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, 'heroImage')} className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]" />
                <p className="mt-2 text-xs text-white/50">{uploadingField === 'heroImage' ? 'Uploading…' : 'Choose an image file'}</p>
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
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">Loading…</div>
            ) : pageData ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
                  <p className="font-bold text-white/90">Scalars snapshot</p>
                  <p className="mt-2 break-words"><span className="text-[#00d2ff]">title:</span> {pageData.title}</p>
                  <p className="mt-1 break-words"><span className="text-[#00d2ff]">eyebrow:</span> {pageData.eyebrow}</p>
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
                                  {deletingKey === `${section}-${item._id}` ? 'Deleting…' : 'Delete'}
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
