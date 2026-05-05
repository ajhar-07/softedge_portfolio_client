import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_PAGE = '/api/landing-page-design-page'

const DASHBOARD_SECTIONS = [
  'quickActions',
  'campaignTypes',
  'sectionBlocks',
  'processFlow',
  'conversionStats',
  'pricingCards',
  'faqs',
]

const initialPageForm = {
  heroImage: '',
  badge: 'Conversion-Centric Design',
  title: 'Landing Page Design',
  subtitle: '',
}

const initialForms = {
  quickActions: { label: '', to: '' },
  campaignTypes: { type: '', detail: '', accent: '' },
  sectionBlocks: { heading: '', pointsInput: '' },
  processFlow: { step: 'Step 01', title: '', text: '' },
  conversionStats: { value: '', label: '' },
  pricingCards: { name: '', featuresInput: '', timeline: '', price: '' },
  faqs: { q: '', a: '' },
}

const sectionLabels = {
  quickActions: 'Quick action links',
  campaignTypes: 'Campaign types',
  sectionBlocks: 'Performance architecture blocks',
  processFlow: 'Execution process flow',
  conversionStats: 'Conversion stats',
  pricingCards: 'Pricing cards',
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

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'File upload failed')

  const fileUrl = data?.file?.url ? `${API_BASE_URL}${data.file.url}` : ''
  if (!fileUrl) throw new Error('Uploaded file URL not found')
  return fileUrl
}

export default function LandingPageManagement() {
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
      setError(requestError.message || 'Failed to load landing page data')
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

  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingField(fieldName)
    setMessage('')
    setError('')
    try {
      const uploadedUrl = await uploadFile(file)
      setPageForm((current) => ({ ...current, [fieldName]: uploadedUrl }))
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
      setMessage(result.message || 'Landing page updated successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const getSectionPayload = (section) => {
    const form = sectionForms[section]
    if (section === 'sectionBlocks') {
      return {
        heading: form.heading,
        points: form.pointsInput
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      }
    }
    if (section === 'pricingCards') {
      return {
        name: form.name,
        features: form.featuresInput
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        timeline: form.timeline,
        price: form.price,
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
      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(getSectionPayload(section)),
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
    if (section === 'quickActions') nextForm = { label: item.label || '', to: item.to || '' }
    else if (section === 'campaignTypes') nextForm = { type: item.type || '', detail: item.detail || '', accent: item.accent || '' }
    else if (section === 'sectionBlocks') {
      nextForm = {
        heading: item.heading || '',
        pointsInput: Array.isArray(item.points) ? item.points.join(', ') : '',
      }
    } else if (section === 'processFlow') nextForm = { step: item.step || '', title: item.title || '', text: item.text || '' }
    else if (section === 'conversionStats') nextForm = { value: item.value || '', label: item.label || '' }
    else if (section === 'pricingCards') {
      nextForm = {
        name: item.name || '',
        featuresInput: Array.isArray(item.features) ? item.features.join(', ') : '',
        timeline: item.timeline || '',
        price: item.price || '',
      }
    } else nextForm = { q: item.q || '', a: item.a || '' }

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
        {section === 'quickActions' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Label" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="to" value={form.to} onChange={(event) => handleSectionFormChange(section, event)} placeholder="/landing-page-design" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'campaignTypes' ? (
          <>
            <input type="text" name="type" value={form.type} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Campaign type" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="detail" value={form.detail} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Detail" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="accent" value={form.accent} onChange={(event) => handleSectionFormChange(section, event)} placeholder="from-[#00d2ff]/45 to-[#0c4d75]/45" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'sectionBlocks' ? (
          <>
            <input type="text" name="heading" value={form.heading} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Block heading" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="pointsInput" value={form.pointsInput} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Point 1, Point 2, Point 3" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'processFlow' ? (
          <>
            <input type="text" name="step" value={form.step} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Step 01" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="title" value={form.title} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Step title" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="text" value={form.text} onChange={(event) => handleSectionFormChange(section, event)} rows="3" placeholder="Step text" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'conversionStats' ? (
          <>
            <input type="text" name="value" value={form.value} onChange={(event) => handleSectionFormChange(section, event)} placeholder="+38%" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="label" value={form.label} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Average lead uplift" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
          </>
        ) : null}

        {section === 'pricingCards' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(event) => handleSectionFormChange(section, event)} placeholder="Package name" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <textarea name="featuresInput" value={form.featuresInput} onChange={(event) => handleSectionFormChange(section, event)} rows="4" placeholder="Feature 1, Feature 2, Feature 3" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="timeline" value={form.timeline} onChange={(event) => handleSectionFormChange(section, event)} placeholder="3-5 days" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
            <input type="text" name="price" value={form.price} onChange={(event) => handleSectionFormChange(section, event)} placeholder="From $120" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40" required />
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
    if (section === 'quickActions') return item.label
    if (section === 'campaignTypes') return item.type
    if (section === 'sectionBlocks') return item.heading
    if (section === 'processFlow') return `${item.step || ''} - ${item.title || ''}`
    if (section === 'conversionStats') return item.label
    if (section === 'pricingCards') return item.name
    return item.q
  }

  const renderItemDescription = (section, item) => {
    if (section === 'quickActions') return item.to
    if (section === 'campaignTypes') return `${item.detail || ''} (${item.accent || ''})`
    if (section === 'sectionBlocks') return Array.isArray(item.points) ? item.points.join(' | ') : ''
    if (section === 'processFlow') return item.text
    if (section === 'conversionStats') return item.value
    if (section === 'pricingCards') {
      const features = Array.isArray(item.features) ? item.features.join(' | ') : ''
      return `${features} | ${item.timeline || ''} | ${item.price || ''}`
    }
    return item.a
  }

  return (
    <DashboardShell
      title="Landing page management"
      subtitle={
        <>
          Public page:{' '}
          <Link to="/landing-page-design" className="text-[#00d2ff] underline hover:text-white">
            /landing-page-design
          </Link>{' '}
          — hero, campaign blocks, process, pricing and FAQs — CRUD from here.
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
                <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, 'heroImage')} className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]" />
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
