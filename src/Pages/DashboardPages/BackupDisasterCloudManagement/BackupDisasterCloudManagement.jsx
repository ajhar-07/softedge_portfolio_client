import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_PAGE = '/api/backup-disaster-cloud-page'

const DASHBOARD_SECTIONS = [
  'navPills',
  'kpis',
  'pillars',
  'rtoRpoRows',
  'providerNotes',
  'engagementPhases',
  'deliverableBullets',
  'faqs',
]

function parsePillarPointsInput(raw) {
  if (typeof raw !== 'string') return []
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf('|||')
      if (idx === -1) return null
      const head = line.slice(0, idx).trim()
      const text = line.slice(idx + 3).trim()
      if (!head || !text) return null
      return { head, text }
    })
    .filter(Boolean)
}

function formatPillarPointsInput(points) {
  if (!Array.isArray(points)) return ''
  return points.map((p) => `${p.head}|||${p.text}`).join('\n')
}

const initialPageForm = {
  heroImage: '',
  eyebrow: '',
  title: '',
  subtitle: '',
  whySectionEyebrow: '',
  pillarIntro: '',
  matrixSectionEyebrow: '',
  matrixSectionTitle: '',
  matrixSectionSubtitle: '',
  hyperscalersSectionEyebrow: '',
  hyperscalersSectionTitle: '',
  engagementSectionEyebrow: '',
  engagementSectionTitle: '',
  deliverablesSectionEyebrow: '',
  deliverablesSectionTitle: '',
  faqSectionEyebrow: '',
  faqSectionTitle: '',
  ctaTitle: '',
  ctaSubtitle: '',
  ctaPrimaryLabel: '',
  ctaPrimaryTo: '',
  ctaSecondaryLabel: '',
  ctaSecondaryTo: '',
}

const initialForms = {
  navPills: { label: '', to: '' },
  kpis: { label: '', value: '' },
  pillars: { id: '', badge: '', title: '', lead: '', pointsInput: '' },
  rtoRpoRows: { tier: '', rpo: '', rto: '', pattern: '' },
  providerNotes: { name: '', itemsInput: '' },
  engagementPhases: { step: '', detail: '' },
  deliverableBullets: { text: '' },
  faqs: { q: '', a: '' },
}

const sectionLabels = {
  navPills: 'Nav pills',
  kpis: 'KPI stat cards',
  pillars: 'Pillar columns (backup / DR / cloud)',
  rtoRpoRows: 'RTO / RPO matrix rows',
  providerNotes: 'Hyperscaler cards',
  engagementPhases: 'Engagement phases',
  deliverableBullets: 'Deliverable checklist lines',
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

export default function BackupDisasterCloudManagement() {
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
        whySectionEyebrow: data.whySectionEyebrow || '',
        pillarIntro: data.pillarIntro || '',
        matrixSectionEyebrow: data.matrixSectionEyebrow || '',
        matrixSectionTitle: data.matrixSectionTitle || '',
        matrixSectionSubtitle: data.matrixSectionSubtitle || '',
        hyperscalersSectionEyebrow: data.hyperscalersSectionEyebrow || '',
        hyperscalersSectionTitle: data.hyperscalersSectionTitle || '',
        engagementSectionEyebrow: data.engagementSectionEyebrow || '',
        engagementSectionTitle: data.engagementSectionTitle || '',
        deliverablesSectionEyebrow: data.deliverablesSectionEyebrow || '',
        deliverablesSectionTitle: data.deliverablesSectionTitle || '',
        faqSectionEyebrow: data.faqSectionEyebrow || '',
        faqSectionTitle: data.faqSectionTitle || '',
        ctaTitle: data.ctaTitle || '',
        ctaSubtitle: data.ctaSubtitle || '',
        ctaPrimaryLabel: data.ctaPrimaryLabel || '',
        ctaPrimaryTo: data.ctaPrimaryTo || '',
        ctaSecondaryLabel: data.ctaSecondaryLabel || '',
        ctaSecondaryTo: data.ctaSecondaryTo || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load backup disaster cloud page data')
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
      setMessage(result.message || 'Page updated successfully')
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
      let payload = form

      if (section === 'pillars') {
        const points = parsePillarPointsInput(form.pointsInput)
        payload = {
          id: form.id,
          badge: form.badge,
          title: form.title,
          lead: form.lead,
          points,
        }
      } else if (section === 'providerNotes') {
        payload = {
          name: form.name,
          items: form.itemsInput
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        }
      }

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
    else if (section === 'kpis') nextForm = { label: item.label || '', value: item.value || '' }
    else if (section === 'pillars')
      nextForm = {
        id: item.id || '',
        badge: item.badge || '',
        title: item.title || '',
        lead: item.lead || '',
        pointsInput: formatPillarPointsInput(item.points),
      }
    else if (section === 'rtoRpoRows')
      nextForm = {
        tier: item.tier || '',
        rpo: item.rpo || '',
        rto: item.rto || '',
        pattern: item.pattern || '',
      }
    else if (section === 'providerNotes')
      nextForm = {
        name: item.name || '',
        itemsInput: Array.isArray(item.items) ? item.items.join('\n') : '',
      }
    else if (section === 'engagementPhases') nextForm = { step: item.step || '', detail: item.detail || '' }
    else if (section === 'deliverableBullets') nextForm = { text: item.text || '' }
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
      setMessage(result.message || `${sectionLabels[section]} item deleted`)
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
            <input type="text" name="to" value={form.to} onChange={(e) => handleSectionFormChange(section, e)} placeholder="/backup-disaster-cloud" className={inputClass} required />
          </>
        ) : null}

        {section === 'kpis' ? (
          <>
            <input type="text" name="label" value={form.label} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Label" className={inputClass} required />
            <input type="text" name="value" value={form.value} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Value" className={inputClass} required />
          </>
        ) : null}

        {section === 'pillars' ? (
          <>
            <input type="text" name="id" value={form.id} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Slug id (e.g. backup)" className={inputClass} required />
            <input type="text" name="badge" value={form.badge} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Badge" className={inputClass} required />
            <input type="text" name="title" value={form.title} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Title" className={inputClass} required />
            <textarea name="lead" value={form.lead} onChange={(e) => handleSectionFormChange(section, e)} rows="3" placeholder="Lead paragraph" className={textareaClass} required />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">
                Bullet lines: <code className="text-[#00d2ff]">head|||body text</code> one per line
              </span>
              <textarea
                name="pointsInput"
                value={form.pointsInput}
                onChange={(e) => handleSectionFormChange(section, e)}
                rows="10"
                className={textareaClass}
                required={!editingId}
              />
            </label>
          </>
        ) : null}

        {section === 'rtoRpoRows' ? (
          <>
            <input type="text" name="tier" value={form.tier} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Tier" className={inputClass} required />
            <input type="text" name="rpo" value={form.rpo} onChange={(e) => handleSectionFormChange(section, e)} placeholder="RPO" className={inputClass} required />
            <input type="text" name="rto" value={form.rto} onChange={(e) => handleSectionFormChange(section, e)} placeholder="RTO" className={inputClass} required />
            <textarea name="pattern" value={form.pattern} onChange={(e) => handleSectionFormChange(section, e)} rows="2" placeholder="Pattern" className={textareaClass} required />
          </>
        ) : null}

        {section === 'providerNotes' ? (
          <>
            <input type="text" name="name" value={form.name} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Platform name" className={inputClass} required />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Bullets (one per line)</span>
              <textarea name="itemsInput" value={form.itemsInput} onChange={(e) => handleSectionFormChange(section, e)} rows="8" className={textareaClass} required={!editingId} />
            </label>
          </>
        ) : null}

        {section === 'engagementPhases' ? (
          <>
            <input type="text" name="step" value={form.step} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Step name" className={inputClass} required />
            <textarea name="detail" value={form.detail} onChange={(e) => handleSectionFormChange(section, e)} rows="4" placeholder="Detail" className={textareaClass} required />
          </>
        ) : null}

        {section === 'deliverableBullets' ? (
          <textarea name="text" value={form.text} onChange={(e) => handleSectionFormChange(section, e)} rows="3" placeholder="Line text" className={textareaClass} required />
        ) : null}

        {section === 'faqs' ? (
          <>
            <input type="text" name="q" value={form.q} onChange={(e) => handleSectionFormChange(section, e)} placeholder="Question" className={inputClass} required />
            <textarea name="a" value={form.a} onChange={(e) => handleSectionFormChange(section, e)} rows="4" placeholder="Answer" className={textareaClass} required />
          </>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={savingSection === section}
            className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {savingSection === section ? 'Saving...' : editingId ? 'Update item' : 'Create item'}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => handleCancelEdit(section)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
            >
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>
    )
  }

  const renderItemTitle = (section, item) => {
    if (section === 'navPills') return item.label
    if (section === 'kpis') return item.label
    if (section === 'pillars') return item.title || item.badge
    if (section === 'rtoRpoRows') return item.tier
    if (section === 'providerNotes') return item.name
    if (section === 'engagementPhases') return item.step
    if (section === 'deliverableBullets') return item.text
    return item.q
  }

  const renderItemDescription = (section, item) => {
    if (section === 'navPills') return item.to
    if (section === 'kpis') return item.value
    if (section === 'pillars')
      return [item.lead, ...(item.points || []).slice(0, 2).map((p) => `• ${p.head}`)].filter(Boolean).join('\n')
    if (section === 'rtoRpoRows') return `${item.rpo} / ${item.rto}\n${item.pattern}`
    if (section === 'providerNotes') return (item.items || []).join(' · ')
    if (section === 'engagementPhases') return item.detail
    if (section === 'deliverableBullets') return item.text
    return item.a
  }

  const scalarTextareas = [
    ['subtitle', 'Hero subtitle'],
    ['pillarIntro', 'Why section — intro body'],
    ['matrixSectionSubtitle', 'Matrix section — subtitle'],
    ['ctaSubtitle', 'CTA strip — subtitle'],
  ]

  return (
    <DashboardShell
      title="Backup + DR + cloud management"
      subtitle={
        <>
          Public page:{' '}
          <Link to="/backup-disaster-cloud" className="text-[#00d2ff] underline hover:text-white">
            /backup-disaster-cloud
          </Link>{' '}
          — full CRUD via API.
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
              <button
                type="button"
                onClick={loadPageData}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
              >
                Refresh
              </button>
            </div>

            <form className="mt-6 max-h-[70vh] space-y-3 overflow-y-auto pr-1" onSubmit={handlePageSubmit}>
              {[
                ['heroImage', 'Hero image URL'],
                ['eyebrow', 'Hero eyebrow'],
                ['title', 'Hero title'],
                ['whySectionEyebrow', 'Why section — eyebrow'],
                ['matrixSectionEyebrow', 'Matrix — eyebrow'],
                ['matrixSectionTitle', 'Matrix — title'],
                ['hyperscalersSectionEyebrow', 'Hyperscalers — eyebrow'],
                ['hyperscalersSectionTitle', 'Hyperscalers — title'],
                ['engagementSectionEyebrow', 'Engagement — eyebrow'],
                ['engagementSectionTitle', 'Engagement — title'],
                ['deliverablesSectionEyebrow', 'Deliverables — eyebrow'],
                ['deliverablesSectionTitle', 'Deliverables — title'],
                ['faqSectionEyebrow', 'FAQ — eyebrow'],
                ['faqSectionTitle', 'FAQ — title'],
                ['ctaTitle', 'CTA — title'],
                ['ctaPrimaryLabel', 'CTA — primary label'],
                ['ctaPrimaryTo', 'CTA — primary path'],
                ['ctaSecondaryLabel', 'CTA — secondary label'],
                ['ctaSecondaryTo', 'CTA — secondary path'],
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'heroImage')}
                  className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                />
                <p className="mt-2 text-xs text-white/50">{uploadingField === 'heroImage' ? 'Uploading…' : 'Or paste URL above'}</p>
              </label>

              <button
                type="submit"
                disabled={savingPage || Boolean(uploadingField)}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
              >
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

          {message ? (
            <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p>
          ) : null}
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
                                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-white/68">
                                  {renderItemDescription(section, item)}
                                </p>
                              </div>
                              <div className="flex shrink-0 flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditItem(section, item)}
                                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#00d2ff]/22"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem(section, item._id)}
                                  disabled={deletingKey === `${section}-${item._id}`}
                                  className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-65"
                                >
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
