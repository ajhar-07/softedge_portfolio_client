import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  pageTitle: 'Privacy Policy',
}

const initialAsideForm = {
  privacyFirst: { label: '', title: '', description: '' },
  highlightsLabel: '',
  needHelp: { label: '', description: '' },
}

const initialSectionForm = {
  title: '',
  paragraphsText: '',
  bulletsText: '',
  footer: '',
}

const initialHighlightForm = { text: '' }

function paragraphsFromText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function bulletsFromText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function textFromParagraphs(arr) {
  return Array.isArray(arr) ? arr.join('\n\n') : ''
}

function textFromBullets(arr) {
  return Array.isArray(arr) ? arr.join('\n') : ''
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
  if (!fileUrl) throw new Error('Uploaded file URL not found')
  return fileUrl
}

export default function PrivacyPolicyManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [asideForm, setAsideForm] = useState(initialAsideForm)
  const [sectionForm, setSectionForm] = useState(initialSectionForm)
  const [highlightForm, setHighlightForm] = useState(initialHighlightForm)
  const [editingSectionId, setEditingSectionId] = useState('')
  const [sectionBulletsInitial, setSectionBulletsInitial] = useState('')
  const [sectionFooterInitial, setSectionFooterInitial] = useState('')
  const [editingHighlightId, setEditingHighlightId] = useState('')
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingHeader, setSavingHeader] = useState(false)
  const [savingAside, setSavingAside] = useState(false)
  const [savingSection, setSavingSection] = useState(false)
  const [savingHighlight, setSavingHighlight] = useState(false)
  const [deletingSectionId, setDeletingSectionId] = useState('')
  const [deletingHighlightId, setDeletingHighlightId] = useState('')
  const [uploadingHero, setUploadingHero] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest('/api/privacy-policy-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        pageTitle: data.pageTitle || 'Privacy Policy',
      })
      const pf = data.asidePrivacyFirst || {}
      const ah = data.asideHighlights || {}
      const nh = data.asideNeedHelp || {}
      setAsideForm({
        privacyFirst: {
          label: pf.label || '',
          title: pf.title || '',
          description: pf.description || '',
        },
        highlightsLabel: ah.label || '',
        needHelp: {
          label: nh.label || '',
          description: nh.description || '',
        },
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load privacy policy page')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPageData()
  }, [])

  const handlePageField = (event) => {
    const { name, value } = event.target
    setPageForm((c) => ({ ...c, [name]: value }))
  }

  const handleAsidePrivacyFirst = (event) => {
    const { name, value } = event.target
    setAsideForm((c) => ({
      ...c,
      privacyFirst: { ...c.privacyFirst, [name]: value },
    }))
  }

  const handleAsideHighlightsLabel = (event) => {
    setAsideForm((c) => ({ ...c, highlightsLabel: event.target.value }))
  }

  const handleAsideNeedHelp = (event) => {
    const { name, value } = event.target
    setAsideForm((c) => ({
      ...c,
      needHelp: { ...c.needHelp, [name]: value },
    }))
  }

  const handleSectionField = (event) => {
    const { name, value } = event.target
    setSectionForm((c) => ({ ...c, [name]: value }))
  }

  const handleHeroUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingHero(true)
    setMessage('')
    setError('')
    try {
      const url = await uploadFile(file)
      setPageForm((c) => ({ ...c, heroImage: url }))
      setMessage('Hero image uploaded — save header to persist if needed.')
    } catch (e) {
      setError(e.message || 'Upload failed')
    } finally {
      setUploadingHero(false)
      event.target.value = ''
    }
  }

  const handleSaveHeader = async (event) => {
    event.preventDefault()
    setSavingHeader(true)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest('/api/privacy-policy-page', {
        method: 'PUT',
        body: JSON.stringify({
          heroImage: pageForm.heroImage,
          pageTitle: pageForm.pageTitle,
        }),
      })
      setMessage(result.message || 'Header updated')
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Failed to save header')
    } finally {
      setSavingHeader(false)
    }
  }

  const handleSaveAside = async (event) => {
    event.preventDefault()
    setSavingAside(true)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest('/api/privacy-policy-page', {
        method: 'PUT',
        body: JSON.stringify({
          asidePrivacyFirst: asideForm.privacyFirst,
          asideHighlights: { label: asideForm.highlightsLabel },
          asideNeedHelp: asideForm.needHelp,
        }),
      })
      setMessage(result.message || 'Sidebar blocks updated')
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Failed to save sidebar')
    } finally {
      setSavingAside(false)
    }
  }

  const buildSectionPayload = (partial) => {
    const paragraphs = paragraphsFromText(sectionForm.paragraphsText)
    const bulletsRaw = bulletsFromText(sectionForm.bulletsText)
    const footerTrim = sectionForm.footer.trim()

    if (!partial) {
      return {
        title: sectionForm.title.trim(),
        paragraphs,
        ...(bulletsRaw.length ? { bullets: bulletsRaw } : {}),
        ...(footerTrim ? { footer: footerTrim } : {}),
      }
    }

    const body = {}
    if (sectionForm.title.trim()) body.title = sectionForm.title.trim()
    if (sectionForm.paragraphsText.trim()) body.paragraphs = paragraphs
    if (sectionForm.bulletsText !== sectionBulletsInitial) {
      if (!sectionForm.bulletsText.trim()) body.bullets = null
      else body.bullets = bulletsRaw
    }
    if (sectionForm.footer !== sectionFooterInitial) {
      if (!sectionForm.footer.trim()) body.footer = null
      else body.footer = footerTrim
    }
    return body
  }

  const handleSectionSubmit = async (event) => {
    event.preventDefault()
    setSavingSection(true)
    setMessage('')
    setError('')
    try {
      if (editingSectionId) {
        const body = buildSectionPayload(true)
        if (!Object.keys(body).length) {
          setError('Patch er jonno kampon ekta field bhorte hobe.')
          return
        }
        const result = await apiRequest(`/api/privacy-policy-page/sections/${editingSectionId}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        })
        setMessage(result.message || 'Section updated')
      } else {
        const body = buildSectionPayload(false)
        if (!body.title) {
          setError('Title lagbe.')
          return
        }
        if (!body.paragraphs?.length) {
          setError('Kampon ekta paragraph lagbe — alada alada paragraph er majhe khali line din.')
          return
        }
        const result = await apiRequest('/api/privacy-policy-page/sections', {
          method: 'POST',
          body: JSON.stringify(body),
        })
        setMessage(result.message || 'Section created')
      }
      setSectionForm(initialSectionForm)
      setEditingSectionId('')
      setSectionBulletsInitial('')
      setSectionFooterInitial('')
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Section save failed')
    } finally {
      setSavingSection(false)
    }
  }

  const startEditSection = (section) => {
    const bulletsText = textFromBullets(section.bullets)
    const footer = section.footer || ''
    setEditingSectionId(section._id)
    setSectionBulletsInitial(bulletsText)
    setSectionFooterInitial(footer)
    setSectionForm({
      title: section.title || '',
      paragraphsText: textFromParagraphs(section.paragraphs),
      bulletsText,
      footer,
    })
    setMessage('')
    setError('')
  }

  const cancelEditSection = () => {
    setEditingSectionId('')
    setSectionBulletsInitial('')
    setSectionFooterInitial('')
    setSectionForm(initialSectionForm)
  }

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Ei section muche felte chan?')) return
    setDeletingSectionId(sectionId)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`/api/privacy-policy-page/sections/${sectionId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Section deleted')
      if (editingSectionId === sectionId) cancelEditSection()
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Delete failed')
    } finally {
      setDeletingSectionId('')
    }
  }

  const handleHighlightSubmit = async (event) => {
    event.preventDefault()
    setSavingHighlight(true)
    setMessage('')
    setError('')
    try {
      if (editingHighlightId) {
        const result = await apiRequest(`/api/privacy-policy-page/highlight-items/${editingHighlightId}`, {
          method: 'PATCH',
          body: JSON.stringify({ text: highlightForm.text.trim() }),
        })
        setMessage(result.message || 'Highlight updated')
      } else {
        const result = await apiRequest('/api/privacy-policy-page/highlight-items', {
          method: 'POST',
          body: JSON.stringify({ text: highlightForm.text.trim() }),
        })
        setMessage(result.message || 'Highlight created')
      }
      setHighlightForm(initialHighlightForm)
      setEditingHighlightId('')
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Highlight save failed')
    } finally {
      setSavingHighlight(false)
    }
  }

  const startEditHighlight = (item) => {
    setEditingHighlightId(item._id)
    setHighlightForm({ text: item.text || '' })
    setMessage('')
    setError('')
  }

  const cancelEditHighlight = () => {
    setEditingHighlightId('')
    setHighlightForm(initialHighlightForm)
  }

  const handleDeleteHighlight = async (itemId) => {
    if (!window.confirm('Ei highlight muche felte chan?')) return
    setDeletingHighlightId(itemId)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`/api/privacy-policy-page/highlight-items/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Highlight deleted')
      if (editingHighlightId === itemId) cancelEditHighlight()
      await loadPageData()
    } catch (e) {
      setError(e.message || 'Delete failed')
    } finally {
      setDeletingHighlightId('')
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40 placeholder:text-white/35'

  const sections = pageData?.sections || []
  const highlightItems = pageData?.asideHighlights?.items || []

  return (
    <DashboardShell
      title="Privacy Policy Management"
      subtitle="Privacy policy public page er shob content — hero, sidebar, policy sections, ar highlight lines — ekhane theke API diye update korte parben."
    >
      <div className="space-y-5">
        {message ? (
          <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={loadPageData}
            disabled={loading}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <Link
            to="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-4 py-2 text-sm font-semibold text-[#00d2ff] transition hover:bg-[#00d2ff]/20"
          >
            Public page →
          </Link>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Hero & title</p>
            <h2 className="mt-2 text-xl font-black text-white">Page header</h2>
            <form className="mt-5 space-y-4" onSubmit={handleSaveHeader}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Hero image URL</span>
                <input type="text" name="heroImage" value={pageForm.heroImage} onChange={handlePageField} className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Upload hero image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroUpload}
                  disabled={uploadingHero}
                  className="text-sm text-white/70 file:mr-3 file:rounded-xl file:border-0 file:bg-[#00d2ff]/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#00d2ff]"
                />
                {uploadingHero ? <span className="mt-1 block text-xs text-white/55">Uploading...</span> : null}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Page title (H1)</span>
                <input type="text" name="pageTitle" value={pageForm.pageTitle} onChange={handlePageField} className={inputClass} />
              </label>
              <button
                type="submit"
                disabled={savingHeader}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:opacity-70"
              >
                {savingHeader ? 'Saving...' : 'Save header'}
              </button>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Sidebar</p>
            <h2 className="mt-2 text-xl font-black text-white">Tin ta aside block</h2>
            <form className="mt-5 space-y-5" onSubmit={handleSaveAside}>
              <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Privacy First</p>
                <input name="label" value={asideForm.privacyFirst.label} onChange={handleAsidePrivacyFirst} placeholder="Label" className={inputClass} />
                <input name="title" value={asideForm.privacyFirst.title} onChange={handleAsidePrivacyFirst} placeholder="Title" className={inputClass} />
                <textarea
                  name="description"
                  value={asideForm.privacyFirst.description}
                  onChange={handleAsidePrivacyFirst}
                  rows={3}
                  placeholder="Description"
                  className={inputClass}
                />
              </div>
              <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Highlights (shudhu section label)</p>
                <input
                  value={asideForm.highlightsLabel}
                  onChange={handleAsideHighlightsLabel}
                  placeholder="e.g. Highlights"
                  className={inputClass}
                />
                <p className="text-xs text-white/45">Line gulo niche &quot;Highlight lines&quot; theke manage korun.</p>
              </div>
              <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Need help?</p>
                <input name="label" value={asideForm.needHelp.label} onChange={handleAsideNeedHelp} placeholder="Label" className={inputClass} />
                <textarea
                  name="description"
                  value={asideForm.needHelp.description}
                  onChange={handleAsideNeedHelp}
                  rows={3}
                  placeholder="Description"
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={savingAside}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:opacity-70"
              >
                {savingAside ? 'Saving...' : 'Save sidebar'}
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Policy sections</p>
          <h2 className="mt-2 text-xl font-black text-white">Create / edit / delete</h2>
          <p className="mt-2 text-sm text-white/55">
            Paragraph gulo alada korte: paragraph er majhe <strong className="text-white/80">ekta khali line</strong> din. Bullets: prottek line e ekta bullet.
          </p>

          <form className="mt-5 space-y-4 border-t border-white/10 pt-5" onSubmit={handleSectionSubmit}>
            <input
              type="text"
              value={sectionForm.title}
              onChange={handleSectionField}
              name="title"
              placeholder="Section title"
              className={inputClass}
              required={!editingSectionId}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Paragraphs</span>
              <textarea
                name="paragraphsText"
                value={sectionForm.paragraphsText}
                onChange={handleSectionField}
                rows={6}
                placeholder={'First paragraph...\n\nSecond paragraph...'}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Bullets (optional, line per item)</span>
              <textarea name="bulletsText" value={sectionForm.bulletsText} onChange={handleSectionField} rows={4} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/82">Footer (optional)</span>
              <textarea name="footer" value={sectionForm.footer} onChange={handleSectionField} rows={2} className={inputClass} />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={savingSection}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:opacity-70"
              >
                {savingSection ? 'Saving...' : editingSectionId ? 'Update section' : 'Create section'}
              </button>
              {editingSectionId ? (
                <button
                  type="button"
                  onClick={cancelEditSection}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white"
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>

          <ul className="mt-6 space-y-3">
            {sections.map((s) => (
              <li
                key={s._id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {(s.paragraphs || []).length} paragraph(s)
                    {s.bullets?.length ? ` · ${s.bullets.length} bullets` : ''}
                    {s.footer ? ' · footer' : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEditSection(s)}
                    className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-white hover:border-[#00d2ff]/40"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(s._id)}
                    disabled={deletingSectionId === s._id}
                    className="rounded-xl border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/10 disabled:opacity-50"
                  >
                    {deletingSectionId === s._id ? '...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Highlight lines</p>
          <h2 className="mt-2 text-xl font-black text-white">Sidebar highlights list</h2>

          <form className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={handleHighlightSubmit}>
            <label className="block flex-1">
              <span className="mb-2 block text-sm font-medium text-white/82">Text</span>
              <input
                type="text"
                value={highlightForm.text}
                onChange={(e) => setHighlightForm({ text: e.target.value })}
                placeholder="Highlight line text"
                className={inputClass}
                required
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={savingHighlight}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#000b1e] disabled:opacity-70"
              >
                {savingHighlight ? '...' : editingHighlightId ? 'Update' : 'Add'}
              </button>
              {editingHighlightId ? (
                <button type="button" onClick={cancelEditHighlight} className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white">
                  Cancel
                </button>
              ) : null}
            </div>
          </form>

          <ul className="mt-4 space-y-2">
            {highlightItems.map((item) => (
              <li
                key={item._id}
                className="flex flex-col justify-between gap-2 rounded-xl border border-white/8 bg-[#071a2d]/50 p-3 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-white/85">{item.text}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEditHighlight(item)}
                    className="rounded-lg border border-white/15 px-2 py-1 text-xs text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHighlight(item._id)}
                    disabled={deletingHighlightId === item._id}
                    className="rounded-lg border border-rose-500/30 px-2 py-1 text-xs text-rose-200"
                  >
                    {deletingHighlightId === item._id ? '...' : 'Del'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  )
}
