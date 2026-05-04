import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/restaurant-management-software'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=80',
  heroTitle: 'Restaurant Management Software',
  heroLead:
    'Table service, kitchen coordination, inventory, and billing in one live command center for fast-growing restaurants.',
  heroBadge: 'Dine in. Takeaway. Delivery.',
  topPills: [
    { label: 'Cloud POS', value: 'Real-time sync' },
    { label: 'Kitchen Display', value: 'Ticket prioritization' },
    { label: 'Inventory', value: 'Recipe-level control' },
    { label: 'Reports', value: 'Hour-by-hour sales' },
  ],
  coreTitle: 'One platform across front-of-house and back-of-house',
  coreBody:
    'SoftEdge Restaurant Suite connects waiters, kitchen, cashier, and owner dashboards. Orders route instantly, modifiers stay attached, and every sale updates stock usage and cash counters in real time.',
  modules: [
    {
      code: '01',
      title: 'Smart POS & billing',
      text: 'Fast menu search, split bills, discounts, tax rules, and payment mix (cash, card, mobile wallets).',
    },
    {
      code: '02',
      title: 'Table & reservation flow',
      text: 'Visual floor map, booking slots, waitlist handling, and quick table merge or transfer.',
    },
    {
      code: '03',
      title: 'Kitchen display system',
      text: 'Category-wise KOT routing, prep timers, rush alerts, and delayed-item escalation.',
    },
    {
      code: '04',
      title: 'Recipe inventory',
      text: 'Ingredient-level consumption, wastage tracking, low-stock triggers, and purchase planning.',
    },
  ],
  spotlight: [
    {
      title: 'Table Experience That Feels Premium',
      body: 'From QR menu to order confirmation, guests get a smooth dine-in journey while staff track requests in real time without missed items.',
      tag: 'Front of House',
      image:
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Kitchen Operations Without Bottlenecks',
      body: 'Live kitchen queues, prep timers, and section-based routing keep chefs focused while managers monitor delays and throughput instantly.',
      tag: 'Back of House',
      image:
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  timeline: [
    { title: 'Order taken', text: 'Dine-in, parcel, and delivery orders captured from one screen.' },
    { title: 'Kitchen sync', text: 'KOT auto-routes to kitchen sections with modifiers and notes.' },
    { title: 'Service complete', text: 'Status updates return to waiter/cashier with no manual calls.' },
    { title: 'Bill closed', text: 'Payment, tips, and taxes posted with stock and sales reports updated.' },
  ],
  stats: [
    { label: 'Order channels', value: '3 in 1' },
    { label: 'Menu updates', value: 'Live' },
    { label: 'Owner visibility', value: '24/7' },
  ],
  faqs: [
    {
      q: 'Can we use this for multiple branches?',
      a: 'Yes. Branch-wise menus, pricing, user access, and consolidated reporting are supported from one admin panel.',
    },
    {
      q: 'Does it support food delivery workflows?',
      a: 'Yes. Dedicated delivery order flow, rider assignment tags, and channel-wise sales tracking are included.',
    },
    {
      q: 'Can we start small and scale later?',
      a: 'Absolutely. Most teams start with POS + kitchen + inventory, then add loyalty, CRM, and branch controls.',
    },
  ],
  serviceLinks: [
    { label: 'Restaurant Management Software', to: PAGE_PATH },
    { label: 'Hospital Management Software', to: '/hospital-management-software' },
    { label: 'Pharmacy Management Software', to: '/pharmacy-management-software' },
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Our Services', to: '/services' },
  ],
}

function mergeRestaurantPageFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackPageData
  return {
    ...fallbackPageData,
    ...data,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
    topPills: data.topPills?.length ? data.topPills : fallbackPageData.topPills,
    modules: data.modules?.length ? data.modules : fallbackPageData.modules,
    spotlight: data.spotlight?.length ? data.spotlight : fallbackPageData.spotlight,
    timeline: data.timeline?.length ? data.timeline : fallbackPageData.timeline,
    stats: data.stats?.length ? data.stats : fallbackPageData.stats,
    faqs: data.faqs?.length ? data.faqs : fallbackPageData.faqs,
  }
}

export default function RestaurantManagementSoftwarePage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/restaurant-management-software-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData(mergeRestaurantPageFromApi(data))
          setFetchError('')
        } else {
          setPageData(fallbackPageData)
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_err) {
        setPageData(fallbackPageData)
        setFetchError('Could not reach server — showing built-in defaults')
      } finally {
        setPageLoading(false)
      }
    }

    loadPage()
  }, [])

  return (
    <div className="w-full text-white">
      {pageLoading || fetchError ? (
        <div
          className={`border-b px-4 py-2.5 text-center text-sm ${
            fetchError && !pageLoading
              ? 'border-amber-400/25 bg-amber-500/10 text-amber-100'
              : 'border-[#00d2ff]/20 bg-[#0a3146]/95 text-white/88'
          }`}
        >
          {pageLoading ? 'Loading latest content from server…' : fetchError}
        </div>
      ) : null}
      <section className="relative isolate overflow-hidden">
        <div className="h-[260px] w-full bg-cover bg-center sm:h-[320px]" style={{ backgroundImage: `url(${pageData.heroImage})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,11,30,0.88)_12%,rgba(0,11,30,0.58)_55%,rgba(0,0,0,0.36)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{pageData.heroLead}</p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <span className="text-white/90">Restaurant Management Software</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-9 flex flex-wrap gap-2">
          {pageData.serviceLinks.map((item) => {
            const active = item.to === PAGE_PATH
            return (
              <Link
                key={`${item.label}-${item.to}-${item._id || ''}`}
                to={item.to}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                  active
                    ? 'border-[#00d2ff] bg-[#00d2ff] text-[#000b1e]'
                    : 'border-white/15 bg-[#000b1e]/50 text-white/85 hover:border-[#00d2ff]/45 hover:text-[#00d2ff]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(0,11,30,0.75),rgba(10,49,70,0.55))] p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{pageData.coreTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/80 sm:text-base">{pageData.coreBody}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {pageData.topPills.map((pill) => (
                <li key={pill._id || pill.label} className="rounded-xl border border-white/12 bg-black/20 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00d2ff]/90">{pill.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{pill.value}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pageData.stats.map((item) => (
              <div
                key={item._id || item.label}
                className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.9),rgba(6,18,34,0.95))] p-5"
              >
                <p className="text-3xl font-black text-[#00d2ff]">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/65">{item.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <ul className="grid gap-4 md:grid-cols-2">
            {pageData.modules.map((module) => (
              <li
                key={module._id || module.code}
                className="group rounded-2xl border border-white/10 bg-[#0a3146]/30 p-6 transition hover:-translate-y-0.5 hover:border-[#00d2ff]/40 hover:bg-[#0a3146]/55"
              >
                <p className="font-mono text-sm font-black tracking-wider text-[#00d2ff]">{module.code}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{module.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/76">{module.text}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:gap-8">
          {pageData.spotlight.map((block, i) => (
            <ScrollReveal
              key={block._id || block.title}
              variant="fade-up"
              delay={0.04 * (i + 1)}
              className={`grid gap-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a3146]/25 sm:grid-cols-2 sm:gap-0 ${
                i % 2 === 1 ? 'sm:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="relative min-h-[220px] sm:min-h-[280px]">
                <img src={block.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/70 to-transparent sm:bg-gradient-to-r" />
                <span className="absolute left-4 top-4 rounded-lg bg-[#00d2ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#000b1e]">
                  {block.tag}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-[#00d2ff]">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">{block.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-16">
          <h3 className="text-2xl font-bold text-white">Operational Workflow</h3>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageData.timeline.map((step, index) => (
              <li
                key={step._id || step.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">Step {index + 1}</p>
                <p className="mt-2 text-lg font-bold text-white">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-16">
          <h3 className="text-2xl font-bold text-white">FAQ</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.faqs.map((item) => (
              <li key={item._id || item.q || item.question} className="rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.q ?? item.question}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{item.a ?? item.answer}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" className="mt-14 flex flex-wrap gap-3">
          <Link
            to="/services"
            className="rounded-full bg-[#00d2ff] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
          >
            Talk to us
          </Link>
          <Link
            to="/how-we-work"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff]"
          >
            How we work
          </Link>
        </ScrollReveal>
      </div>
    </div>
  )
}
