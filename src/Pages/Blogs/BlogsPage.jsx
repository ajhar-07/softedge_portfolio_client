import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/Authcontext/AuthContext'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80'

const FEATURED_POST = {
  slug: 'shipping-quality-software',
  category: 'Engineering',
  date: 'Mar 12, 2026',
  readTime: '8 min read',
  title: 'How we ship quality software without slowing teams down',
  excerpt:
    'Practical notes on reviews, automation, and communication patterns that keep delivery predictable while staying friendly to product timelines.',
  image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  paragraphs: [
    'Shipping software is a balance between rigor and speed. Teams that over-index on process can stall; teams that skip basics accumulate risk. We aim for a middle path: lightweight checks that catch real issues early, and automation that removes repetitive toil.',
    'Code review is one lever. We keep reviews kind, specific, and scoped — focused on correctness, security, and maintainability rather than style debates that a linter can own. Pairing on tricky changes replaces long async threads.',
    'Continuous integration gives fast signal on regressions. We invest in stable test suites and meaningful coverage around boundaries: payments, auth, data exports. Flaky tests get fixed or removed; a red build is treated as a stop-the-line moment.',
    'Communication matters as much as tooling. Short written updates, clear owners, and predictable release notes help stakeholders trust the train. When scope shifts, we renegotiate dates instead of silently absorbing pressure.',
    'None of this is novel — but applied consistently, it keeps delivery predictable without turning the team into a bureaucracy. If you are tightening your own process, start with one bottleneck and measure before adding more rules.',
  ],
}

const BLOG_POSTS = [
  {
    slug: 'design-systems-that-scale',
    category: 'Design',
    date: 'Feb 28, 2026',
    readTime: '5 min read',
    title: 'Design systems that actually scale with your product',
    excerpt: 'Tokens, documentation, and governance that help designers and developers stay in sync.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    paragraphs: [
      'A design system is not only a Figma kit — it is the contract between design and engineering. Tokens for color, spacing, and typography should map cleanly to code so that updates propagate without manual drift.',
      'Documentation wins when it answers real questions: when to use a modal versus a drawer, how dense tables should be on mobile, and how to request a new component. Short examples beat long theory.',
      'Governance can be lightweight: a weekly triage for proposals, a clear RFC template, and owners for each primitive. The goal is to avoid both chaos and committee paralysis.',
    ],
  },
  {
    slug: 'api-security-checklist',
    category: 'Security',
    date: 'Feb 14, 2026',
    readTime: '6 min read',
    title: 'A pragmatic API security checklist for growing teams',
    excerpt: 'From auth flows to logging and rate limits — the essentials before you chase perfection.',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    paragraphs: [
      'Start with authentication and authorization: strong session or token handling, least-privilege scopes, and clear separation between public and internal routes. Validate every input server-side.',
      'Logging should help incident response without storing secrets. Structured logs with request IDs make it easier to trace abuse. Rate limiting and anomaly alerts reduce blast radius when credentials leak.',
      'Dependency updates and TLS configuration are boring until they are not. Automate what you can and schedule the rest. Security is a habit more than a one-time audit.',
    ],
  },
  {
    slug: 'cloud-cost-awareness',
    category: 'Cloud',
    date: 'Jan 30, 2026',
    readTime: '7 min read',
    title: 'Cloud cost awareness without killing innovation',
    excerpt: 'Budget guardrails, tagging, and review cadences that make finance and engineering allies.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    paragraphs: [
      'Tag resources by team, environment, and product area so invoices become conversations instead of mysteries. Dashboards that engineers actually open beat spreadsheets that only finance sees.',
      'Guardrails like budget alerts and sandbox limits prevent surprises while still allowing spikes for experiments. The point is signal early, not to block every new idea.',
      'A monthly thirty-minute review of top drivers often finds quick wins: oversized instances, orphaned volumes, or caches that can be tuned. Celebrate savings the same way you celebrate launches.',
    ],
  },
  {
    slug: 'remote-collaboration',
    category: 'Culture',
    date: 'Jan 18, 2026',
    readTime: '4 min read',
    title: 'Remote collaboration rituals that still feel human',
    excerpt: 'Short syncs, written defaults, and async handoffs that reduce meeting fatigue.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    paragraphs: [
      'Default to writing decisions in a durable place so people across time zones can catch up without replaying meetings. Start threads with context: goal, constraints, and a proposal.',
      'Keep synchronous time for alignment and creative work, not status reads. A tight agenda and a note-taker respect everyone’s calendar.',
      'Small social rituals — optional coffee chats, team wins in a shared channel — help remote teams feel less transactional without forcing mandatory fun.',
    ],
  },
  {
    slug: 'data-pipelines-101',
    category: 'Data',
    date: 'Jan 4, 2026',
    readTime: '9 min read',
    title: 'Data pipelines 101: reliability before fancy architecture',
    excerpt: 'Idempotency, backfills, and observability first — then worry about the graph.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    paragraphs: [
      'Reliable pipelines handle partial failures: retries with backoff, dead-letter queues, and clear ownership when a job fails at 2 a.m. Idempotent writes mean re-runs do not double-count.',
      'Backfills are normal. Design tables and jobs so historical loads are possible without rewriting everything. Document assumptions about ordering and late-arriving data.',
      'Observability — row counts, freshness SLAs, and anomaly checks — catches drift before dashboards lie to the business. Fancy orchestration is optional until the basics are boringly stable.',
    ],
  },
]

const DEFAULT_BLOG_PAGE = {
  heroImage: HERO_IMAGE,
  pageEyebrow: 'Insights',
  pageTitle: 'Blog',
  pageIntro:
    'Ideas on engineering, design, security, and how we work — written for builders and product teams.',
  featuredPost: { ...FEATURED_POST },
  posts: BLOG_POSTS.map((post) => ({
    ...post,
    _id: `seed-${post.slug}`,
  })),
}

function normalizeParagraphsFromApi(raw) {
  if (!Array.isArray(raw)) return []
  return raw.map((p) => (typeof p === 'string' ? p.trim() : '')).filter((p) => p.length > 0)
}

function mergeFeaturedPost(apiFeatured, defaults) {
  const base = defaults.featuredPost
  if (!apiFeatured || typeof apiFeatured !== 'object') {
    return { ...base }
  }
  const paragraphs = normalizeParagraphsFromApi(apiFeatured.paragraphs)
  return {
    slug: (apiFeatured.slug ?? '').toString().trim() || base.slug,
    category: (apiFeatured.category ?? '').toString().trim() || base.category,
    date: (apiFeatured.date ?? '').toString().trim() || base.date,
    readTime: (apiFeatured.readTime ?? '').toString().trim() || base.readTime,
    title: (apiFeatured.title ?? '').toString().trim() || base.title,
    excerpt:
      apiFeatured.excerpt != null && String(apiFeatured.excerpt).trim()
        ? String(apiFeatured.excerpt).trim()
        : base.excerpt,
    image: (apiFeatured.image ?? '').toString().trim() || base.image,
    paragraphs: paragraphs.length ? paragraphs : [...base.paragraphs],
  }
}

function normalizeGridPost(post, index, defaults) {
  const fallback = defaults.posts[index] || defaults.posts[0]
  const paragraphs = normalizeParagraphsFromApi(post?.paragraphs)
  const slug = (post?.slug ?? '').toString().trim() || fallback.slug
  return {
    _id: post?._id || fallback._id || `seed-${slug}`,
    slug,
    category: (post?.category ?? '').toString().trim() || fallback.category,
    date: (post?.date ?? '').toString().trim() || fallback.date,
    readTime: (post?.readTime ?? '').toString().trim() || fallback.readTime,
    title: (post?.title ?? '').toString().trim() || fallback.title,
    excerpt: (post?.excerpt ?? '').toString().trim() || fallback.excerpt,
    image: (post?.image ?? '').toString().trim() || fallback.image,
    paragraphs: paragraphs.length ? paragraphs : [...(fallback.paragraphs || [])],
  }
}

function mergeBlogPageData(data) {
  const d = DEFAULT_BLOG_PAGE
  const rawPosts = Array.isArray(data.posts) ? data.posts : []
  const posts =
    rawPosts.length > 0
      ? rawPosts
          .map((post, index) => normalizeGridPost(post, index, d))
          .filter((post) => post.title && post.slug && post.image)
      : d.posts

  return {
    heroImage: (data.heroImage ?? '').toString().trim() || d.heroImage,
    pageEyebrow: (data.pageEyebrow ?? '').toString().trim() || d.pageEyebrow,
    pageTitle: (data.pageTitle ?? '').toString().trim() || d.pageTitle,
    pageIntro:
      data.pageIntro != null && String(data.pageIntro).trim()
        ? String(data.pageIntro).trim()
        : d.pageIntro,
    featuredPost: mergeFeaturedPost(data.featuredPost, d),
    posts: posts.length ? posts : d.posts,
  }
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  if (!article) return null

  const paragraphs = Array.isArray(article.paragraphs) ? article.paragraphs : []

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#000b1e]/75 backdrop-blur-sm"
        aria-label="Close article"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
        className="relative z-[1] flex max-h-[min(92dvh,760px)] w-full max-w-2xl flex-col rounded-t-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(6,22,38,0.98),rgba(4,15,28,0.99))] shadow-[0_-8px_40px_rgba(0,0,0,0.5),0_24px_60px_-20px_rgba(0,0,0,0.65)] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50 sm:text-xs sm:tracking-[0.14em]">
              <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-2 py-0.5 text-[#00d2ff]">
                {article.category}
              </span>
              <span>{article.date}</span>
              {article.readTime ? (
                <>
                  <span className="text-white/30">·</span>
                  <span>{article.readTime}</span>
                </>
              ) : null}
            </div>
            <h2 id="blog-modal-title" className="mt-2 text-lg font-bold leading-snug text-white sm:text-2xl">
              {article.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] p-2 text-white/80 transition hover:border-[#00d2ff]/30 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-3 sm:px-5 sm:pb-7 sm:pt-4">
          {article.image ? (
            <div className="overflow-hidden rounded-xl border border-white/10">
              <img src={article.image} alt="" className="max-h-48 w-full object-cover sm:max-h-56" loading="lazy" />
            </div>
          ) : null}
          <p className="mt-4 text-sm font-medium leading-7 text-white/70 sm:text-base">{article.excerpt}</p>
          <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-sm leading-8 text-white/78 sm:text-base sm:leading-9">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function formatCommentDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return ''
  }
}

function commentInitials(name, email) {
  const n = (name || '').trim()
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase() || '?'
    }
    if (parts[0]?.length >= 2) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0]?.[0] || '?').toUpperCase()
  }
  const local = (email || '').split('@')[0]?.trim() || ''
  if (local.length >= 2) return local.slice(0, 2).toUpperCase()
  return (local[0] || '?').toUpperCase()
}

function CommentAvatar({ name, email }) {
  const initials = commentInitials(name, email)
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#00d2ff,#43a4d8)] text-xs font-black tracking-tight text-[#000b1e] shadow-[0_4px_14px_-4px_rgba(0,210,255,0.45)]"
      aria-hidden
    >
      {initials}
    </div>
  )
}

export default function BlogsPage() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [blogPage, setBlogPage] = useState(DEFAULT_BLOG_PAGE)
  const [blogPageLoading, setBlogPageLoading] = useState(true)
  const [openArticle, setOpenArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [commentSending, setCommentSending] = useState(false)
  const [commentError, setCommentError] = useState('')
  const [commentOk, setCommentOk] = useState('')

  const open = (article) => setOpenArticle(article)
  const close = useCallback(() => setOpenArticle(null), [])

  const loadComments = useCallback(async () => {
    setCommentsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog-comments`)
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.error || 'Failed to load comments')
      setComments(Array.isArray(data.comments) ? data.comments : [])
    } catch {
      setComments([])
    } finally {
      setCommentsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  useEffect(() => {
    let ignore = false
    const loadBlogPage = async () => {
      setBlogPageLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog-page`)
        if (!response.ok) throw new Error('fetch')
        const data = await response.json()
        if (!ignore) setBlogPage(mergeBlogPageData(data))
      } catch {
        if (!ignore) setBlogPage(DEFAULT_BLOG_PAGE)
      } finally {
        if (!ignore) setBlogPageLoading(false)
      }
    }
    loadBlogPage()
    return () => {
      ignore = true
    }
  }, [])

  const featured = blogPage.featuredPost
  const posts = blogPage.posts || []

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setCommentError('')
    setCommentOk('')
    if (!user?.email || !user?.uid) {
      setCommentError('You must be logged in to comment.')
      return
    }
    const text = commentText.trim()
    if (!text) {
      setCommentError('Please write a comment before sending.')
      return
    }
    setCommentSending(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog-comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          email: user.email,
          uid: user.uid,
          name: user.displayName || '',
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.error || 'Could not post comment')
      }
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev])
      } else {
        await loadComments()
      }
      setCommentText('')
      setCommentOk(data.message || 'Comment posted')
    } catch (err) {
      setCommentError(err.message || 'Something went wrong')
    } finally {
      setCommentSending(false)
    }
  }

  const cardKeyHandlers = (article) => ({
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open(article)
      }
    },
  })

  return (
    <div className="w-full text-white">
      {openArticle ? <ArticleModal article={openArticle} onClose={close} /> : null}

      <section className="relative isolate overflow-hidden">
        <div
          className="h-[240px] w-full bg-cover bg-center sm:h-[280px]"
          style={{ backgroundImage: `url(${blogPage.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/82 via-[#000b1e]/50 to-[#000b1e]/25" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{blogPage.pageEyebrow}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {blogPage.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{blogPage.pageIntro}</p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1.5 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <span className="text-white/95">Blog</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <ScrollReveal variant="fade-up" duration={0.5}>
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Latest articles</h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Deep dives and shorter notes from our studio. Click a card to read the full article.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00d2ff]/90">
              {posts.length + 1} stories
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-10" variant="fade-up" duration={0.55}>
          <article
            id={featured.slug}
            role="button"
            tabIndex={0}
            aria-label={`Open article: ${featured.title}`}
            className="group scroll-mt-28 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0a3146]/22 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] outline-none transition hover:border-[#00d2ff]/30 focus-visible:ring-2 focus-visible:ring-[#00d2ff]/50 sm:rounded-2xl sm:scroll-mt-32 lg:grid lg:grid-cols-12 lg:gap-0"
            onClick={() => open(featured)}
            onKeyDown={cardKeyHandlers(featured).onKeyDown}
          >
            <div className="relative block aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[320px]">
              <img
                src={featured.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-7 lg:col-span-5 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-2.5 py-0.5 text-[#00d2ff]">
                  {featured.category}
                </span>
                <span>{featured.date}</span>
                <span className="text-white/35">·</span>
                <span>{featured.readTime}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] transition group-hover:gap-3">
                Read article
                <ArrowRightIcon />
              </span>
            </div>
          </article>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {blogPageLoading ? (
            <p className="col-span-full rounded-xl border border-white/10 bg-white/[0.03] py-12 text-center text-sm text-white/55 sm:col-span-2 lg:col-span-3">
              Loading articles…
            </p>
          ) : null}
          {!blogPageLoading &&
            posts.map((post, index) => (
            <ScrollReveal key={post._id || post.slug} variant="fade-up" delay={index * 0.05} duration={0.5}>
              <article
                id={post.slug}
                role="button"
                tabIndex={0}
                aria-label={`Open article: ${post.title}`}
                className="group flex h-full scroll-mt-28 cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-[#000b1e]/35 outline-none transition hover:border-[#00d2ff]/30 hover:bg-[#0a3146]/28 focus-visible:ring-2 focus-visible:ring-[#00d2ff]/50 sm:scroll-mt-32"
                onClick={() => open(post)}
                onKeyDown={cardKeyHandlers(post).onKeyDown}
              >
                <div className="relative block aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/70 to-transparent opacity-80" />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-white/85">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-3 flex-1 text-lg font-bold leading-snug text-white sm:text-xl">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/65">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#00d2ff]">
                    Read more
                    <ArrowRightIcon />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 lg:mt-20" variant="fade-up" duration={0.55}>
          <div className="relative mx-auto max-w-2xl border-t border-white/[0.07] pt-14 lg:max-w-3xl lg:pt-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d2ff]/50 to-transparent"
              aria-hidden
            />

            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#00d2ff]">Community</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Join the conversation
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/60">
                লগইন করা অতিথিদের মন্তব্য এখানে দেখা যাবে। নিচে আপনার ভাবনা লিখুন। / Thoughts from logged-in readers
                appear below.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[linear-gradient(165deg,rgba(10,49,70,0.35)_0%,rgba(0,11,30,0.55)_45%,rgba(0,11,30,0.75)_100%)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
                {authLoading ? (
                  <p className="text-center text-sm text-white/50">Checking session…</p>
                ) : user ? (
                  <form className="space-y-4" onSubmit={handleCommentSubmit}>
                    <div className="flex gap-4">
                      <CommentAvatar
                        name={user.displayName || ''}
                        email={user.email || ''}
                      />
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50">
                          <span className="font-semibold text-white/90">
                            {user.displayName || user.email?.split('@')[0] || 'Member'}
                          </span>
                          <span className="text-white/25">·</span>
                          <span>Your comment will appear publicly below</span>
                        </div>
                        <textarea
                          value={commentText}
                          onChange={(ev) => {
                            setCommentText(ev.target.value)
                            setCommentError('')
                            setCommentOk('')
                          }}
                          rows={4}
                          maxLength={3000}
                          placeholder="Share your perspective, question, or takeaway…"
                          className="w-full resize-y rounded-2xl border border-white/[0.07] bg-[#000b1e]/50 px-4 py-3.5 text-[15px] leading-relaxed text-white placeholder:text-white/30 outline-none ring-0 transition focus:border-[#00d2ff]/35 focus:bg-[#000b1e]/70 focus:shadow-[0_0_0_3px_rgba(0,210,255,0.12)]"
                        />
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-[11px] tabular-nums text-white/35">{commentText.length} / 3000</span>
                          <button
                            type="submit"
                            disabled={commentSending}
                            className="inline-flex items-center justify-center rounded-full bg-[#00d2ff] px-7 py-2.5 text-sm font-bold text-[#000b1e] shadow-[0_8px_24px_-8px_rgba(0,210,255,0.55)] transition hover:bg-[#5ce8ff] disabled:cursor-not-allowed disabled:opacity-55"
                          >
                            {commentSending ? 'Publishing…' : 'Publish comment'}
                          </button>
                        </div>
                      </div>
                    </div>
                    {commentError ? (
                      <p className="rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-2.5 text-center text-sm text-red-200/95">
                        {commentError}
                      </p>
                    ) : null}
                    {commentOk ? (
                      <p className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-2.5 text-center text-sm text-emerald-100/95">
                        {commentOk}
                      </p>
                    ) : null}
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                    <div className="flex gap-4 sm:items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-dashed border-white/20 text-lg text-white/35">
                        ?
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90">কমেন্ট করতে লগইন করুন</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/50">
                          Sign in so we know who is speaking — comments stay respectful and spam-free.
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Link
                        to="/login"
                        className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/35 hover:text-[#00d2ff]"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="rounded-full bg-[#00d2ff] px-5 py-2 text-sm font-bold text-[#000b1e] transition hover:bg-[#5ce8ff]"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 pb-2 pt-2 sm:px-7">
                {commentsLoading ? (
                  <div className="space-y-4 py-8">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex animate-pulse gap-4">
                        <div className="h-11 w-11 shrink-0 rounded-2xl bg-white/[0.06]" />
                        <div className="flex-1 space-y-2 pt-1">
                          <div className="h-3 w-32 rounded-full bg-white/[0.06]" />
                          <div className="h-3 w-full max-w-md rounded-full bg-white/[0.05]" />
                          <div className="h-3 w-full max-w-sm rounded-full bg-white/[0.04]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments.length === 0 ? (
                  <p className="py-12 text-center text-sm leading-relaxed text-white/45">
                    এখনও কোনো মন্তব্য নেই। প্রথম হিসেবে আপনার ভাবনা যোগ করুন।
                    <br />
                    <span className="text-white/35">No messages yet — start the thread.</span>
                  </p>
                ) : (
                  <ul className="divide-y divide-white/[0.06]">
                    {comments.map((c) => (
                      <li key={c._id} className="flex gap-4 py-6 first:pt-5 sm:gap-5">
                        <CommentAvatar name={c.authorName} email={c.authorEmail} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-[15px] font-bold text-white">{c.authorName || 'Member'}</span>
                            <time
                              className="text-[11px] font-medium uppercase tracking-wider text-[#00d2ff]/70"
                              dateTime={c.createdAt}
                            >
                              {formatCommentDate(c.createdAt)}
                            </time>
                          </div>
                          <p className="mt-2.5 whitespace-pre-wrap text-[15px] leading-[1.7] text-white/78">
                            {c.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-14 lg:mt-16" variant="fade-up" duration={0.55}>
          <div className="relative overflow-hidden rounded-xl border border-[#00d2ff]/20 bg-[linear-gradient(135deg,rgba(0,210,255,0.12),rgba(91,124,255,0.08))] p-6 sm:rounded-2xl sm:p-8 lg:p-10">
            <div className="relative z-[1] max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Newsletter</p>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Want new posts in your inbox?</h3>
              <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
                We are setting up a lightweight mailing list. Until then, bookmark this page or reach out through
                our contact channels on the main site.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="rounded-xl border border-white/15 bg-[#000b1e]/40 px-4 py-3 text-sm text-white/60">
                  Coming soon
                </span>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/40 hover:text-[#00d2ff]"
                >
                  About SoftEdge
                </Link>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00d2ff]/15 blur-3xl sm:h-72 sm:w-72"
              aria-hidden
            />
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
