import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  heroTitle: 'IoT Smart Office/Home + Smart Board/ICT Lab',
  breadcrumbTitle: 'IoT Smart Office/Home',
  sectionBadge: 'Next Generation Infrastructure',
  sectionTitle: 'Intelligent Spaces for Productivity, Learning, and Security',
  sectionDescription: '',
  deliverTitle: 'What We Deliver',
  roadmapTitle: 'Implementation Roadmap',
  ctaBadge: 'Ready To Upgrade',
  ctaTitle: 'Build a smarter office, home, and ICT learning ecosystem with SoftEdge.',
  ctaDescription: '',
  ctaButtonText: 'Explore More Services',
  ctaButtonLink: '/services',
}

const initialSectionForms = {
  featureCards: { title: '', description: '', icon: '' },
  includedServices: { text: '' },
  solutionPhases: { title: '', text: '' },
}

const sectionLabels = {
  featureCards: 'Feature Cards',
  includedServices: 'Included Services',
  solutionPhases: 'Solution Phases',
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

export default function IoTSmartOfficeHomeManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialSectionForms)
  const [pageData, setPageData] = useState(null)
  const [editing, setEditing] = useState({ featureCards: '', includedServices: '', solutionPhases: '' })
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
      const data = await apiRequest('/api/iot-smart-office-home-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        heroTitle: data.heroTitle || initialPageForm.heroTitle,
        breadcrumbTitle: data.breadcrumbTitle || initialPageForm.breadcrumbTitle,
        sectionBadge: data.sectionBadge || initialPageForm.sectionBadge,
        sectionTitle: data.sectionTitle || initialPageForm.sectionTitle,
        sectionDescription: data.sectionDescription || '',
        deliverTitle: data.deliverTitle || initialPageForm.deliverTitle,
        roadmapTitle: data.roadmapTitle || initialPageForm.roadmapTitle,
        ctaBadge: data.ctaBadge || initialPageForm.ctaBadge,
        ctaTitle: data.ctaTitle || initialPageForm.ctaTitle,
        ctaDescription: data.ctaDescription || '',
        ctaButtonText: data.ctaButtonText || initialPageForm.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink || initialPageForm.ctaButtonLink,
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load IoT smart office/home page data')
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

  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingField(fieldName)
    setMessage('')
    setError('')
    try {
      const uploadedUrl = await uploadFile(file)
      setPageForm((current) => ({ ...current, [fieldName]: uploadedUrl }))
      setMessage('Hero image uploaded successfully')
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
      const result = await apiRequest('/api/iot-smart-office-home-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'IoT smart office/home page content updated successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update IoT smart office/home page content')
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
      const path = editingId
        ? `/api/iot-smart-office-home-page/${section}/${editingId}`
        : `/api/iot-smart-office-home-page/${section}`
      const method = editingId ? 'PATCH' : 'POST'
      const result = await apiRequest(path, { method, body: JSON.stringify(sectionForms[section]) })
      setMessage(result.message || `${sectionLabels[section]} updated successfully`)
      setSectionForms((current) => ({ ...current, [section]: initialSectionForms[section] }))
      setEditing((current) => ({ ...current, [section]: '' }))
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save section item')
    } finally {
      setSavingSection('')
    }
  }

  const handleEditItem = (section, item) => {
    const formData =
      section === 'featureCards'
        ? { title: item.title || '', description: item.description || '', icon: item.icon || '' }
        : section === 'solutionPhases'
          ? { title: item.title || '', text: item.text || '' }
          : { text: item.text || '' }
    setSectionForms((current) => ({ ...current, [section]: formData }))
    setEditing((current) => ({ ...current, [section]: item._id }))
    setMessage('')
    setError('')
  }

  const handleDeleteItem = async (section, itemId) => {
    setDeletingKey(`${section}-${itemId}`)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`/api/iot-smart-office-home-page/${section}/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || `${sectionLabels[section]} item deleted successfully`)
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete section item')
    } finally {
      setDeletingKey('')
    }
  }

  return (
    <DashboardShell
      title="IoT Smart Office/Home Management"
      subtitle="Ei page theke IoT SmartOfficeHome page er shokol content (hero, cards, services, phases, CTA) control korte parbe."
    >
      <div className="space-y-4">
        {message ? <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">{message}</div> : null}
        {error ? <div className="rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-2 text-sm text-red-100">{error}</div> : null}
      </div>

      <div className="mt-4 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Page Settings</h2>
            <button type="button" onClick={loadPageData} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/90">Refresh</button>
          </div>

          <form className="mt-4 space-y-3" onSubmit={handlePageSubmit}>
            {[
              ['heroTitle', 'Hero Title'], ['breadcrumbTitle', 'Breadcrumb Title'], ['sectionBadge', 'Section Badge'],
              ['sectionTitle', 'Section Title'], ['deliverTitle', 'Deliver Title'], ['roadmapTitle', 'Roadmap Title'],
              ['ctaBadge', 'CTA Badge'], ['ctaTitle', 'CTA Title'], ['ctaButtonText', 'CTA Button Text'], ['ctaButtonLink', 'CTA Button Link'],
            ].map(([name, label]) => (
              <label key={name} className="block">
                <span className="mb-1 block text-xs text-white/80">{label}</span>
                <input name={name} value={pageForm[name]} onChange={handlePageChange} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/40" />
              </label>
            ))}

            {[
              ['sectionDescription', 'Section Description'],
              ['ctaDescription', 'CTA Description'],
            ].map(([name, label]) => (
              <label key={name} className="block">
                <span className="mb-1 block text-xs text-white/80">{label}</span>
                <textarea name={name} rows={3} value={pageForm[name]} onChange={handlePageChange} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/40" />
              </label>
            ))}

            <label className="block">
              <span className="mb-1 block text-xs text-white/80">Hero Image URL</span>
              <input name="heroImage" value={pageForm.heroImage} onChange={handlePageChange} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/40" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-white/80">Upload Hero Image</span>
              <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, 'heroImage')} disabled={uploadingField === 'heroImage'} className="block w-full text-xs text-white/90 file:mr-2 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1.5 file:text-black" />
            </label>

            <button type="submit" disabled={savingPage || loading} className="rounded-xl bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase text-[#000b1e]">
              {savingPage ? 'Saving...' : 'Save Page Content'}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          {['featureCards', 'includedServices', 'solutionPhases'].map((section) => (
            <div key={section} className="rounded-[28px] border border-white/10 bg-[#000b1e]/40 p-5 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{sectionLabels[section]}</h3>

              <form className="mt-3 space-y-2" onSubmit={(event) => handleSectionSubmit(section, event)}>
                {section === 'featureCards' ? (
                  <>
                    <input name="title" placeholder="Title" value={sectionForms.featureCards.title} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                    <textarea name="description" rows={2} placeholder="Description" value={sectionForms.featureCards.description} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                    <input name="icon" placeholder="Icon" value={sectionForms.featureCards.icon} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                  </>
                ) : section === 'includedServices' ? (
                  <textarea name="text" rows={2} placeholder="Service text" value={sectionForms.includedServices.text} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                ) : (
                  <>
                    <input name="title" placeholder="Phase title" value={sectionForms.solutionPhases.title} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                    <textarea name="text" rows={2} placeholder="Phase description" value={sectionForms.solutionPhases.text} onChange={(event) => handleSectionFormChange(section, event)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white" />
                  </>
                )}
                <button type="submit" disabled={savingSection === section} className="rounded-xl bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase text-[#000b1e]">
                  {savingSection === section ? 'Saving...' : editing[section] ? 'Update Item' : 'Add Item'}
                </button>
              </form>

              <ul className="mt-3 space-y-2">
                {(pageData?.[section] || []).map((item) => (
                  <li key={item._id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <p className="text-sm text-white">{item.title || item.text}</p>
                    {item.description ? <p className="text-xs text-white/70">{item.description}</p> : null}
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
