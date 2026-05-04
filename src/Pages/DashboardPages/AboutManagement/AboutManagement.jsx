import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  workProcessEyebrow: '',
  workProcessTitle: '',
  whyChooseUsImage: '',
  whyChooseUsEyebrow: '',
  whyChooseUsTitle: '',
  whyChooseUsDescription: '',
  aboutEyebrow: '',
  aboutTitle: '',
  missionTitle: '',
  missionText: '',
  visionTitle: '',
  visionText: '',
  aboutMainImage: '',
  aboutOverlayImage: '',
  teamEyebrow: '',
  teamTitle: '',
}

const initialForms = {
  processSteps: { stepId: '', title: '', description: '', image: '' },
  whyChooseUsServices: { label: '' },
  reviews: { name: '', role: '', image: '', text: '' },
  stats: { end: '', suffix: '', label: '' },
  team: { name: '', role: '', image: '', facebookUrl: '', linkedinUrl: '', githubUrl: '' },
}

const sectionLabels = {
  processSteps: 'Process steps',
  whyChooseUsServices: 'Why choose us — services',
  reviews: 'Reviews',
  stats: 'Stats',
  team: 'Team',
}

function TeamSocialIconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-[#1877f2]" aria-hidden>
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.7-.1-1.4-.2-2.1-.2-2.1 0-3.5 1.3-3.5 3.7v2.1H8.5V14h2.3v7h2.7Z" />
    </svg>
  )
}

function TeamSocialIconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-[#0a66c2]" aria-hidden>
      <path d="M6.2 8.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM4.8 19h2.8V9.6H4.8V19Zm4.5 0h2.7v-4.7c0-1.2.2-2.4 1.7-2.4 1.4 0 1.4 1.3 1.4 2.5V19H18v-5.2c0-2.6-.6-4.6-3.6-4.6-1.4 0-2.3.8-2.7 1.5h-.1V9.6H9.3c0 .7 0 9.4 0 9.4Z" />
    </svg>
  )
}

function TeamSocialIconGithub() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-white/90" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1A10 10 0 0 1 12 7.5a10 10 0 0 1 2.7.4c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.7 1.1 2.8 0 4-2.5 4.8-4.9 5.1.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  )
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

export default function AboutManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialForms)
  const [editing, setEditing] = useState({
    processSteps: '',
    whyChooseUsServices: '',
    reviews: '',
    stats: '',
    team: '',
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
      const data = await apiRequest('/api/about-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        workProcessEyebrow: data.workProcessEyebrow || '',
        workProcessTitle: data.workProcessTitle || '',
        whyChooseUsImage: data.whyChooseUsImage || '',
        whyChooseUsEyebrow: data.whyChooseUsEyebrow || '',
        whyChooseUsTitle: data.whyChooseUsTitle || '',
        whyChooseUsDescription: data.whyChooseUsDescription || '',
        aboutEyebrow: data.aboutEyebrow || '',
        aboutTitle: data.aboutTitle || '',
        missionTitle: data.missionTitle || '',
        missionText: data.missionText || '',
        visionTitle: data.visionTitle || '',
        visionText: data.visionText || '',
        aboutMainImage: data.aboutMainImage || '',
        aboutOverlayImage: data.aboutOverlayImage || '',
        teamEyebrow: data.teamEyebrow || '',
        teamTitle: data.teamTitle || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load about page data')
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
      const result = await apiRequest('/api/about-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'About page updated successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const buildSectionBody = (section, editingId) => {
    const raw = sectionForms[section]
    if (section !== 'stats') return raw

    const suffix = typeof raw.suffix === 'string' ? raw.suffix.trim() : ''
    const label = typeof raw.label === 'string' ? raw.label.trim() : ''
    const n = Number(raw.end)
    const endValid = raw.end !== '' && raw.end != null && Number.isFinite(n)

    if (!editingId) {
      if (!endValid) throw new Error('Stat "end" must be a valid number')
      return { end: Math.round(n), suffix, label }
    }

    const partial = {}
    if (endValid) partial.end = Math.round(n)
    if (suffix) partial.suffix = suffix
    if (label) partial.label = label
    return partial
  }

  const handleSectionSubmit = async (section, event) => {
    event.preventDefault()
    setSavingSection(section)
    setMessage('')
    setError('')

    try {
      const editingId = editing[section]
      const path = editingId
        ? `/api/about-page/${section}/${editingId}`
        : `/api/about-page/${section}`
      const method = editingId ? 'PATCH' : 'POST'

      const body = buildSectionBody(section, editingId)
      if (section === 'stats' && editingId && !Object.keys(body).length) {
        throw new Error('At least one stat field (end, suffix, or label) is required to update')
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

    if (section === 'processSteps') {
      nextForm = {
        stepId: item.stepId || '',
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
      }
    } else if (section === 'whyChooseUsServices') {
      nextForm = { label: item.label || '' }
    } else if (section === 'reviews') {
      nextForm = {
        name: item.name || '',
        role: item.role || '',
        image: item.image || '',
        text: item.text || '',
      }
    } else if (section === 'stats') {
      nextForm = {
        end: item.end != null ? String(item.end) : '',
        suffix: item.suffix || '',
        label: item.label || '',
      }
    } else if (section === 'team') {
      nextForm = {
        name: item.name || '',
        role: item.role || '',
        image: item.image || '',
        facebookUrl: item.facebookUrl || '',
        linkedinUrl: item.linkedinUrl || '',
        githubUrl: item.githubUrl || '',
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
      const result = await apiRequest(`/api/about-page/${section}/${itemId}`, {
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
        {section === 'processSteps' ? (
          <>
            <input
              type="text"
              name="stepId"
              value={form.stepId}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Step ID (e.g. 01)"
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
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-white/70">Or upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleSectionFileUpload(section, 'image', event)}
                className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
              />
              {uploading('image') ? (
                <p className="mt-1 text-xs text-white/45">Uploading…</p>
              ) : null}
            </label>
          </>
        ) : null}

        {section === 'whyChooseUsServices' ? (
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={(event) => handleSectionFormChange(section, event)}
            placeholder="Service label"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
            required={!editingId}
          />
        ) : null}

        {section === 'reviews' ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Role"
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
            <textarea
              name="text"
              value={form.text}
              onChange={(event) => handleSectionFormChange(section, event)}
              rows="4"
              placeholder="Review text"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
          </>
        ) : null}

        {section === 'stats' ? (
          <>
            <input
              type="number"
              name="end"
              value={form.end}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Number (e.g. 15)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="suffix"
              value={form.suffix}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Suffix (e.g. k or +)"
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

        {section === 'team' ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
              required={!editingId}
            />
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={(event) => handleSectionFormChange(section, event)}
              placeholder="Role"
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

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition focus-within:border-[#00d2ff]/40">
                <TeamSocialIconFacebook />
                <input
                  type="text"
                  name="facebookUrl"
                  value={form.facebookUrl}
                  onChange={(event) => handleSectionFormChange(section, event)}
                  placeholder="https://facebook.com/…"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition focus-within:border-[#00d2ff]/40">
                <TeamSocialIconLinkedIn />
                <input
                  type="text"
                  name="linkedinUrl"
                  value={form.linkedinUrl}
                  onChange={(event) => handleSectionFormChange(section, event)}
                  placeholder="https://linkedin.com/in/…"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition focus-within:border-[#00d2ff]/40">
                <TeamSocialIconGithub />
                <input
                  type="text"
                  name="githubUrl"
                  value={form.githubUrl}
                  onChange={(event) => handleSectionFormChange(section, event)}
                  placeholder="https://github.com/…"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>
            </div>
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
    if (section === 'processSteps') return `${item.stepId} — ${item.title}`
    if (section === 'whyChooseUsServices') return item.label
    if (section === 'reviews') return item.name
    if (section === 'stats') return `${item.end}${item.suffix} ${item.label}`
    if (section === 'team') return item.name
    return ''
  }

  const renderItemDescription = (section, item) => {
    if (section === 'processSteps') return item.description
    if (section === 'whyChooseUsServices') return 'Service card'
    if (section === 'reviews') return `${item.role} — ${item.text?.slice(0, 120)}${item.text?.length > 120 ? '…' : ''}`
    if (section === 'stats') return `Animated value target: ${item.end}`
    if (section === 'team') return item.role
    return ''
  }

  const pageTextFields = [
    ['workProcessEyebrow', 'Work process — eyebrow'],
    ['workProcessTitle', 'Work process — title'],
    ['whyChooseUsEyebrow', 'Why choose us — eyebrow'],
    ['whyChooseUsTitle', 'Why choose us — title'],
    ['aboutEyebrow', 'About block — eyebrow'],
    ['aboutTitle', 'About block — title'],
    ['missionTitle', 'Mission title'],
    ['visionTitle', 'Vision title'],
    ['teamEyebrow', 'Team section — eyebrow'],
    ['teamTitle', 'Team section — title'],
  ]

  const pageTextareas = [
    ['whyChooseUsDescription', 'Why choose us — description'],
    ['missionText', 'Mission text'],
    ['visionText', 'Vision text'],
  ]

  return (
    <DashboardShell
      title="About page management"
      subtitle="Manage About page hero, sections, team, and related content."
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero, copy, and image URLs</h2>
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
              {pageTextFields.map(([name, label]) => (
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

              {pageTextareas.map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label}</span>
                  <textarea
                    name={name}
                    value={pageForm[name]}
                    onChange={handlePageChange}
                    rows="4"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  />
                </label>
              ))}

              {[
                ['heroImage', 'Hero background image'],
                ['whyChooseUsImage', 'Why choose us — side image'],
                ['aboutMainImage', 'About section — main image'],
                ['aboutOverlayImage', 'About section — overlay image'],
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
          <h2 className="mt-3 text-2xl font-black text-white">Live about page content</h2>

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
                Loading about page…
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
                                <p className="mt-2 text-sm leading-7 text-white/68">{renderItemDescription(section, item)}</p>
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
