import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  sidebarEyebrow: '',
  sidebarTitle: '',
  sidebarDescription: '',
  contactCardTitle: '',
  contactCardBody: '',
}

const initialFaqItemForm = { question: '', answer: '' }

const sectionKey = 'faqItems'

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

export default function FAQManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [faqItemForm, setFaqItemForm] = useState(initialFaqItemForm)
  const [editingFaqId, setEditingFaqId] = useState('')
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingFaq, setSavingFaq] = useState(false)
  const [deletingKey, setDeletingKey] = useState('')
  const [uploadingField, setUploadingField] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/faq-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        sidebarEyebrow: data.sidebarEyebrow || '',
        sidebarTitle: data.sidebarTitle || '',
        sidebarDescription: data.sidebarDescription || '',
        contactCardTitle: data.contactCardTitle || '',
        contactCardBody: data.contactCardBody || '',
      })
    } catch (requestError) {
      setError(requestError.message || 'Failed to load FAQ page data')
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

  const handleFaqFormChange = (event) => {
    const { name, value } = event.target
    setFaqItemForm((current) => ({ ...current, [name]: value }))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingField('heroImage')
    setMessage('')
    setError('')

    try {
      const uploadedUrl = await uploadFile(file)
      setPageForm((current) => ({ ...current, heroImage: uploadedUrl }))
      setMessage('Image uploaded')
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
      const result = await apiRequest('/api/faq-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'FAQ page updated')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const handleFaqSubmit = async (event) => {
    event.preventDefault()
    setSavingFaq(true)
    setMessage('')
    setError('')

    try {
      const path = editingFaqId
        ? `/api/faq-page/${sectionKey}/${editingFaqId}`
        : `/api/faq-page/${sectionKey}`
      const method = editingFaqId ? 'PATCH' : 'POST'

      const body = {
        question: String(faqItemForm.question).trim(),
        answer: String(faqItemForm.answer).trim(),
      }

      if (!body.question || !body.answer) {
        throw new Error('Question and answer are required')
      }

      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(body),
      })

      setMessage(result.message || 'FAQ item saved')
      setFaqItemForm(initialFaqItemForm)
      setEditingFaqId('')
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save FAQ item')
    } finally {
      setSavingFaq(false)
    }
  }

  const handleEditFaq = (item) => {
    setFaqItemForm({
      question: item.question || '',
      answer: item.answer || '',
    })
    setEditingFaqId(item._id)
    setMessage('')
    setError('')
  }

  const handleDeleteFaq = async (itemId) => {
    setDeletingKey(itemId)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest(`/api/faq-page/${sectionKey}/${itemId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Item deleted')
      if (editingFaqId === itemId) {
        setEditingFaqId('')
        setFaqItemForm(initialFaqItemForm)
      }
      await loadPageData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete item')
    } finally {
      setDeletingKey('')
    }
  }

  const handleCancelEditFaq = () => {
    setEditingFaqId('')
    setFaqItemForm(initialFaqItemForm)
  }

  const faqItems = pageData?.faqItems || []

  return (
    <DashboardShell
      title="FAQ management"
      subtitle="Manage public FAQ page hero, sidebar copy, contact card, and accordion items."
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Page content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero and sidebar</h2>
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
                ['sidebarEyebrow', 'Sidebar — eyebrow'],
                ['sidebarTitle', 'Sidebar — title'],
                ['contactCardTitle', 'Contact card — title'],
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

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Sidebar — description</span>
                <textarea
                  name="sidebarDescription"
                  value={pageForm.sidebarDescription}
                  onChange={handlePageChange}
                  rows="4"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Contact card — body</span>
                <textarea
                  name="contactCardBody"
                  value={pageForm.contactCardBody}
                  onChange={handlePageChange}
                  rows="3"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Hero image (URL)</span>
                <input
                  type="text"
                  name="heroImage"
                  value={pageForm.heroImage}
                  onChange={handlePageChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-2 block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                />
                {uploadingField === 'heroImage' ? (
                  <p className="mt-1 text-xs text-white/50">Uploading…</p>
                ) : null}
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

          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">FAQ items</p>
            <h2 className="mt-3 text-2xl font-black text-white">Accordion questions</h2>

            <form className="mt-5 space-y-4" onSubmit={handleFaqSubmit}>
              <input
                type="text"
                name="question"
                value={faqItemForm.question}
                onChange={handleFaqFormChange}
                placeholder="Question"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
                required={!editingFaqId}
              />
              <textarea
                name="answer"
                value={faqItemForm.answer}
                onChange={handleFaqFormChange}
                rows="5"
                placeholder="Answer"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-[#00d2ff]/40"
                required={!editingFaqId}
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={savingFaq}
                  className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {savingFaq ? 'Saving...' : editingFaqId ? 'Update item' : 'Create item'}
                </button>
                {editingFaqId ? (
                  <button
                    type="button"
                    onClick={handleCancelEditFaq}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Current data</p>
          <h2 className="mt-3 text-2xl font-black text-white">Live FAQ content</h2>

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

          <div className="mt-6 space-y-3">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">
                Loading…
              </div>
            ) : faqItems.length ? (
              faqItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-white/10 bg-[#0a3146]/22 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-bold text-white">{item.question}</p>
                      <p className="mt-2 text-sm leading-7 text-white/68">{item.answer}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditFaq(item)}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#00d2ff]/22"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(item._id)}
                        disabled={deletingKey === item._id}
                        className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-65"
                      >
                        {deletingKey === item._id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-white/68">
                No FAQ items.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
