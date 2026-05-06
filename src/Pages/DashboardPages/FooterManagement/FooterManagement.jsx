import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  aboutTitle: 'About Company',
  aboutDescription: '',
  contactsTitle: 'Contacts',
  addressLabel: 'Adress:',
  addressValue: '',
  emailLabel: 'Email:',
  emailValue: '',
  phoneLabel: 'Phone:',
  phoneValue: '',
  newsletterTitle: 'Newsletter',
  newsletterDescription: '',
  newsletterPlaceholder: 'Subscribe with us',
  copyrightPrefix: '© Developed by',
  companyName: 'SoftEdge Technology LTD.',
}

const sectionConfig = {
  socialLinks: { title: 'Social Links', fields: ['label', 'href', 'ariaLabel'] },
}

const initialSectionForms = Object.fromEntries(
  Object.entries(sectionConfig).map(([key, config]) => [key, Object.fromEntries(config.fields.map((field) => [field, '']))]),
)

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'Request failed')
  return data
}

export default function FooterManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [sectionForms, setSectionForms] = useState(initialSectionForms)
  const [pageData, setPageData] = useState(null)
  const [editing, setEditing] = useState({})
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingSection, setSavingSection] = useState('')
  const [deletingKey, setDeletingKey] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest('/api/footer-content')
      setPageData(data)
      setPageForm({
        ...initialPageForm,
        ...Object.fromEntries(Object.keys(initialPageForm).map((key) => [key, data[key] || initialPageForm[key]])),
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load footer content')
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
      const result = await apiRequest('/api/footer-content', { method: 'PUT', body: JSON.stringify(pageForm) })
      setMessage(result.message || 'Footer content updated successfully')
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
      const payload = { ...sectionForms[section] }
      const editingId = editing[section]
      const path = editingId ? `/api/footer-content/${section}/${editingId}` : `/api/footer-content/${section}`
      const method = editingId ? 'PATCH' : 'POST'
      const result = await apiRequest(path, { method, body: JSON.stringify(payload) })
      setMessage(result.message || `${sectionConfig[section].title} updated successfully`)
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
    const config = sectionConfig[section]
    const nextValues = Object.fromEntries(config.fields.map((field) => [field, item[field] || '']))
    setSectionForms((current) => ({ ...current, [section]: nextValues }))
    setEditing((current) => ({ ...current, [section]: item._id }))
  }

  const handleDeleteItem = async (section, itemId) => {
    setDeletingKey(`${section}-${itemId}`)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest(`/api/footer-content/${section}/${itemId}`, { method: 'DELETE' })
      setMessage(result.message || 'Item deleted successfully')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete item')
    } finally {
      setDeletingKey('')
    }
  }

  return (
    <DashboardShell
      title="Footer Management"
      subtitle="Ei dashboard theke footer er about, contacts, newsletter, copyright and social links content CRUD korte parbe."
    >
      <div className="space-y-4">
        {message ? <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">{message}</div> : null}
        {error ? <div className="rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-2 text-sm text-red-100">{error}</div> : null}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Footer Settings</h2>
            <button type="button" onClick={loadPageData} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/90">
              Refresh
            </button>
          </div>
          <form className="mt-4 space-y-2.5" onSubmit={handlePageSubmit}>
            {Object.keys(initialPageForm).map((key) => (
              <label key={key} className="block">
                <span className="mb-1 block text-[11px] text-white/80">{key}</span>
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
            <button type="submit" disabled={savingPage || loading} className="rounded-xl bg-[#00d2ff] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e]">
              {savingPage ? 'Saving...' : 'Save Footer Content'}
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[24px] border border-white/10 bg-[#000b1e]/40 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{sectionConfig.socialLinks.title}</h3>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80">
                {(pageData?.socialLinks || []).length} items
              </span>
            </div>
            <form className="mt-3 space-y-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3" onSubmit={(event) => handleSectionSubmit('socialLinks', event)}>
              {sectionConfig.socialLinks.fields.map((field) => (
                <div key={`socialLinks-${field}`}>
                  <p className="mb-1 text-[11px] text-white/75">{field}</p>
                  <input
                    name={field}
                    value={sectionForms.socialLinks[field]}
                    onChange={(event) => handleSectionFormChange('socialLinks', event)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  />
                </div>
              ))}
              <button type="submit" disabled={savingSection === 'socialLinks'} className="rounded-xl bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e]">
                {savingSection === 'socialLinks' ? 'Saving...' : editing.socialLinks ? 'Update Item' : 'Add Item'}
              </button>
            </form>
            <ul className="mt-3 grid gap-2">
              {(pageData?.socialLinks || []).map((item) => (
                <li key={item._id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-xs text-white/70">{item.href}</p>
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => handleEditItem('socialLinks', item)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/90">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem('socialLinks', item._id)}
                      disabled={deletingKey === `socialLinks-${item._id}`}
                      className="rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-200"
                    >
                      {deletingKey === `socialLinks-${item._id}` ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
