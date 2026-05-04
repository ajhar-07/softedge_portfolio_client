import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  historyEyebrow: '',
  historyTitle: '',
  pricingEyebrow: '',
  pricingTitle: '',
  planButtonLabel: '',
  statsBannerImage: '',
}

const initialForms = {
  history: { year: '', title: '', description: '', image: '' },
  plans: { name: '', price: '', image: '' },
  pricingFeatures: { text: '' },
  stats: { value: '', label: '' },
}

const sectionLabels = {
  history: 'History timeline',
  plans: 'Pricing plans',
  pricingFeatures: 'Pricing plan features',
  stats: 'Stats row',
}

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

  if (!fileUrl) {
    throw new Error('Uploaded file URL not found')
  }

  return fileUrl
}

export default function HowWeWorkManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialForms)
  const [editing, setEditing] = useState({
    history: '',
    plans: '',
    pricingFeatures: '',
    stats: '',
  })
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingSection, setSavingSection] = useState('')
  const [deletingKey, setDeletingKey] = useState('')
  const [uploadingField, setUploadingField] = useState('')
  const [uploadingSection, setUploadingSection] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/how-we-work-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        historyEyebrow: data.historyEyebrow || '',
        historyTitle: data.historyTitle || '',
        pricingEyebrow: data.pricingEyebrow || '',
        pricingTitle: data.pricingTitle || '',
        planButtonLabel: data.planButtonLabel || '',
        statsBannerImage: data.statsBannerImage || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load how we work page data')
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
      setPageForm((current) => ({
        ...current,
        [fieldName]: uploadedUrl,
      }))
      setMessage('Image uploaded')
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload file')
    } finally {
      setUploadingField('')
      event.target.value = ''
    }
  }

  const handleSectionFileUpload = async (section, fieldName, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingSection(`${section}-${fieldName}`)
    setMessage('')
    setError('')

    try {
      const uploadedUrl = await uploadFile(file)
      setSectionForms((current) => ({
        ...current,
        [section]: {
          ...current[section],
          [fieldName]: uploadedUrl,
        },
      }))
      setMessage('Image uploaded')
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload file')
    } finally {
      setUploadingSection('')
      event.target.value = ''
    }
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    setSavingPage(true)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest('/api/how-we-work-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'How we work page updated')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const buildSectionBody = (section, editingId) => {
    if (section === 'stats') {
      const raw = sectionForms.stats
      const value = typeof raw.value === 'string' ? raw.value.trim() : ''
      const label = typeof raw.label === 'string' ? raw.label.trim() : ''

      if (!editingId) {
        if (!value) throw new Error('Stat value is required')
        if (!label) throw new Error('Stat label is required')
        return { value, label }
      }

      const partial = {}
      if (value) partial.value = value
      if (label) partial.label = label
      return partial
    }

    if (section === 'plans') {
      const raw = sectionForms.plans
      const n = Number(raw.price)
      if (!String(raw.name).trim()) throw new Error('Plan name is required')
      if (!Number.isFinite(n)) throw new Error('Plan price must be a valid number')
      if (!String(raw.image).trim()) throw new Error('Plan image is required')
      return {
        name: String(raw.name).trim(),
        price: n,
        image: String(raw.image).trim(),
      }
    }

    return sectionForms[section]
  }

  const handleSectionSubmit = async (section, event) => {
    event.preventDefault()
    setSavingSection(section)
    setMessage('')
    setError('')

    try {
      const editingId = editing[section]
      const path = editingId
        ? `/api/how-we-work-page/${section}/${editingId}`
        : `/api/how-we-work-page/${section}`
      const method = editingId ? 'PATCH' : 'POST'

      const body = buildSectionBody(section, editingId)
      if (section === 'stats' && editingId && !Object.keys(body).length) {
        throw new Error('At least one of value or label is required to update')
      }

      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(body),
      })

      setMessage(result.message || `${sectionLabels[section]} saved`)
      setSectionForms((current) => ({
        ...current,
        [section]: initialForms[section],
      }))
      setEditing((current) => ({
        ...current,
        [section]: '',
      }))
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save section item')
    } finally {
      setSavingSection('')
    }
  }

  const handleEditItem = (section, item) => {
    let nextForm = { ...initialForms[section] }

    if (section === 'history') {
      nextForm = {
        year: item.year || '',
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
      }
    } else if (section === 'plans') {
      nextForm = {
        name: item.name || '',
        price: item.price != null ? String(item.price) : '',
        image: item.image || '',
      }
    } else if (section === 'pricingFeatures') {
      nextForm = { text: item.text || '' }
    } else if (section === 'stats') {
      nextForm = {
        value: item.value || '',
        label: item.label || '',
      }
    }

    setSectionForms((current) => ({
      ...current,
      [section]: nextForm,
    }))
    setEditing((current) => ({
      ...current,
      [section]: item._id,
    }))
    setMessage('')
    setError('')
  }

  const handleDeleteItem = async (section, itemId) => {
    setDeletingKey(`${section}-${itemId}`)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest(`/api/how-we-work-page/${section}/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Item deleted')
      if (editing[section] === itemId) {
        setEditing((current) => ({
          ...current,
          [section]: '',
        }))
        setSectionForms((current) => ({
          ...current,
          [section]: initialForms[section],
        }))
      }
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete item')
    } finally {
      setDeletingKey('')
    }
  }

  const handleCancelEdit = (section) => {
    setEditing((current) => ({
      ...current,
      [section]: '',
    }))
    setSectionForms((current) => ({
      ...current,
      [section]: initialForms[section],
    }))
  }

  const renderSectionForm = (section) => {
    const form = sectionForms[section]
    const editingId = editing[section]
    const uploading = (field) => uploadingSection === `${section}-${field}`

    return (
      <form className="mt-5 space-y-4" onSubmit={(event) => handleSectionSubmit(section, event)}>
        {section === 'history' ? (
          <>
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Year (e.g. 2000)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Title"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <textarea
              name="description"
              value={form.description}
              onChange={(event) => handleSectionFormChange(section, event)}
              rows="3"
              placeholder="Description"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Image URL"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleSectionFileUpload(section, 'image', event)}
              className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
            />
            {uploading('image') ? (
              <p className="text-xs text-white/45">Uploading…</p>
            ) : null}
          </>
        ) : null}

        {section === 'plans' ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Plan name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Monthly price (number)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Image URL"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleSectionFileUpload(section, 'image', event)}
              className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
            />
            {uploading('image') ? (
              <p className="text-xs text-white/45">Uploading…</p>
            ) : null}
          </>
        ) : null}

        {section === 'pricingFeatures' ? (
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={(event) => handleSectionFormChange(section, event)}
            placeholder="Feature line"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
            required={!editingId}
          />
        ) : null}

        {section === 'stats' ? (
          <>
            <input
              type="text"
              name="value"
              value={form.value}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Display value (e.g. 15k)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="label"
              value={form.label}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Label (e.g. Customers)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
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
    if (section === 'history') return `${item.year} — ${item.title}`
    if (section === 'plans') return item.name
    if (section === 'pricingFeatures') return item.text
    if (section === 'stats') return `${item.value} · ${item.label}`
    return ''
  }

  const renderItemDescription = (section, item) => {
    if (section === 'history') return item.description
    if (section === 'plans') return `$${item.price} / month`
    if (section === 'pricingFeatures') return 'Shown on each pricing card'
    if (section === 'stats') return ''
    return ''
  }

  return (
    <DashboardShell
      title="How we work management"
      subtitle="Manage How We Work page hero, history, pricing, and stats from the database."
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero, section titles, banner</h2>
              </div>
              <button
                type="button"
                onClick={loadPageData}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
              >
                Refresh
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handlePageSubmit}>
              {[
                ['historyEyebrow', 'History section — eyebrow'],
                ['historyTitle', 'History section — title'],
                ['pricingEyebrow', 'Pricing section — eyebrow'],
                ['pricingTitle', 'Pricing section — title'],
                ['planButtonLabel', 'Plan card button label'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={pageForm[name]}
                    onChange={handlePageChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  />
                </label>
              ))}

              {[
                ['heroImage', 'Hero background'],
                ['statsBannerImage', 'Stats banner background'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label} (URL)</span>
                  <input
                    type="text"
                    name={name}
                    value={pageForm[name]}
                    onChange={handlePageChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event, name)}
                    className="mt-2 block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                  />
                  {uploadingField === name ? (
                    <p className="mt-1 text-xs text-white/50">Uploading…</p>
                  ) : null}
                </label>
              ))}

              <button
                type="submit"
                disabled={savingPage || Boolean(uploadingField)}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingPage ? 'Saving...' : 'Save page content'}
              </button>
            </form>
          </div>

          {Object.keys(sectionLabels).map((section) => (
            <div
              key={section}
              className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{sectionLabels[section]}</p>
              <h2 className="mt-3 text-2xl font-black text-white">Manage {sectionLabels[section]}</h2>
              {renderSectionForm(section)}
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Current data</p>
          <h2 className="mt-3 text-2xl font-black text-white">Live how we work content</h2>

          {message ? (
            <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <div className="mt-6 space-y-5">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">
                Loading…
              </div>
            ) : pageData ? (
              <>
                {Object.keys(sectionLabels).map((section) => (
                  <div key={section} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-lg font-bold text-white">{sectionLabels[section]}</h3>
                    <div className="mt-4 space-y-3">
                      {(pageData[section] || []).length ? (
                        pageData[section].map((item) => (
                          <div
                            key={item._id}
                            className="rounded-2xl border border-white/10 bg-[#0a3146]/22 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-base font-bold text-white">{renderItemTitle(section, item)}</p>
                                <p className="mt-2 text-sm leading-7 text-white/68">
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
                          No items.
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
