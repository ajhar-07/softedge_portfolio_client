import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  heroBadge: 'Physical Security Solutions',
  heroTitle: 'Biometric Access + CCTV Surveillance',
  breadcrumbTitle: 'Biometric + CCTV',
  whyBadge: 'Why This Matters',
  whyTitle: 'Integrated Security For People, Assets, and Data',
  whyDescription: '',
  whyDescriptionBottom: '',
  implementationTitle: 'Implementation Flow',
  coverageTitle: 'Coverage Environments',
  complianceTitle: 'Compliance & Security Governance',
  complianceDescription: '',
  stackTitle: 'Recommended Technology Stack',
  supportTitle: 'Operations & Support Plans',
  faqTitle: 'FAQ & Next Step',
  ctaButtonText: 'Request Consultation',
  ctaButtonLink: '/services',
}

const sectionConfig = {
  metrics: { title: 'Metrics', fields: ['value', 'label'] },
  coreModules: { title: 'Core Modules', fields: ['title', 'description', 'points'] },
  projectFlow: { title: 'Implementation Flow Items', fields: ['text'] },
  coverageItems: { title: 'Coverage Items', fields: ['text'] },
  hardwareStack: { title: 'Hardware Stack', fields: ['title', 'items'] },
  compliancePoints: { title: 'Compliance Points', fields: ['text'] },
  servicePlans: { title: 'Support Plans', fields: ['name', 'details'] },
  faqItems: { title: 'FAQ Items', fields: ['q', 'a'] },
}

const pageFieldGroups = [
  {
    title: 'Hero Section',
    fields: ['heroBadge', 'heroTitle', 'breadcrumbTitle', 'heroImage'],
  },
  {
    title: 'Overview Section',
    fields: ['whyBadge', 'whyTitle', 'whyDescription', 'whyDescriptionBottom'],
  },
  {
    title: 'Section Headings',
    fields: ['implementationTitle', 'coverageTitle', 'complianceTitle', 'stackTitle', 'supportTitle', 'faqTitle'],
  },
  {
    title: 'Compliance + CTA',
    fields: ['complianceDescription', 'ctaButtonText', 'ctaButtonLink'],
  },
]

const fieldLabelMap = {
  heroImage: 'Hero Image URL',
  heroBadge: 'Hero Badge',
  heroTitle: 'Hero Title',
  breadcrumbTitle: 'Breadcrumb Title',
  whyBadge: 'Why Section Badge',
  whyTitle: 'Why Section Title',
  whyDescription: 'Why Section Description',
  whyDescriptionBottom: 'Why Section Bottom Description',
  implementationTitle: 'Implementation Title',
  coverageTitle: 'Coverage Title',
  complianceTitle: 'Compliance Title',
  complianceDescription: 'Compliance Description',
  stackTitle: 'Technology Stack Title',
  supportTitle: 'Support Section Title',
  faqTitle: 'FAQ Section Title',
  ctaButtonText: 'CTA Button Text',
  ctaButtonLink: 'CTA Button Link',
}

const initialSectionForms = Object.fromEntries(
  Object.entries(sectionConfig).map(([key, config]) => [
    key,
    Object.fromEntries(config.fields.map((field) => [field, ''])),
  ]),
)

function toMultiline(value) {
  return Array.isArray(value) ? value.join('\n') : value || ''
}

function fromMultiline(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function displayFieldLabel(field) {
  return fieldLabelMap[field] || field
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
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

export default function BiometricCCTVManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialSectionForms)
  const [pageData, setPageData] = useState(null)
  const [editing, setEditing] = useState({})
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
      const data = await apiRequest('/api/biometric-cctv-page')
      setPageData(data)
      setPageForm({
        ...initialPageForm,
        ...Object.fromEntries(Object.keys(initialPageForm).map((key) => [key, data[key] || initialPageForm[key]])),
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load biometric cctv page data')
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
    setSectionForms((current) => ({ ...current, [section]: { ...current[section], [name]: value } }))
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    setSavingPage(true)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest('/api/biometric-cctv-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'Biometric CCTV page updated successfully')
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
      const current = sectionForms[section]
      const payload = { ...current }
      if ('points' in payload) payload.points = fromMultiline(payload.points)
      if ('items' in payload) payload.items = fromMultiline(payload.items)

      const editingId = editing[section]
      const path = editingId ? `/api/biometric-cctv-page/${section}/${editingId}` : `/api/biometric-cctv-page/${section}`
      const method = editingId ? 'PATCH' : 'POST'
      const result = await apiRequest(path, { method, body: JSON.stringify(payload) })
      setMessage(result.message || `${sectionConfig[section].title} updated successfully`)
      setSectionForms((currentState) => ({ ...currentState, [section]: initialSectionForms[section] }))
      setEditing((currentState) => ({ ...currentState, [section]: '' }))
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save section item')
    } finally {
      setSavingSection('')
    }
  }

  const handleEditItem = (section, item) => {
    const config = sectionConfig[section]
    const nextValues = Object.fromEntries(
      config.fields.map((field) => [field, field === 'points' || field === 'items' ? toMultiline(item[field]) : item[field] || '']),
    )
    setSectionForms((current) => ({ ...current, [section]: nextValues }))
    setEditing((current) => ({ ...current, [section]: item._id }))
    setMessage('')
    setError('')
  }

  const handleDeleteItem = async (section, itemId) => {
    setDeletingKey(`${section}-${itemId}`)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`/api/biometric-cctv-page/${section}/${itemId}`, { method: 'DELETE' })
      setMessage(result.message || 'Item deleted successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete item')
    } finally {
      setDeletingKey('')
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingField('heroImage')
    setMessage('')
    setError('')
    try {
      const url = await uploadFile(file)
      setPageForm((current) => ({ ...current, heroImage: url }))
      setMessage('Hero image uploaded successfully')
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload hero image')
    } finally {
      setUploadingField('')
      event.target.value = ''
    }
  }

  return (
    <DashboardShell
      title="Biometric + CCTV Management"
      subtitle="Ei dashboard theke BiometricCCTV page er shokol content (hero, modules, flow, stack, compliance, plans, FAQ) CRUD korte parbe."
    >
      <div className="space-y-4">
        {message ? <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">{message}</div> : null}
        {error ? <div className="rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-2 text-sm text-red-100">{error}</div> : null}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">Page Settings</h2>
              <p className="mt-1 text-xs text-white/65">Header, section titles, descriptions, and CTA controls</p>
            </div>
            <button type="button" onClick={loadPageData} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/90">Refresh</button>
          </div>
          <form className="mt-4 space-y-2.5" onSubmit={handlePageSubmit}>
            {pageFieldGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#00d2ff]">{group.title}</p>
                <div className="grid gap-2.5 grid-cols-1">
                  {group.fields.map((key) => (
                    <label key={key} className="block">
                      <span className="mb-1 block text-[11px] text-white/80">{displayFieldLabel(key)}</span>
                      {key.toLowerCase().includes('description') ? (
                        <textarea
                          name={key}
                          rows={2}
                          value={pageForm[key]}
                          onChange={handlePageChange}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                        />
                      ) : (
                        <input
                          name={key}
                          value={pageForm[key]}
                          onChange={handlePageChange}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <label className="block">
              <span className="mb-1 block text-[11px] text-white/80">Upload Hero Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadingField === 'heroImage'}
                className="block w-full text-[11px] text-white/90 file:mr-2 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1.5 file:text-black"
              />
              {uploadingField === 'heroImage' ? <p className="mt-1 text-xs text-white/70">Uploading image...</p> : null}
            </label>
            <button type="submit" disabled={savingPage || loading} className="rounded-xl bg-[#00d2ff] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e]">
              {savingPage ? 'Saving...' : 'Save Page Content'}
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          {Object.keys(sectionConfig).map((section) => (
            <div key={section} className="rounded-[24px] border border-white/10 bg-[#000b1e]/40 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{sectionConfig[section].title}</h3>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80">
                  {(pageData?.[section] || []).length} items
                </span>
              </div>
              <form className="mt-3 space-y-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3" onSubmit={(event) => handleSectionSubmit(section, event)}>
                {sectionConfig[section].fields.map((field) => (
                  <div key={`${section}-${field}`}>
                    <p className="mb-1 text-[11px] text-white/75">{displayFieldLabel(field)}</p>
                    {field === 'description' || field === 'details' || field === 'a' || field === 'points' || field === 'items' ? (
                      <textarea
                        name={field}
                        rows={field === 'points' || field === 'items' ? 3 : 2}
                        placeholder={field === 'points' || field === 'items' ? 'One item per line' : ''}
                        value={sectionForms[section][field]}
                        onChange={(event) => handleSectionFormChange(section, event)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                      />
                    ) : (
                      <input
                        name={field}
                        value={sectionForms[section][field]}
                        onChange={(event) => handleSectionFormChange(section, event)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                      />
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  {editing[section] ? (
                    <span className="text-xs text-[#00d2ff]">Editing selected item</span>
                  ) : (
                    <span className="text-xs text-white/60">Create a new item</span>
                  )}
                  <button type="submit" disabled={savingSection === section} className="rounded-xl bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e]">
                  {savingSection === section ? 'Saving...' : editing[section] ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>

              <ul className="mt-3 grid gap-2">
                {(pageData?.[section] || []).map((item) => (
                  <li key={item._id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <p className="text-sm text-white">{item.title || item.name || item.label || item.value || item.text || item.q}</p>
                    {(item.description || item.details || item.a) ? (
                      <p className="text-xs text-white/70">{item.description || item.details || item.a}</p>
                    ) : null}
                    {item.points?.length ? (
                      <p className="mt-1 text-xs text-white/60">Points: {item.points.join(', ')}</p>
                    ) : null}
                    {item.items?.length ? (
                      <p className="mt-1 text-xs text-white/60">Items: {item.items.join(', ')}</p>
                    ) : null}
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => handleEditItem(section, item)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/90">Edit</button>
                      <button type="button" onClick={() => handleDeleteItem(section, item._id)} disabled={deletingKey === `${section}-${item._id}`} className="rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-200">
                        {deletingKey === `${section}-${item._id}` ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

