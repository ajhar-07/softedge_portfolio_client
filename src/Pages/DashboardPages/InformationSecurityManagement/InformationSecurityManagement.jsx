import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  mainImage: '',
  heroTitle: 'Information Security',
  sectionTitle: 'Information Security',
  sectionDescription: '',
  bottomDescription: '',
  brochuresTitle: 'Brochures',
  brochuresDescription: '',
  brochuresPrimaryButton: 'Download',
  brochuresSecondaryButton: 'Discover',
  followUsTitle: 'Follow Us',
}

const initialForms = {
  serviceLinks: { label: '', to: '' },
  faqs: { question: '', answer: '', open: false },
  highlights: { title: '', description: '' },
  socials: { label: '' },
}

const sectionLabels = {
  serviceLinks: 'Main Services',
  faqs: 'FAQs',
  highlights: 'Highlights',
  socials: 'Social Links',
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

export default function InformationSecurityManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialForms)
  const [editing, setEditing] = useState({
    serviceLinks: '',
    faqs: '',
    highlights: '',
    socials: '',
  })
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
      const data = await apiRequest('/api/information-security-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        mainImage: data.mainImage || '',
        heroTitle: data.heroTitle || 'Information Security',
        sectionTitle: data.sectionTitle || 'Information Security',
        sectionDescription: data.sectionDescription || '',
        bottomDescription: data.bottomDescription || '',
        brochuresTitle: data.brochuresTitle || 'Brochures',
        brochuresDescription: data.brochuresDescription || '',
        brochuresPrimaryButton: data.brochuresPrimaryButton || 'Download',
        brochuresSecondaryButton: data.brochuresSecondaryButton || 'Discover',
        followUsTitle: data.followUsTitle || 'Follow Us',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load information security page data')
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
    const { name, value, type, checked } = event.target
    setSectionForms((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [name]: type === 'checkbox' ? checked : value,
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
      setMessage(`${fieldName === 'heroImage' ? 'Hero image' : 'Main image'} uploaded successfully`)
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
      const result = await apiRequest('/api/information-security-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'Information security page updated successfully')
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
      const path = editingId
        ? `/api/information-security-page/${section}/${editingId}`
        : `/api/information-security-page/${section}`
      const method = editingId ? 'PATCH' : 'POST'

      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(sectionForms[section]),
      })

      setMessage(result.message || `${sectionLabels[section]} updated successfully`)
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
    const nextForm =
      section === 'serviceLinks'
        ? { label: item.label || '', to: item.to || '' }
        : section === 'faqs'
          ? { question: item.question || '', answer: item.answer || '', open: Boolean(item.open) }
          : section === 'highlights'
            ? { title: item.title || '', description: item.description || '' }
            : { label: item.label || '' }

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
      const result = await apiRequest(`/api/information-security-page/${section}/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || `${sectionLabels[section]} item deleted successfully`)
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
      setError(requestError.message || 'Failed to delete section item')
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

    return (
      <form className="mt-5 space-y-4" onSubmit={(event) => handleSectionSubmit(section, event)}>
        {section === 'serviceLinks' ? (
          <>
            <input
              type="text"
              name="label"
              value={form.label}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Label"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
            <input
              type="text"
              name="to"
              value={form.to}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="/information-security"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
          </>
        ) : null}

        {section === 'faqs' ? (
          <>
            <input
              type="text"
              name="question"
              value={form.question}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Question"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
            <textarea
              name="answer"
              value={form.answer}
              onChange={(event) => handleSectionFormChange(section, event)}
              rows="4"
              placeholder="Answer"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
            <label className="flex items-center gap-3 text-sm text-white/78">
              <input
                type="checkbox"
                name="open"
                checked={form.open}
                onChange={(event) => handleSectionFormChange(section, event)}
              />
              Open by default
            </label>
          </>
        ) : null}

        {section === 'highlights' ? (
          <>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Title"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={(event) => handleSectionFormChange(section, event)}
              rows="4"
              placeholder="Description"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required
            />
          </>
        ) : null}

        {section === 'socials' ? (
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={(event) => handleSectionFormChange(section, event)}
            placeholder="Label"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
            required
          />
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={savingSection === section}
            className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {savingSection === section ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => handleCancelEdit(section)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    )
  }

  const renderItemTitle = (section, item) => {
    if (section === 'serviceLinks' || section === 'socials') return item.label
    if (section === 'highlights') return item.title
    return item.question
  }

  const renderItemDescription = (section, item) => {
    if (section === 'serviceLinks') return item.to
    if (section === 'socials') return 'Social button label'
    if (section === 'highlights') return item.description
    return item.answer
  }

  return (
    <DashboardShell
      title="Information Security Management"
      subtitle="Ei page theke information security UI er content backend e save korte, abar pore fetch kore manage korte parbe."
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page Content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero and main content</h2>
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
                ['heroTitle', 'Hero Title'],
                ['sectionTitle', 'Section Title'],
                ['sectionDescription', 'Section Description'],
                ['bottomDescription', 'Bottom Description'],
                ['brochuresTitle', 'Brochures Title'],
                ['brochuresDescription', 'Brochures Description'],
                ['brochuresPrimaryButton', 'Primary Button'],
                ['brochuresSecondaryButton', 'Secondary Button'],
                ['followUsTitle', 'Follow Us Title'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label}</span>
                  {name.includes('Description') ? (
                    <textarea
                      name={name}
                      value={pageForm[name]}
                      onChange={handlePageChange}
                      rows="4"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      value={pageForm[name]}
                      onChange={handlePageChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                    />
                  )}
                </label>
              ))}

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">Hero Image Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event, 'heroImage')}
                    className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                  />
                  <p className="mt-2 text-xs text-white/50">
                    {uploadingField === 'heroImage' ? 'Uploading hero image...' : 'Choose an image file to upload'}
                  </p>
                  {pageForm.heroImage ? (
                    <p className="mt-2 break-all text-xs text-white/45">{pageForm.heroImage}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">Main Image Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event, 'mainImage')}
                    className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                  />
                  <p className="mt-2 text-xs text-white/50">
                    {uploadingField === 'mainImage' ? 'Uploading main image...' : 'Choose an image file to upload'}
                  </p>
                  {pageForm.mainImage ? (
                    <p className="mt-2 break-all text-xs text-white/45">{pageForm.mainImage}</p>
                  ) : null}
                </label>
              </div>

              <button
                type="submit"
                disabled={savingPage || Boolean(uploadingField)}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingPage ? 'Saving...' : 'Save Page Content'}
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
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Current Data</p>
          <h2 className="mt-3 text-2xl font-black text-white">Live information security content</h2>

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
                Loading information security data...
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
                                  {deletingKey === `${section}-${item._id}` ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-white/68">
                          No items found in {sectionLabels[section]}.
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
