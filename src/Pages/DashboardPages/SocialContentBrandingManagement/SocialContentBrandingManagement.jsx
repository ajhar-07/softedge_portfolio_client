import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_PAGE = '/api/social-content-branding-page'

const DASHBOARD_SECTIONS = [
  'navPills',
  'introCards',
  'unifiedPitchBullets',
  'socialMediaItems',
  'contentWritingItems',
  'brandingItems',
  'processPhases',
  'deliverablesStrip',
  'faqs',
]

const initialPageForm = {
  heroImage: '',
  eyebrow: '',
  title: '',
  subtitle: '',
  unifiedPitchTitle: '',
  unifiedPitchBody: '',
  socialMediaEyebrow: '',
  socialMediaTitle: '',
  socialMediaIntro: '',
  contentWritingEyebrow: '',
  contentWritingTitle: '',
  contentWritingIntro: '',
  brandingEyebrow: '',
  brandingTitle: '',
  brandingIntro: '',
  processSectionEyebrow: '',
  processSectionTitle: '',
  processSectionSubtitle: '',
  faqSectionEyebrow: '',
  faqSectionTitle: '',
  ctaTitle: '',
  ctaSubtitle: '',
  ctaButtonLabel: '',
  ctaButtonTo: '',
}

const initialForms = {
  navPills: { label: '', to: '' },
  introCards: { label: '', value: '' },
  unifiedPitchBullets: { text: '' },
  socialMediaItems: { title: '', detail: '' },
  contentWritingItems: { title: '', detail: '' },
  brandingItems: { title: '', detail: '' },
  processPhases: { phase: '', linesInput: '' },
  deliverablesStrip: { label: '', detail: '' },
  faqs: { q: '', a: '' },
}

const sectionLabels = {
  navPills: 'Nav pills',
  introCards: 'Intro cards (channels / content / brand)',
  unifiedPitchBullets: 'Unified pitch bullets',
  socialMediaItems: 'Social media detail items',
  contentWritingItems: 'Content writing detail items',
  brandingItems: 'Branding detail items',
  processPhases: 'Process phases (timeline)',
  deliverablesStrip: 'Deliverables strip',
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

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40'
const textareaClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40'

export default function SocialContentBrandingManagement() {
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
        eyebrow: data.eyebrow || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        unifiedPitchTitle: data.unifiedPitchTitle || '',
        unifiedPitchBody: data.unifiedPitchBody || '',
        socialMediaEyebrow: data.socialMediaEyebrow || '',
        socialMediaTitle: data.socialMediaTitle || '',
        socialMediaIntro: data.socialMediaIntro || '',
        contentWritingEyebrow: data.contentWritingEyebrow || '',
        contentWritingTitle: data.contentWritingTitle || '',
        contentWritingIntro: data.contentWritingIntro || '',
        brandingEyebrow: data.brandingEyebrow || '',
        brandingTitle: data.brandingTitle || '',
        brandingIntro: data.brandingIntro || '',
        processSectionEyebrow: data.processSectionEyebrow || '',
        processSectionTitle: data.processSectionTitle || '',
        processSectionSubtitle: data.processSectionSubtitle || '',
        faqSectionEyebrow: data.faqSectionEyebrow || '',
        faqSectionTitle: data.faqSectionTitle || '',
        ctaTitle: data.ctaTitle || '',
        ctaSubtitle: data.ctaSubtitle || '',
        ctaButtonLabel: data.ctaButtonLabel || '',
        ctaButtonTo: data.ctaButtonTo || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load social content branding page data')
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
      setMessage(result.message || 'Social content branding page updated successfully')
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
        section === 'processPhases'
          ? {
              phase: form.phase,
              lines: form.linesInput
                .split('\n')
                .map((s) => s.trim())
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
    if (section === 'navPills') nextForm = { label: item.label || '', to: item.to || '' }
    else if (section === 'introCards') nextForm = { label: item.label || '', value: item.value || '' }
    else if (section === 'unifiedPitchBullets') nextForm = { text: item.text || '' }
    else if (
      section === 'socialMediaItems' ||
      section === 'contentWritingItems' ||
      section === 'brandingItems'
    )
      nextForm = { title: item.title || '', detail: item.detail || '' }
    else if (section === 'processPhases')
      nextForm = {
        phase: item.phase || '',
        linesInput: Array.isArray(item.lines) ? item.lines.join('\n') : '',
      }
    else if (section === 'deliverablesStrip')
      nextForm = { label: item.label || '', detail: item.detail || '' }
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
        {section === 'navPills' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Label" className={inputClass} required />
            <input type="text" name="to" value={form.to} onChange={(e) => handleSectionFormChange(section, e)} placeholder="/social-content-branding" className={inputClass} required />
          </>
        ) : null}

        {section === 'introCards' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Label" className={inputClass} required />
            <input type="text" name="value" value={form.value} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Value" className={inputClass} required />
          </>
        ) : null}

        {section === 'unifiedPitchBullets' ? (
          <textarea name="text" value={form.text} onChange={(e) => handleSectionFormChange(section, e)} rows="3" placeholder="Bullet text" className={textareaClass} required />
        ) : null}

        {section === 'socialMediaItems' || section === 'contentWritingItems' || section === 'brandingItems' ? (
          <>
            <input type="text" name="title" value={form.title} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Title" className={inputClass} required />
            <textarea name="detail" value={form.detail} onChange={(e) => handleSectionFormChange(section, e)} rows="4" placeholder="Detail" className={textareaClass} required />
          </>
        ) : null}

        {section === 'processPhases' ? (
          <>
            <input type="text" name="phase" value={form.phase} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Phase name" className={inputClass} required />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Lines (one per line)</span>
              <textarea name="linesInput" value={form.linesInput} onChange={(e) => handleSectionFormChange(section, e)} rows="6" className={textareaClass} required={!editingId} />
            </label>
          </>
        ) : null}

        {section === 'deliverablesStrip' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Label" className={inputClass} required />
            <textarea name="detail" value={form.detail} onChange={(e) => handleSectionFormChange(section, e)} rows="2" placeholder="Detail" className={textareaClass} required />
          </>
        ) : null}

        {section === 'faqs' ? (
          <>
            <input type="text" name="q" value={form.q} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Question" className={inputClass} required />
            <textarea name="a" value={form.a} onChange={(e) => handleSectionFormChange(section, e)} rows="4" placeholder="Answer" className={textareaClass} required />
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
    if (section === 'navPills') return item.label
    if (section === 'introCards') return item.label
    if (section === 'unifiedPitchBullets') return item.text
    if (section === 'socialMediaItems' || section === 'contentWritingItems' || section === 'brandingItems')
      return item.title
    if (section === 'processPhases') return item.phase
    if (section === 'deliverablesStrip') return item.label
    return item.q
  }

  const renderItemDescription = (section, item) => {
    if (section === 'navPills') return item.to
    if (section === 'introCards') return item.value
    if (section === 'unifiedPitchBullets') return item.text
    if (section === 'socialMediaItems' || section === 'contentWritingItems' || section === 'brandingItems')
      return item.detail
    if (section === 'processPhases') return (item.lines || []).join(' · ')
    if (section === 'deliverablesStrip') return item.detail
    return item.a
  }

  const scalarTextareas = [
    ['subtitle', 'Hero subtitle'],
    ['unifiedPitchBody', 'Unified pitch — body'],
    ['socialMediaIntro', 'Social media — intro'],
    ['contentWritingIntro', 'Content writing — intro'],
    ['brandingIntro', 'Branding — intro'],
    ['processSectionSubtitle', 'Process section — subtitle'],
    ['ctaSubtitle', 'Bottom CTA — subtitle'],
  ]

  return (
    <DashboardShell
      title="Social + content + branding management"
      subtitle={
        <>
          Public page:{' '}
          <Link to="/social-content-branding" className="text-[#00d2ff] underline hover:text-white">
            /social-content-branding
          </Link>{' '}
          — hero, pillars, process, deliverables, FAQs — CRUD from here.
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Scalars</h2>
              </div>
              <button type="button" onClick={loadPageData} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22">
                Refresh
              </button>
            </div>

            <form className="mt-6 max-h-[70vh] space-y-3 overflow-y-auto pr-1" onSubmit={handlePageSubmit}>
              {[
                ['heroImage', 'Hero image URL'],
                ['eyebrow', 'Hero eyebrow'],
                ['title', 'Hero title'],
                ['unifiedPitchTitle', 'Unified pitch — title'],
                ['socialMediaEyebrow', 'Social block — eyebrow'],
                ['socialMediaTitle', 'Social block — title'],
                ['contentWritingEyebrow', 'Content block — eyebrow'],
                ['contentWritingTitle', 'Content block — title'],
                ['brandingEyebrow', 'Branding block — eyebrow'],
                ['brandingTitle', 'Branding block — title'],
                ['processSectionEyebrow', 'Process section — eyebrow'],
                ['processSectionTitle', 'Process section — title'],
                ['faqSectionEyebrow', 'FAQ section — eyebrow'],
                ['faqSectionTitle', 'FAQ section — title'],
                ['ctaTitle', 'Bottom CTA — title'],
                ['ctaButtonLabel', 'Bottom CTA — button label'],
                ['ctaButtonTo', 'Bottom CTA — button path'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-1 block text-xs font-medium text-white/72">{label}</span>
                  <input type="text" name={name} value={pageForm[name]} onChange={handlePageChange} className={inputClass} />
                </label>
              ))}

              {scalarTextareas.map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-1 block text-xs font-medium text-white/72">{label}</span>
                  <textarea name={name} value={pageForm[name]} onChange={handlePageChange} rows="3" className={textareaClass} />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Hero image upload</span>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'heroImage')} className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]" />
                <p className="mt-2 text-xs text-white/50">{uploadingField === 'heroImage' ? 'Uploading…' : 'Or paste URL above'}</p>
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
                  <p className="mt-2 break-words">
                    <span className="text-[#00d2ff]">title:</span> {pageData.title}
                  </p>
                  <p className="mt-1 break-words">
                    <span className="text-[#00d2ff]">eyebrow:</span> {pageData.eyebrow}
                  </p>
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
                                <button type="button" onClick={() => handleEditItem(section, item)} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#00d2ff]/22">
                                  Edit
                                </button>
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
