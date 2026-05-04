import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/pharmacy-management-software'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1584308666744-24d5c474e2ae?auto=format&fit=crop&w=2000&q=80',
  heroTitle: 'Pharmacy Management Software',
  stripLabel: 'Rx',
  heroBadge: 'Pharmacy suite',
  introKicker: 'Retail & wholesale — one counter, one ledger',
  introTitle: 'Stock, compliance, and checkout without spreadsheet chaos',
  introLead:
    'SoftEdge Pharmacy ties purchase, GRN, batch-wise stock, MRP rules, and POS billing into a single flow. Whether you run one counter or branches with central purchase, teams see the same truth on expiry, slow movers, and margin.',
  introSecondary:
    'Doctor-wise or patient-wise selling, schedule drug controls, and GST-ready invoices are configurable to how your pharmacy already operates — we help you migrate masters and opening stock with minimal downtime.',
  introAside:
    'Built for high-SKU counters — fast lookup, fewer wrong picks, clearer handover between shifts.',
  capabilitiesEyebrow: 'Deep dive',
  capabilitiesTitle: 'What the suite actually covers',
  honeycombTitle: 'Modules at a glance',
  honeycombLead:
    'Pick what you need first — POS and stock for day one, then wholesale slabs, reminders, and owner analytics as you grow.',
  faqsTitle: 'Questions teams ask first',
  primaryCtaLabel: 'Talk to us',
  secondaryCtaLabel: 'How we work',
  highlights: [
    { label: 'Batch & expiry', detail: 'FEFO picks, near-expiry alerts, and recall notes per batch.' },
    { label: 'Purchase to POS', detail: 'Indent, PO, GRN, sales, returns — linked stock ledger.' },
    { label: 'Compliance ready', detail: 'Schedule templates, audit log, and role-based counters.' },
    { label: 'Insight', detail: 'ABC analysis, margin by category, and dead-stock nudges.' },
  ],
  capabilities: [
    {
      n: '01',
      title: 'Master data that pharmacists trust',
      text: 'Salt / brand mapping, generics, strengths, forms, and rack-bin locations. Barcode and SKU rules for fast search at billing.',
    },
    {
      n: '02',
      title: 'Billing tuned for counters',
      text: 'Split MRP & discount lines, schemes, loyalty, and thermal or A4 invoices. Hold bills, home delivery tags, and credit limits for trusted accounts.',
    },
    {
      n: '03',
      title: 'Inventory that matches real shelves',
      text: 'Multi-location stock, inter-branch transfers, physical stock reconciliation worksheets, and auto-suggestions for reorder based on sales velocity.',
    },
    {
      n: '04',
      title: 'Finance & dues in one view',
      text: 'Supplier outstanding, GRN-linked payments, cash-up summaries, and bank deposit tags — export friendly for your accountant.',
    },
  ],
  honeycomb: [
    { id: 'pos', title: 'POS', sub: 'Touch-friendly billing' },
    { id: 'rx', title: 'e-Rx', sub: 'Upload & attach' },
    { id: 'gst', title: 'GST', sub: 'HSN & e-invoice' },
    { id: 'wh', title: 'Wholesale', sub: 'Rate slabs' },
    { id: 'mob', title: 'Mobile', sub: 'Owner dashboards' },
    { id: 'sms', title: 'SMS', sub: 'Pickup reminders' },
  ],
  faqs: [
    {
      question: 'Can we keep selling while data is imported?',
      answer:
        'Yes. We usually parallel-run critical SKUs first, then widen coverage while counters stay on your legacy till cut-over weekend.',
    },
    {
      question: 'Do you support chain stores?',
      answer:
        'Multi-branch with central purchase and local sales is supported; visibility rules decide who sees group-wide stock.',
    },
    {
      question: 'What hardware works at the counter?',
      answer:
        'Common thermal printers, barcode scanners, cash drawers, and weighing scales are integrated where scope includes retail packaging.',
    },
  ],
  serviceLinks: [
    { label: 'Pharmacy Management Software', to: PAGE_PATH },
    { label: 'Hospital Management Software', to: '/hospital-management-software' },
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Our Services', to: '/services' },
    { label: 'Process Automation', to: '/process-automation' },
  ],
}

function mergePharmacyPageFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackPageData
  return {
    ...fallbackPageData,
    ...data,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
    highlights: data.highlights?.length ? data.highlights : fallbackPageData.highlights,
    capabilities: data.capabilities?.length ? data.capabilities : fallbackPageData.capabilities,
    honeycomb: data.honeycomb?.length ? data.honeycomb : fallbackPageData.honeycomb,
    faqs: data.faqs?.length ? data.faqs : fallbackPageData.faqs,
  }
}

function IconCapsule({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3v18M8 8c0-2 1.5-4 4-4s4 2 4 4v8c0 2-1.5 4-4 4s-4-2-4-4V8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PharmacyManagementSoftwarePage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/pharmacy-management-software-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData(mergePharmacyPageFromApi(data))
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
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/82 via-[#000b1e]/50 to-[#000b1e]/20" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#00d2ff]/35 bg-[#000b1e]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              <IconCapsule className="h-4 w-4" />
              {pageData.heroBadge}
            </p>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <span className="text-white/90">Pharmacy Management Software</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="relative border-t border-[#00d2ff]/15 bg-[#000b1e]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #00d2ff 0%, transparent 45%),
              radial-gradient(circle at 80% 60%, #00d2ff 0%, transparent 40%)`,
          }}
          aria-hidden
        />

        <div className="relative z-[1] mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
            {pageData.serviceLinks.map((item) => {
              const active = item.to === PAGE_PATH
              return (
                <Link
                  key={`${item.label}-${item.to}-${item._id || ''}`}
                  to={item.to}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                    active
                      ? 'border-[#00d2ff] bg-[#00d2ff] text-[#000b1e]'
                      : 'border-white/12 bg-[#0a3146]/55 text-white/85 hover:border-[#00d2ff]/40 hover:text-[#00d2ff]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </ScrollReveal>

          <ScrollReveal variant="fade-up">
            <div className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a3146]/90 via-[#000b1e]/95 to-[#091a28] p-8 sm:p-10 lg:p-12 [clip-path:polygon(0_0,100%_0,100%_calc(100%-2rem),calc(100%-3rem)_100%,0_100%)]">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00d2ff]/10 blur-3xl" aria-hidden />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,280px)] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#00d2ff]">{pageData.introKicker}</p>
                  <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {pageData.introTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/82">{pageData.introLead}</p>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-white/72">{pageData.introSecondary}</p>
                </div>
                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <span className="rounded-2xl border border-[#00d2ff]/40 bg-[#000b1e]/70 px-5 py-3 text-3xl font-black tracking-[0.12em] text-[#00d2ff] sm:text-4xl">
                    {pageData.stripLabel}
                  </span>
                  <p className="max-w-xs text-right text-xs leading-relaxed text-white/55 lg:text-right">
                    {pageData.introAside}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pageData.highlights.map((h, i) => (
                <li
                  key={h._id || h.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5 transition hover:border-[#00d2ff]/35"
                >
                  <span className="text-[10px] font-black text-[#00d2ff]/80">0{i + 1}</span>
                  <p className="mt-2 text-lg font-bold text-white">{h.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{h.detail}</p>
                  <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-[#00d2ff]/10 opacity-0 transition group-hover:opacity-100" aria-hidden />
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08} className="mt-16">
            <div className="mb-10 flex flex-col gap-2 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.capabilitiesEyebrow}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{pageData.capabilitiesTitle}</h3>
              </div>
              <IconCapsule className="h-10 w-10 shrink-0 text-[#00d2ff]/75 sm:mb-1" />
            </div>
            <ul className="space-y-10">
              {pageData.capabilities.map((row) => (
                <li
                  key={row._id || row.n}
                  className="grid gap-6 border-b border-white/5 pb-10 last:border-0 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-10"
                >
                  <span className="font-mono text-4xl font-black leading-none text-[#00d2ff]/90 sm:text-5xl">{row.n}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white sm:text-2xl">{row.title}</h4>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">{row.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1} className="mt-20">
            <h3 className="text-center text-2xl font-bold text-white sm:text-3xl">{pageData.honeycombTitle}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/68">{pageData.honeycombLead}</p>
            <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-4 sm:gap-5">
              {pageData.honeycomb.map((cell) => (
                <li
                  key={cell._id || cell.id}
                  className="flex h-[118px] w-[118px] flex-col items-center justify-center rounded-3xl border border-[#00d2ff]/25 bg-[#0a3146]/40 text-center shadow-[0_0_0_1px_rgba(0,210,255,0.06)_inset] transition hover:-translate-y-0.5 hover:border-[#00d2ff]/45 hover:bg-[#0a3146]/65 sm:h-[128px] sm:w-[128px]"
                >
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#00d2ff]">{cell.id}</span>
                  <span className="mt-1 text-sm font-bold text-white">{cell.title}</span>
                  <span className="mt-0.5 px-2 text-[10px] leading-tight text-white/55">{cell.sub}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.12} className="mt-20">
            <h3 className="text-2xl font-bold text-white">{pageData.faqsTitle}</h3>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {pageData.faqs.map((card) => {
                const q = card.question ?? card.q
                const a = card.answer ?? card.a
                return (
                  <li
                    key={card._id || q}
                    className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a3146]/50 to-[#000b1e]/80 p-6"
                  >
                    <p className="text-base font-bold text-[#00d2ff]">{q}</p>
                    <p className="mt-3 flex-1 text-sm leading-7 text-white/75">{a}</p>
                  </li>
                )
              })}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/services"
              className="w-full rounded-full bg-[#00d2ff] px-8 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff] sm:w-auto"
            >
              {pageData.primaryCtaLabel}
            </Link>
            <Link
              to="/how-we-work"
              className="w-full rounded-full border border-white/25 px-8 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#00d2ff]/45 hover:text-[#00d2ff] sm:w-auto"
            >
              {pageData.secondaryCtaLabel}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
