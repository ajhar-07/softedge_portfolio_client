import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const PAGE_PATH = '/ecommerce-news-portal'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2200&q=80',
  badge: 'Commerce + Content Ecosystem',
  title: 'E-commerce & News Portal',
  subtitle:
    'Launch a high-speed online store and modern news portal under one scalable platform with strong catalog search, editorial workflows, and built-in monetization tools.',
  quickLinks: [
    { label: 'E-commerce & news portal', to: PAGE_PATH },
    { label: 'Website Design & Development', to: '/website-development' },
    { label: 'Landing Page Design', to: '/landing-page-design' },
    { label: 'Content Management', to: '/content-management' },
  ],
  commerceModules: [
    {
      title: 'Catalog & Inventory Core',
      detail:
        'Unlimited categories, smart product variants, warehouse stock sync, barcode-ready item setup, and low-stock alerts for faster operations.',
    },
    {
      title: 'Checkout & Payment Layer',
      detail:
        'Guest checkout, coupon system, cart recovery prompts, regional shipping rules, and payment gateway support for card, wallet, and COD.',
    },
    {
      title: 'Order & Customer Desk',
      detail:
        'Real-time order pipeline, invoice automation, return/refund controls, customer notes, and timeline tracking for support teams.',
    },
    {
      title: 'Marketing Engine',
      detail:
        'Flash sales, bundle pricing, personalized recommendations, loyalty points, abandoned-cart automation, and campaign landing blocks.',
    },
  ],
  newsroomFlow: [
    {
      phase: '01',
      heading: 'Editorial Planning',
      text: 'Beat-wise planning board, assignment approvals, and deadline calendar for editors and reporters.',
    },
    {
      phase: '02',
      heading: 'Publishing Pipeline',
      text: 'Draft-review-publish workflow with role permissions, SEO checklist, and scheduled release controls.',
    },
    {
      phase: '03',
      heading: 'Distribution & Alerts',
      text: 'Auto sharing to social channels, breaking news push notifications, and newsletter-ready snippets.',
    },
    {
      phase: '04',
      heading: 'Performance Intelligence',
      text: 'Story heatmaps, engagement score, session depth analytics, and ad placement insights.',
    },
  ],
  monetizationCards: [
    {
      name: 'Ad Revenue Suite',
      points: ['Banner slot manager', 'Sponsored story labels', 'Ad position A/B tests'],
    },
    {
      name: 'Membership & Paywall',
      points: ['Freemium article rules', 'Subscriber-only reports', 'Recurring plan billing'],
    },
    {
      name: 'Commerce-to-Content Cross Sell',
      points: ['Article to product widgets', 'Shop the story blocks', 'Trending product embeds'],
    },
  ],
  architectureHighlights: [
    { value: '99.95%', label: 'Target uptime readiness' },
    { value: '<2.2s', label: 'Mobile first-content load target' },
    { value: '3x', label: 'Higher repeat visits with personalization' },
    { value: '24/7', label: 'Operational monitoring support' },
  ],
  audienceSolutions: [
    {
      audience: 'Retail Brands',
      outcome: 'Faster product launches, cleaner checkout funnels, and repeat-purchase growth through loyalty automation.',
    },
    {
      audience: 'Media Houses',
      outcome: 'Structured newsroom workflow, high-frequency publishing, and stronger ad inventory performance.',
    },
    {
      audience: 'Hybrid Business Models',
      outcome: 'Content-driven product discovery where articles, reviews, and stories directly influence conversion.',
    },
  ],
  integrationSuite: [
    'Payment gateway and wallet integrations',
    'Courier and shipment status sync',
    'CRM and customer support tools',
    'Meta pixel and GA4 event tracking',
    'Email and push notification automation',
    'CDN, cache, and security layer setup',
  ],
  packageGrid: [
    {
      tier: 'Launch',
      timeline: '2-3 weeks',
      includes: ['Storefront + blog/news core', 'Basic CMS and media library', 'Analytics starter setup'],
      price: 'From $350',
    },
    {
      tier: 'Growth',
      timeline: '4-6 weeks',
      includes: ['Advanced editorial workflow', 'Marketplace-ready commerce modules', 'SEO and ad-ops toolkit'],
      price: 'From $900',
    },
    {
      tier: 'Scale Enterprise',
      timeline: 'Custom roadmap',
      includes: ['Multi-brand architecture', 'High traffic optimization', 'Data integrations + automation'],
      price: 'Custom quote',
    },
  ],
  faqs: [
    {
      q: 'Can I run the store and news portal with one admin panel?',
      a: 'Yes. You can manage products, orders, newsroom content, ads, users, and analytics from one unified dashboard.',
    },
    {
      q: 'Do you support Bengali and English content publishing?',
      a: 'Yes. The portal supports multilingual articles, category structures, and localized SEO metadata.',
    },
    {
      q: 'Will this support heavy traffic during campaigns or breaking news?',
      a: 'Yes. We design the stack for caching, CDN delivery, and scalable infrastructure to handle traffic spikes.',
    },
  ],
}

export default function EcommerceNewsPortalPage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const normalizeIntegrationSuite = (value) => {
      if (!Array.isArray(value) || !value.length) return fallbackPageData.integrationSuite
      return value
        .map((item) => {
          if (typeof item === 'string') return item.trim()
          if (item && typeof item === 'object' && typeof item.text === 'string') return item.text.trim()
          return ''
        })
        .filter(Boolean)
    }

    const mergePageData = (apiData = {}) => ({
      ...fallbackPageData,
      ...apiData,
      quickLinks: Array.isArray(apiData.quickLinks) && apiData.quickLinks.length ? apiData.quickLinks : fallbackPageData.quickLinks,
      commerceModules: Array.isArray(apiData.commerceModules) && apiData.commerceModules.length ? apiData.commerceModules : fallbackPageData.commerceModules,
      newsroomFlow: Array.isArray(apiData.newsroomFlow) && apiData.newsroomFlow.length ? apiData.newsroomFlow : fallbackPageData.newsroomFlow,
      monetizationCards: Array.isArray(apiData.monetizationCards) && apiData.monetizationCards.length ? apiData.monetizationCards : fallbackPageData.monetizationCards,
      architectureHighlights: Array.isArray(apiData.architectureHighlights) && apiData.architectureHighlights.length ? apiData.architectureHighlights : fallbackPageData.architectureHighlights,
      audienceSolutions: Array.isArray(apiData.audienceSolutions) && apiData.audienceSolutions.length ? apiData.audienceSolutions : fallbackPageData.audienceSolutions,
      integrationSuite: normalizeIntegrationSuite(apiData.integrationSuite),
      packageGrid: Array.isArray(apiData.packageGrid) && apiData.packageGrid.length ? apiData.packageGrid : fallbackPageData.packageGrid,
      faqs: Array.isArray(apiData.faqs) && apiData.faqs.length ? apiData.faqs : fallbackPageData.faqs,
    })

    const fetchPage = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/ecommerce-news-portal-page`)
        if (!response.ok) throw new Error('Failed to fetch ecommerce news portal content')
        const data = await response.json()
        if (isMounted) setPageData(mergePageData(data))
      } catch (requestError) {
        if (isMounted) {
          setPageData(fallbackPageData)
          setError(requestError?.message || 'Using fallback content')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPage()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="w-full text-white">
      {loading ? (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75">Loading latest content...</p>
        </div>
      ) : null}
      {error ? (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{error}</p>
        </div>
      ) : null}

      <section className="relative isolate overflow-hidden">
        <div className="h-[300px] w-full bg-cover bg-center sm:h-[390px]" style={{ backgroundImage: `url(${pageData.heroImage})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,210,255,0.26)_0%,transparent_38%),radial-gradient(circle_at_80%_72%,rgba(74,144,226,0.16)_0%,transparent_44%),linear-gradient(120deg,rgba(0,11,30,0.92)_20%,rgba(6,29,46,0.74)_56%,rgba(0,11,30,0.5)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal variant="slide-right" duration={0.5}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-[#0a3146]/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.badge}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{pageData.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/86 sm:text-base">{pageData.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {pageData.quickLinks.map((item) => (
            <Link
              key={item._id || `${item.label}-${item.to}`}
              to={item.to}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                item.to === PAGE_PATH
                  ? 'border-[#00d2ff] bg-[#00d2ff] text-[#000b1e]'
                  : 'border-white/15 bg-[#0a3146]/30 text-white/85 hover:border-[#00d2ff]/45 hover:text-[#00d2ff]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" className="grid gap-4 md:grid-cols-2">
          {pageData.commerceModules.map((item) => (
            <article key={item._id || item.title} className="rounded-[1.4rem] border border-[#00d2ff]/25 bg-[linear-gradient(160deg,rgba(10,52,76,0.48),rgba(6,24,40,0.62))] p-6">
              <h2 className="text-xl font-black text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
            </article>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.06} className="mt-14">
          <h2 className="text-2xl font-black text-white">Newsroom Operational Flow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pageData.newsroomFlow.map((flow) => (
              <article key={flow._id || flow.phase} className="rounded-2xl border border-[#00d2ff]/18 bg-[#0f3f5b]/28 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">Phase {flow.phase}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{flow.heading}</h3>
                <p className="mt-2 text-sm leading-7 text-white/74">{flow.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-[#00d2ff]/18 bg-[linear-gradient(170deg,rgba(11,50,74,0.38),rgba(8,35,54,0.5))] p-6 sm:p-7">
            <h2 className="text-2xl font-black text-white">Monetization Stack</h2>
            <div className="mt-5 space-y-4">
              {pageData.monetizationCards.map((card) => (
                <article key={card._id || card.name} className="rounded-2xl border border-[#00d2ff]/20 bg-[#11415c]/24 p-5">
                  <h3 className="text-base font-bold text-[#00d2ff]">{card.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {(Array.isArray(card.points) ? card.points : []).map((point) => (
                      <li key={`${card._id || card.name}-${point}`} className="flex gap-2 text-sm text-white/80">
                        <span className="text-[#00d2ff]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08} className="space-y-4">
            {pageData.architectureHighlights.map((stat) => (
              <div key={stat._id || stat.label} className="rounded-2xl border border-[#00d2ff]/22 bg-[linear-gradient(180deg,rgba(12,56,78,0.42),rgba(8,30,48,0.58))] p-6">
                <p className="text-4xl font-black text-[#00d2ff]">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(13,58,82,0.34),rgba(9,33,51,0.54))] p-6 sm:p-7">
            <h2 className="text-2xl font-black text-white">Who Benefits Most</h2>
            <div className="mt-5 space-y-4">
              {pageData.audienceSolutions.map((item) => (
                <article key={item._id || item.audience} className="rounded-2xl border border-white/15 bg-white/[0.05] p-5">
                  <h3 className="text-base font-bold text-[#00d2ff]">{item.audience}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/78">{item.outcome}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08} className="rounded-[2rem] border border-white/15 bg-[#123f59]/26 p-6 sm:p-7">
            <h2 className="text-2xl font-black text-white">Integration & Automation Suite</h2>
            <ul className="mt-5 grid gap-3">
              {pageData.integrationSuite.map((item) => (
                <li key={item} className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
                  <span className="mr-2 text-[#00d2ff]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-14">
          <h2 className="text-2xl font-black text-white">Deployment Packages</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.packageGrid.map((pkg) => (
              <article key={pkg._id || pkg.tier} className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(14,58,80,0.4),rgba(8,28,44,0.58))] p-5">
                <p className="text-lg font-black text-white">{pkg.tier}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#00d2ff]">{pkg.timeline}</p>
                <ul className="mt-4 space-y-2">
                  {(Array.isArray(pkg.includes) ? pkg.includes : []).map((feature) => (
                    <li key={`${pkg._id || pkg.tier}-${feature}`} className="flex gap-2 text-sm text-white/80">
                      <span className="text-[#00d2ff]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base font-black text-[#00d2ff]">{pkg.price}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-14">
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.faqs.map((item) => (
              <article key={item._id || item.q} className="rounded-2xl border border-[#00d2ff]/16 bg-[#134867]/24 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.q}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{item.a}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
