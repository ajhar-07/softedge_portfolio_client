import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/Authcontext/AuthContext'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const emptyPageForm = () => ({
  heroImage: '',
  pageEyebrow: '',
  pageTitle: '',
  pageIntro: '',
})

const emptyArticleForm = () => ({
  slug: '',
  category: '',
  date: '',
  readTime: '',
  title: '',
  excerpt: '',
  image: '',
  paragraphsText: '',
})

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

async function deleteBlogComment(commentId, moderatorEmail) {
  const q = `moderatorEmail=${encodeURIComponent(moderatorEmail)}`
  const response = await fetch(`${API_BASE_URL}/api/blog-comments/${commentId}?${q}`, {
    method: 'DELETE',
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.error || 'Delete failed')
  }
  return data
}

function formatCommentTime(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return ''
  }
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'File upload failed')
  const fileUrl = data?.file?.url ? `${API_BASE_URL}${data.file.url}` : ''
  if (!fileUrl) throw new Error('Uploaded file URL not found')
  return fileUrl
}

function paragraphsToText(paragraphs) {
  if (!Array.isArray(paragraphs)) return ''
  return paragraphs.filter((p) => typeof p === 'string' && p.trim()).join('\n\n')
}

function textToParagraphs(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function articleFormFromApi(item) {
  if (!item || typeof item !== 'object') return emptyArticleForm()
  return {
    slug: item.slug || '',
    category: item.category || '',
    date: item.date || '',
    readTime: item.readTime || '',
    title: item.title || '',
    excerpt: item.excerpt || '',
    image: item.image || '',
    paragraphsText: paragraphsToText(item.paragraphs),
  }
}

function buildArticlePayload(form) {
  return {
    slug: String(form.slug).trim(),
    category: String(form.category).trim(),
    date: String(form.date).trim(),
    readTime: String(form.readTime).trim(),
    title: String(form.title).trim(),
    excerpt: String(form.excerpt).trim(),
    image: String(form.image).trim(),
    paragraphs: textToParagraphs(form.paragraphsText),
  }
}

export default function BlogManagement() {
  const { user } = useContext(AuthContext)
  const [pageData, setPageData] = useState(null)
  const [pageForm, setPageForm] = useState(emptyPageForm())
  const [featuredForm, setFeaturedForm] = useState(emptyArticleForm())
  const [postForm, setPostForm] = useState(emptyArticleForm())
  const [editingPostId, setEditingPostId] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingFeatured, setSavingFeatured] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [deletingKey, setDeletingKey] = useState('')
  const [deletingCommentId, setDeletingCommentId] = useState('')
  const [blogComments, setBlogComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [uploadingField, setUploadingField] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPageData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest('/api/blog-page')
      setPageData(data)
      setPageForm({
        heroImage: data.heroImage || '',
        pageEyebrow: data.pageEyebrow || '',
        pageTitle: data.pageTitle || '',
        pageIntro: data.pageIntro || '',
      })
      setFeaturedForm(articleFormFromApi(data.featuredPost))
    } catch (e) {
      setError(e.message || 'Failed to load blog page')
    } finally {
      setLoading(false)
    }
  }

  const loadBlogComments = useCallback(async () => {
    setCommentsLoading(true)
    try {
      const data = await apiRequest('/api/blog-comments')
      setBlogComments(Array.isArray(data.comments) ? data.comments : [])
    } catch {
      setBlogComments([])
    } finally {
      setCommentsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPageData()
  }, [])

  useEffect(() => {
    loadBlogComments()
  }, [loadBlogComments])

  const handlePageField = (e) => {
    const { name, value } = e.target
    setPageForm((c) => ({ ...c, [name]: value }))
  }

  const handleFeaturedField = (e) => {
    const { name, value } = e.target
    setFeaturedForm((c) => ({ ...c, [name]: value }))
  }

  const handlePostField = (e) => {
    const { name, value } = e.target
    setPostForm((c) => ({ ...c, [name]: value }))
  }

  const handleImageUpload = async (e, formSetter, fieldName, uploadKey) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingField(uploadKey)
    setMessage('')
    setError('')
    try {
      const url = await uploadFile(file)
      formSetter((c) => ({ ...c, [fieldName]: url }))
      setMessage('Image uploaded')
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploadingField('')
      e.target.value = ''
    }
  }

  const handleSavePage = async (e) => {
    e.preventDefault()
    setSavingPage(true)
    setMessage('')
    setError('')
    try {
      const res = await apiRequest('/api/blog-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(res.message || 'Page settings saved')
      await loadPageData()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSavingPage(false)
    }
  }

  const handleSaveFeatured = async (e) => {
    e.preventDefault()
    setSavingFeatured(true)
    setMessage('')
    setError('')
    try {
      const featuredPost = buildArticlePayload(featuredForm)
      const res = await apiRequest('/api/blog-page', {
        method: 'PUT',
        body: JSON.stringify({
          ...pageForm,
          featuredPost,
        }),
      })
      setMessage(res.message || 'Featured article saved')
      await loadPageData()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSavingFeatured(false)
    }
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    setSavingPost(true)
    setMessage('')
    setError('')
    try {
      const body = buildArticlePayload(postForm)
      if (!body.slug || !body.title || !body.image) {
        throw new Error('Slug, title, and image are required')
      }
      if (!body.paragraphs.length) {
        throw new Error('Add at least one paragraph (blocks separated by a blank line)')
      }
      const path = editingPostId ? `/api/blog-page/posts/${editingPostId}` : '/api/blog-page/posts'
      const method = editingPostId ? 'PATCH' : 'POST'
      const res = await apiRequest(path, { method, body: JSON.stringify(body) })
      setMessage(res.message || 'Post saved')
      setPostForm(emptyArticleForm())
      setEditingPostId('')
      await loadPageData()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSavingPost(false)
    }
  }

  const handleEditPost = (item) => {
    setPostForm(articleFormFromApi(item))
    setEditingPostId(item._id)
    setMessage('')
    setError('')
  }

  const handleDeleteComment = async (commentId) => {
    if (!user?.email) {
      setError('You must be logged in to moderate comments.')
      return
    }
    setDeletingCommentId(commentId)
    setMessage('')
    setError('')
    try {
      await deleteBlogComment(commentId, user.email)
      setMessage('Comment removed')
      setBlogComments((prev) => prev.filter((c) => c._id !== commentId))
    } catch (err) {
      setError(err.message || 'Could not delete comment')
    } finally {
      setDeletingCommentId('')
    }
  }

  const handleDeletePost = async (id) => {
    setDeletingKey(id)
    setMessage('')
    setError('')
    try {
      const res = await apiRequest(`/api/blog-page/posts/${id}`, { method: 'DELETE' })
      setMessage(res.message || 'Deleted')
      if (editingPostId === id) {
        setEditingPostId('')
        setPostForm(emptyArticleForm())
      }
      await loadPageData()
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingKey('')
    }
  }

  const posts = pageData?.posts || []

  return (
    <DashboardShell
      title="Blog management"
      subtitle="Edit the public /blogs page: hero, titles, featured story, and grid posts. Paragraphs: separate blocks with a blank line."
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/blogs"
            className="text-sm font-semibold text-[#00d2ff] underline-offset-4 hover:underline"
          >
            View public blog →
          </Link>
          <button
            type="button"
            onClick={loadPageData}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
          >
            Refresh
          </button>
        </div>

        {message ? (
          <p className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">Page & hero</p>
              <h2 className="mt-2 text-xl font-black text-white">Header strip</h2>
              {loading ? (
                <p className="mt-4 text-sm text-white/55">Loading…</p>
              ) : (
                <form className="mt-4 space-y-3" onSubmit={handleSavePage}>
                  {[
                    ['pageEyebrow', 'Eyebrow (e.g. Insights)'],
                    ['pageTitle', 'Main title'],
                  ].map(([name, label]) => (
                    <label key={name} className="block">
                      <span className="mb-1 block text-xs font-medium text-white/70">{label}</span>
                      <input
                        name={name}
                        value={pageForm[name]}
                        onChange={handlePageField}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-white/70">Intro paragraph</span>
                    <textarea
                      name="pageIntro"
                      value={pageForm.pageIntro}
                      onChange={handlePageField}
                      rows={3}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-white/70">Hero image URL</span>
                    <input
                      name="heroImage"
                      value={pageForm.heroImage}
                      onChange={handlePageField}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setPageForm, 'heroImage', 'hero')}
                      className="mt-2 block w-full text-xs text-white/70 file:mr-2 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#000b1e]"
                    />
                    {uploadingField === 'hero' ? (
                      <span className="mt-1 text-xs text-white/45">Uploading…</span>
                    ) : null}
                  </label>
                  <button
                    type="submit"
                    disabled={savingPage || Boolean(uploadingField)}
                    className="rounded-full bg-[#00d2ff] px-5 py-2 text-sm font-bold text-[#000b1e] disabled:opacity-60"
                  >
                    {savingPage ? 'Saving…' : 'Save page & hero'}
                  </button>
                </form>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">Featured article</p>
              <h2 className="mt-2 text-xl font-black text-white">Large card on /blogs</h2>
              {!loading ? (
                <form className="mt-4 max-h-[70vh] space-y-3 overflow-y-auto pr-1" onSubmit={handleSaveFeatured}>
                  {['slug', 'category', 'date', 'readTime', 'title', 'excerpt', 'image'].map((name) => (
                    <label key={name} className="block">
                      <span className="mb-1 block text-xs font-medium capitalize text-white/70">{name}</span>
                      {name === 'excerpt' ? (
                        <textarea
                          name={name}
                          value={featuredForm[name]}
                          onChange={handleFeaturedField}
                          rows={2}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                        />
                      ) : (
                        <input
                          name={name}
                          value={featuredForm[name]}
                          onChange={handleFeaturedField}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                        />
                      )}
                    </label>
                  ))}
                  {featuredForm.image ? (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                      <img src={featuredForm.image} alt="" className="h-24 w-full object-cover" />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setFeaturedForm, 'image', 'featured')}
                    className="block w-full text-xs text-white/70 file:mr-2 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#000b1e]"
                  />
                  {uploadingField === 'featured' ? (
                    <span className="text-xs text-white/45">Uploading…</span>
                  ) : null}
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-white/70">
                      Body paragraphs (blank line between paragraphs)
                    </span>
                    <textarea
                      name="paragraphsText"
                      value={featuredForm.paragraphsText}
                      onChange={handleFeaturedField}
                      rows={10}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs leading-relaxed text-white outline-none focus:border-[#00d2ff]/35"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={savingFeatured || Boolean(uploadingField)}
                    className="rounded-full bg-[#00d2ff] px-5 py-2 text-sm font-bold text-[#000b1e] disabled:opacity-60"
                  >
                    {savingFeatured ? 'Saving…' : 'Save featured article'}
                  </button>
                </form>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">Grid posts</p>
              <h2 className="mt-2 text-xl font-black text-white">Create or edit</h2>
              {!loading ? (
                <form className="mt-4 max-h-[55vh] space-y-3 overflow-y-auto pr-1" onSubmit={handlePostSubmit}>
                  {['slug', 'category', 'date', 'readTime', 'title', 'excerpt', 'image'].map((name) => (
                    <label key={name} className="block">
                      <span className="mb-1 block text-xs font-medium capitalize text-white/70">{name}</span>
                      {name === 'excerpt' ? (
                        <textarea
                          name={name}
                          value={postForm[name]}
                          onChange={handlePostField}
                          rows={2}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                        />
                      ) : (
                        <input
                          name={name}
                          value={postForm[name]}
                          onChange={handlePostField}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/35"
                        />
                      )}
                    </label>
                  ))}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setPostForm, 'image', 'post')}
                    className="block w-full text-xs text-white/70 file:mr-2 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#000b1e]"
                  />
                  {uploadingField === 'post' ? (
                    <span className="text-xs text-white/45">Uploading…</span>
                  ) : null}
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-white/70">Paragraphs (blank line between)</span>
                    <textarea
                      name="paragraphsText"
                      value={postForm.paragraphsText}
                      onChange={handlePostField}
                      rows={8}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#00d2ff]/35"
                    />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={savingPost}
                      className="rounded-full bg-[#00d2ff] px-5 py-2 text-sm font-bold text-[#000b1e] disabled:opacity-60"
                    >
                      {savingPost ? 'Saving…' : editingPostId ? 'Update post' : 'Add post'}
                    </button>
                    {editingPostId ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPostId('')
                          setPostForm(emptyArticleForm())
                        }}
                        className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white"
                      >
                        Cancel edit
                      </button>
                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#000b1e]/42 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Current posts</p>
              <ul className="mt-3 max-h-[40vh] space-y-2 overflow-y-auto">
                {posts.map((p) => (
                  <li
                    key={p._id}
                    className="flex items-start justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#0a3146]/20 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                      <p className="truncate text-xs text-white/45">{p.slug}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditPost(p)}
                        className="rounded-lg border border-white/10 px-2 py-1 text-[10px] font-bold uppercase text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(p._id)}
                        disabled={deletingKey === p._id}
                        className="rounded-lg border border-red-400/20 px-2 py-1 text-[10px] font-bold uppercase text-red-200"
                      >
                        {deletingKey === p._id ? '…' : 'Del'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/20 bg-[linear-gradient(165deg,rgba(30,22,8,0.35),rgba(0,11,30,0.55))] p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/90">Blog comments</p>
              <h2 className="mt-2 text-xl font-black text-white">Public /blogs discussion</h2>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-white/55">
                Same thread as on the blog page. Only addresses in the server admin list may delete comments
                (moderator query on the API).
              </p>
            </div>
            <button
              type="button"
              onClick={loadBlogComments}
              className="shrink-0 self-start rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white transition hover:border-amber-400/30"
            >
              Refresh comments
            </button>
          </div>

          {commentsLoading ? (
            <p className="mt-6 text-sm text-white/50">Loading comments…</p>
          ) : blogComments.length === 0 ? (
            <p className="mt-6 text-sm text-white/45">No comments yet.</p>
          ) : (
            <ul className="mt-6 max-h-[min(55vh,28rem)] space-y-3 overflow-y-auto">
              {blogComments.map((c) => (
                <li
                  key={c._id}
                  className="rounded-xl border border-white/[0.08] bg-[#000b1e]/50 px-4 py-3 sm:px-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs text-white/50">
                        <span className="font-semibold text-white/90">{c.authorName || 'Member'}</span>
                        <span className="text-white/35">{c.authorEmail || ''}</span>
                        <span className="text-amber-200/60">{formatCommentTime(c.createdAt)}</span>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/78">{c.text}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(c._id)}
                      disabled={deletingCommentId === c._id}
                      className="shrink-0 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-200 transition hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {deletingCommentId === c._id ? 'Removing…' : 'Remove'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
