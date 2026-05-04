import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialHeroForm = { heroImage: '' }

const initialMemberForm = {
  name: '',
  role: '',
  image: '',
  socialFacebook: '',
  socialLinkedin: '',
  socialGithub: '',
}

const sectionKey = 'teamMembers'

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

function memberFormFromItem(item) {
  const s = item?.social && typeof item.social === 'object' ? item.social : {}
  return {
    name: item?.name || '',
    role: item?.role || '',
    image: item?.image || '',
    socialFacebook: typeof s.facebook === 'string' ? s.facebook : '',
    socialLinkedin: typeof s.linkedin === 'string' ? s.linkedin : '',
    socialGithub: typeof s.github === 'string' ? s.github : '',
  }
}

function buildMemberPayload(form) {
  return {
    name: String(form.name).trim(),
    role: String(form.role).trim(),
    image: String(form.image).trim(),
    social: {
      facebook: String(form.socialFacebook).trim(),
      linkedin: String(form.socialLinkedin).trim(),
      github: String(form.socialGithub).trim(),
    },
  }
}

export default function TeamManagement() {
  const [heroForm, setHeroForm] = useState(initialHeroForm)
  const [memberForm, setMemberForm] = useState(initialMemberForm)
  const [editingMemberId, setEditingMemberId] = useState('')
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingHero, setSavingHero] = useState(false)
  const [savingMember, setSavingMember] = useState(false)
  const [deletingKey, setDeletingKey] = useState('')
  const [uploadingField, setUploadingField] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/our-team-page')
      setPageData(data)
      setHeroForm({ heroImage: data.heroImage || '' })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load our team page data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPageData()
  }, [])

  const handleHeroChange = (event) => {
    const { name, value } = event.target
    setHeroForm((current) => ({ ...current, [name]: value }))
  }

  const handleMemberFormChange = (event) => {
    const { name, value } = event.target
    setMemberForm((current) => ({ ...current, [name]: value }))
  }

  const handleFileUpload = async (event, field) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingField(field)
    setMessage('')
    setError('')

    try {
      const uploadedUrl = await uploadFile(file)
      if (field === 'heroImage') {
        setHeroForm((current) => ({ ...current, heroImage: uploadedUrl }))
      } else {
        setMemberForm((current) => ({ ...current, image: uploadedUrl }))
      }
      setMessage('Image uploaded')
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload file')
    } finally {
      setUploadingField('')
      event.target.value = ''
    }
  }

  const handleHeroSubmit = async (event) => {
    event.preventDefault()
    setSavingHero(true)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest('/api/our-team-page', {
        method: 'PUT',
        body: JSON.stringify({ heroImage: heroForm.heroImage }),
      })
      setMessage(result.message || 'Our team page updated')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update hero image')
    } finally {
      setSavingHero(false)
    }
  }

  const handleMemberSubmit = async (event) => {
    event.preventDefault()
    setSavingMember(true)
    setMessage('')
    setError('')

    try {
      const path = editingMemberId
        ? `/api/our-team-page/${sectionKey}/${editingMemberId}`
        : `/api/our-team-page/${sectionKey}`
      const method = editingMemberId ? 'PATCH' : 'POST'

      const body = buildMemberPayload(memberForm)

      if (!body.name || !body.role || !body.image) {
        throw new Error('Name, role, and image are required')
      }

      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(body),
      })

      setMessage(result.message || 'Team member saved')
      setMemberForm(initialMemberForm)
      setEditingMemberId('')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save team member')
    } finally {
      setSavingMember(false)
    }
  }

  const handleEditMember = (item) => {
    setMemberForm(memberFormFromItem(item))
    setEditingMemberId(item._id)
    setMessage('')
    setError('')
  }

  const handleDeleteMember = async (itemId) => {
    setDeletingKey(itemId)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest(`/api/our-team-page/${sectionKey}/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Member deleted')
      if (editingMemberId === itemId) {
        setEditingMemberId('')
        setMemberForm(initialMemberForm)
      }
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete member')
    } finally {
      setDeletingKey('')
    }
  }

  const handleCancelEditMember = () => {
    setEditingMemberId('')
    setMemberForm(initialMemberForm)
  }

  const teamMembers = pageData?.teamMembers || []

  return (
    <DashboardShell
      title="Team management"
      subtitle="Manage public Our Team page hero banner and team member cards (name, role, photo, social links)."
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff] sm:text-sm sm:tracking-[0.22em]">
                  Page content
                </p>
                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Hero banner</h2>
              </div>
              <button
                type="button"
                onClick={loadPageData}
                className="shrink-0 self-start rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white transition hover:border-[#00d2ff]/22 sm:rounded-2xl sm:px-4 sm:text-sm"
              >
                Refresh
              </button>
            </div>

            <form className="mt-5 space-y-3 sm:space-y-4" onSubmit={handleHeroSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Hero image (URL)</span>
                <input
                  type="text"
                  name="heroImage"
                  value={heroForm.heroImage}
                  onChange={handleHeroChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'heroImage')}
                  className="mt-2 block w-full max-w-full text-xs text-white/75 file:mr-3 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#000b1e] sm:text-sm file:sm:mr-4 file:sm:rounded-xl file:sm:px-4 file:sm:text-sm"
                />
                {uploadingField === 'heroImage' ? (
                  <p className="mt-1 text-xs text-white/50">Uploading…</p>
                ) : null}
              </label>

              <button
                type="submit"
                disabled={savingHero || Boolean(uploadingField)}
                className="w-full rounded-xl bg-[#00d2ff] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.16em]"
              >
                {savingHero ? 'Saving...' : 'Save hero image'}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff] sm:text-sm sm:tracking-[0.22em]">
              Team members
            </p>
            <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Cards on /our-team</h2>

            <form className="mt-5 space-y-3 sm:space-y-4" onSubmit={handleMemberSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={memberForm.name}
                  onChange={handleMemberFormChange}
                  placeholder="Full name"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
                <input
                  type="text"
                  name="role"
                  value={memberForm.role}
                  onChange={handleMemberFormChange}
                  placeholder="Role / title"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Photo (URL)</span>
                <input
                  type="text"
                  name="image"
                  value={memberForm.image}
                  onChange={handleMemberFormChange}
                  placeholder="https://…"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'memberImage')}
                  className="mt-2 block w-full max-w-full text-xs text-white/75 file:mr-3 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#000b1e] sm:text-sm file:sm:mr-4 file:sm:rounded-xl file:sm:px-4 file:sm:text-sm"
                />
                {uploadingField === 'memberImage' ? (
                  <p className="mt-1 text-xs text-white/50">Uploading…</p>
                ) : null}
              </label>

              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 sm:text-xs sm:tracking-[0.14em]">
                Social (optional)
              </p>
              <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
                <input
                  type="text"
                  name="socialFacebook"
                  value={memberForm.socialFacebook}
                  onChange={handleMemberFormChange}
                  placeholder="Facebook URL"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
                <input
                  type="text"
                  name="socialLinkedin"
                  value={memberForm.socialLinkedin}
                  onChange={handleMemberFormChange}
                  placeholder="LinkedIn URL"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
                <input
                  type="text"
                  name="socialGithub"
                  value={memberForm.socialGithub}
                  onChange={handleMemberFormChange}
                  placeholder="GitHub URL"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d2ff]/40 sm:rounded-2xl sm:px-4 sm:py-3"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                <button
                  type="submit"
                  disabled={savingMember}
                  className="w-full rounded-xl bg-[#00d2ff] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.16em]"
                >
                  {savingMember ? 'Saving...' : editingMemberId ? 'Update member' : 'Create member'}
                </button>
                {editingMemberId ? (
                  <button
                    type="button"
                    onClick={handleCancelEditMember}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:border-[#00d2ff]/22 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-5 lg:sticky lg:top-4 lg:max-h-[min(72vh,38rem)] lg:overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff] sm:text-sm sm:tracking-[0.22em]">
            Current data
          </p>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Live team content</h2>

          {message ? (
            <p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-200 sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-200 sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              {error}
            </p>
          ) : null}

          <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
            {loading ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68 sm:rounded-2xl">
                Loading…
              </div>
            ) : (
              <>
                {pageData?.heroImage ? (
                  <div className="overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl">
                    <img
                      src={pageData.heroImage}
                      alt="Hero preview"
                      className="aspect-[21/9] max-h-28 w-full object-cover sm:max-h-32"
                    />
                  </div>
                ) : null}

                {teamMembers.length ? (
                  teamMembers.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border border-white/10 bg-[#0a3146]/22 p-3 sm:rounded-2xl sm:p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="mx-auto h-16 w-16 shrink-0 rounded-lg object-cover sm:mx-0 sm:h-14 sm:w-14 sm:rounded-xl"
                          />
                        ) : null}
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                          <p className="text-sm font-bold text-white sm:text-base">{item.name}</p>
                          <p className="mt-0.5 text-xs text-white/68 sm:text-sm">{item.role}</p>
                          {item.image ? (
                            <p
                              className="mt-1.5 line-clamp-2 break-all text-left text-[10px] leading-snug text-white/40 sm:text-[11px]"
                              title={item.image}
                            >
                              {item.image}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex shrink-0 justify-center gap-2 sm:justify-end">
                          <button
                            type="button"
                            onClick={() => handleEditMember(item)}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#00d2ff]/22 sm:rounded-xl sm:py-2 sm:text-xs sm:tracking-[0.14em]"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(item._id)}
                            disabled={deletingKey === item._id}
                            className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-65 sm:rounded-xl sm:py-2 sm:text-xs sm:tracking-[0.14em]"
                          >
                            {deletingKey === item._id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-white/68 sm:rounded-2xl">
                    No team members.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </DashboardShell>
  )
}
