import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80',
  sidebarEyebrow: 'Support Center',
  sidebarTitle: 'Frequently Asked Questions',
  sidebarDescription:
    'Find quick answers to common questions about our services, timelines, and support process.',
  contactCardTitle: 'Need more help?',
  contactCardBody: 'Email us at support@softedge.com or call (+44) 123 456 789.',
  faqItems: [
    {
      _id: 'default-faq-1',
      question: 'How long does it take to deliver a website project?',
      answer:
        'Typical business websites take 2-6 weeks depending on complexity, content readiness, and revision rounds.',
    },
    {
      _id: 'default-faq-2',
      question: 'Do you provide support after project delivery?',
      answer: 'Yes. We provide post-launch maintenance, bug fixes, and optional monthly support plans.',
    },
    {
      _id: 'default-faq-3',
      question: 'Can I request custom features for my business workflow?',
      answer:
        'Absolutely. We build custom modules and integrations tailored to your team and business operations.',
    },
    {
      _id: 'default-faq-4',
      question: 'Will my website be mobile friendly and SEO optimized?',
      answer:
        'Yes, all pages are built responsive-first with clean structure and on-page SEO best practices.',
    },
    {
      _id: 'default-faq-5',
      question: 'Do you redesign existing websites?',
      answer:
        'Yes, we can modernize your existing site, improve performance, and align it with your current brand.',
    },
  ],
}

function normalizeFaqItem(item, index) {
  return {
    _id: item._id || `faq-${index}`,
    question: (item.question ?? item.q ?? '').trim(),
    answer: (item.answer ?? item.a ?? '').trim(),
  }
}

function mergeFaqPageData(data) {
  const d = DEFAULT_PAGE_DATA
  const rawItems = Array.isArray(data.faqItems) ? data.faqItems : []
  const faqItems = rawItems.length
    ? rawItems.map((item, i) => normalizeFaqItem(item, i)).filter((it) => it.question || it.answer)
    : d.faqItems

  return {
    heroImage: (data.heroImage ?? '').trim() || d.heroImage,
    sidebarEyebrow: (data.sidebarEyebrow ?? '').trim() || d.sidebarEyebrow,
    sidebarTitle: (data.sidebarTitle ?? '').trim() || d.sidebarTitle,
    sidebarDescription: data.sidebarDescription != null ? String(data.sidebarDescription) : d.sidebarDescription,
    contactCardTitle: (data.contactCardTitle ?? '').trim() || d.contactCardTitle,
    contactCardBody: data.contactCardBody != null ? String(data.contactCardBody) : d.contactCardBody,
    faqItems,
  }
}

export default function FAQpage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)
  const [fetchState, setFetchState] = useState('loading')

  const faqItems = pageData.faqItems || []

  useEffect(() => {
    let ignore = false

    const load = async () => {
      setFetchState('loading')
      try {
        const response = await fetch(`${API_BASE_URL}/api/faq-page`)
        if (!response.ok) throw new Error('Failed to fetch FAQ page')
        const data = await response.json()
        if (!ignore) {
          setPageData(mergeFaqPageData(data))
          setFetchState('ok')
        }
      } catch {
        if (!ignore) {
          setPageData(DEFAULT_PAGE_DATA)
          setFetchState('error')
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/45 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">FAQ</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/faq" className="transition-colors hover:text-[#00d2ff]">
                FAQ
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-14">
        <ScrollReveal className="lg:col-span-4" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.sidebarEyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-white">{pageData.sidebarTitle}</h2>
          <p className="mt-4 text-base leading-8 text-white/75">{pageData.sidebarDescription}</p>

          <div className="mt-7 rounded-xl border border-white/10 bg-[#000b1e]/40 p-5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.18em] text-[#00d2ff]">{pageData.contactCardTitle}</p>
            <p className="mt-2 text-white/80">{pageData.contactCardBody}</p>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-8">
          {fetchState === 'loading' ? (
            <p className="rounded-xl border border-white/10 bg-[#0a3146]/25 px-4 py-6 text-center text-sm text-white/70">
              Loading…
            </p>
          ) : (
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <ScrollReveal
                  key={item._id || `${item.question}-${i}`}
                  variant="fade-up"
                  delay={i * 0.06}
                  className="collapse collapse-plus rounded-xl border border-white/10 bg-[#0a3146]/35"
                >
                  <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                  <div className="collapse-title text-lg font-semibold text-white">{item.question}</div>
                  <div className="collapse-content text-base leading-7 text-white/75">{item.answer}</div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
