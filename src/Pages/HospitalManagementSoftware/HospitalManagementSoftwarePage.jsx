import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/hospital-management-software'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80',
  heroTitle: 'Hospital Management Software',
  stripLabel: 'HMS',
  stripImage:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
  stripCaption:
    'Diagnostic-ready workflows: queue management, structured orders, and traceable results — designed for busy hospitals and standalone labs alike.',
  sectionTitle: 'Clinical workflows, billing, and diagnostics — unified',
  sectionLead:
    'From front-desk registration to discharge summaries, SoftEdge HMS keeps patient journeys traceable. OPD queues, bed management, lab orders, radiology, pharmacy dispensing, and insurance claims share one patient record — fewer handoffs, fewer errors.',
  sectionSecondary:
    'Role-based screens for doctors, nurses, billing, and admin mean each team sees what matters. Built-in audit trails, configurable forms, and export-ready reports help you stay inspection-ready while focusing on care.',
  modulesEyebrow: 'Coverage',
  modulesTitle: 'Modules that mirror your hospital',
  timelineTitle: 'Why teams choose this stack',
  faqsTitle: 'Common questions',
  asideTitle: 'Explore services',
  asideBody:
    'Need security hardening, integrations, or a phased rollout plan? We map modules to your budget and go-live window.',
  asideCtaLabel: 'View all services',
  primaryCtaLabel: 'Talk to us',
  secondaryCtaLabel: 'How we work',
  stats: [
    { label: 'Core modules', value: '12+' },
    { label: 'Deployment models', value: 'Cloud / on-prem' },
    { label: 'Support window', value: 'SLA-based' },
  ],
  modules: [
    {
      id: 'opd',
      title: 'OPD & appointments',
      blurb: 'Token queues, doctor schedules, visit history, and e-prescriptions in one flow.',
      accent: 'from-[#00d2ff]/25 to-transparent',
    },
    {
      id: 'ipd',
      title: 'IPD & bed management',
      blurb: 'Admission, transfers, nursing notes, diet orders, and discharge planning.',
      accent: 'from-emerald-400/20 to-transparent',
    },
    {
      id: 'lab',
      title: 'Diagnostics & imaging',
      blurb: 'Lab requisitions, sample tracking, result entry, and radiology worklists.',
      accent: 'from-cyan-400/20 to-transparent',
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy & inventory',
      blurb: 'Indent, batch-wise stock, expiry alerts, and POS for walk-in sales.',
      accent: 'from-sky-400/20 to-transparent',
    },
    {
      id: 'billing',
      title: 'Billing & packages',
      blurb: 'Tariff sheets, packages, insurance, deposits, and payment reconciliation.',
      accent: 'from-teal-400/20 to-transparent',
    },
    {
      id: 'hr',
      title: 'HR & duty roster',
      blurb: 'Staff master, shifts, leave, and credentialing linked to clinical access.',
      accent: 'from-[#38ddff]/20 to-transparent',
    },
  ],
  timeline: [
    {
      title: 'Single patient identifier',
      text: 'MRN-driven master data across departments — no duplicate profiles across OPD and IPD.',
    },
    {
      title: 'Configurable clinical forms',
      text: 'Vitals, SOAP notes, consent templates, and specialty-specific checklists you can evolve without code freezes.',
    },
    {
      title: 'Financial control',
      text: 'Real-time billable services, credit limits, and package utilization with manager overrides where policy allows.',
    },
    {
      title: 'Reporting & compliance',
      text: 'Daily cash, department revenue, occupancy, and stock valuation — scheduled exports to finance teams.',
    },
  ],
  spotlight: [
    {
      title: 'Patient experience',
      description:
        'Kiosk-friendly registration, SMS reminders for appointments, and clear billing summaries at discharge — reduce confusion at the counter.',
      image:
        'https://images.unsplash.com/photo-1586773860418-d372322d8195?auto=format&fit=crop&w=900&q=80',
      tag: 'Front office',
    },
    {
      title: 'Clinical safety',
      description:
        'Allergy flags, interaction checks at pharmacy, and structured handover notes help teams coordinate during busy shifts.',
      image:
        'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      tag: 'Quality',
    },
  ],
  faqs: [
    {
      question: 'Can we start with OPD + billing only?',
      answer:
        'Yes. Many hospitals go live with registration, billing, and pharmacy first, then add IPD, lab, and inventory in phased milestones.',
      open: true,
    },
    {
      question: 'Does it support diagnostic centres without beds?',
      answer:
        'Absolutely. Pathology- and imaging-heavy workflows are supported with order-driven billing and report delivery.',
      open: false,
    },
    {
      question: 'How do integrations work?',
      answer:
        'We scope HL7/FHIR, PACS, payment gateways, and SMS providers during discovery so interfaces land in the right phase of your rollout.',
      open: false,
    },
  ],
  serviceLinks: [
    { label: 'Hospital Management Software', to: PAGE_PATH },
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Educational Institute Management', to: '/educational-institute-management' },
    { label: 'Our Services', to: '/services' },
    { label: 'Information Security', to: '/information-security' },
    { label: 'Process Automation', to: '/process-automation' },
  ],
  asideLinks: [
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Information Security', to: '/information-security' },
  ],
}

function mergeHospitalPageFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackPageData
  return {
    ...fallbackPageData,
    ...data,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
    stats: data.stats?.length ? data.stats : fallbackPageData.stats,
    modules: data.modules?.length ? data.modules : fallbackPageData.modules,
    timeline: data.timeline?.length ? data.timeline : fallbackPageData.timeline,
    spotlight: data.spotlight?.length ? data.spotlight : fallbackPageData.spotlight,
    faqs: data.faqs?.length ? data.faqs : fallbackPageData.faqs,
    asideLinks: data.asideLinks?.length ? data.asideLinks : fallbackPageData.asideLinks,
  }
}

function IconPulse({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 12h3l2-6 4 12 2-6h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HospitalManagementSoftwarePage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [openFaq, setOpenFaq] = useState(0)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/hospital-management-software-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData(mergeHospitalPageFromApi(data))
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

  useEffect(() => {
    const i = pageData.faqs.findIndex((f) => f.open)
    setOpenFaq(i >= 0 ? i : 0)
  }, [pageData.faqs])

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/80 via-[#000b1e]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <span className="text-white/90">Hospital Management Software</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] -skew-y-1 bg-gradient-to-b from-[#00d2ff]/[0.07] via-transparent to-transparent opacity-90"
          aria-hidden
        />

        <div className="relative z-[1]">
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
                      : 'border-white/15 bg-[#000b1e]/50 text-white/85 hover:border-[#00d2ff]/40 hover:text-[#00d2ff]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            <div className="space-y-12">
              <ScrollReveal variant="fade-up">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a3146]/30 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
                  <div className="relative isolate aspect-[21/9] min-h-[200px] sm:min-h-[240px]">
                    <img
                      src={pageData.stripImage}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000b1e]/85 via-[#000b1e]/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                      <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                        {pageData.stripCaption}
                      </p>
                      <span className="shrink-0 rounded-xl border border-[#00d2ff]/40 bg-[#000b1e]/60 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00d2ff] sm:text-sm">
                        {pageData.stripLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {pageData.sectionTitle}
                  </span>
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/82">{pageData.sectionLead}</p>
                <p className="max-w-3xl text-base leading-8 text-white/75">{pageData.sectionSecondary}</p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.06}>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {pageData.stats.map((s) => (
                    <li
                      key={s._id || s.label}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a3146]/80 to-[#000b1e]/90 p-5"
                    >
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#00d2ff]/15 blur-2xl" aria-hidden />
                      <p className="text-3xl font-black text-[#00d2ff] sm:text-4xl">{s.value}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{s.label}</p>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.08}>
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00d2ff]">
                      {pageData.modulesEyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{pageData.modulesTitle}</h3>
                  </div>
                  <IconPulse className="hidden h-10 w-10 text-[#00d2ff]/80 sm:block" />
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pageData.modules.map((m, idx) => (
                    <li
                      key={m._id || m.id}
                      className={`group relative overflow-hidden rounded-2xl border border-white/10 p-5 transition hover:border-[#00d2ff]/35 ${
                        idx === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
                      }`}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.accent} opacity-80 transition group-hover:opacity-100`}
                        aria-hidden
                      />
                      <div className="relative">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#00d2ff]/90">{m.id}</span>
                        <h4 className="mt-2 text-lg font-bold text-white sm:text-xl">{m.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{m.blurb}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.1}>
                <h3 className="text-2xl font-bold text-white">{pageData.timelineTitle}</h3>
                <ol className="relative mt-8 space-y-0 border-l border-[#00d2ff]/35 pl-6 sm:pl-8">
                  {pageData.timeline.map((step, i) => (
                    <li key={step._id || step.title} className="relative pb-10 last:pb-0">
                      <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#00d2ff] bg-[#000b1e] sm:-left-[33px] sm:h-5 sm:w-5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00d2ff]" />
                      </span>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/45">Step {i + 1}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{step.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/78">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>

              <div className="grid gap-6 lg:gap-8">
                {pageData.spotlight.map((block, i) => (
                  <ScrollReveal
                    key={block._id || block.title}
                    variant="fade-up"
                    delay={0.05 * (i + 1)}
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
                      <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">{block.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="fade-up" className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{pageData.faqsTitle}</h3>
                <div className="mt-4 space-y-2">
                  {pageData.faqs.map((faq, i) => {
                    const isOpen = openFaq === i
                    const q = faq.question ?? faq.q
                    const a = faq.answer ?? faq.a
                    return (
                      <div
                        key={faq._id || q}
                        className={`overflow-hidden rounded-2xl border transition ${
                          isOpen ? 'border-[#00d2ff]/45 bg-[#0a3146]/45' : 'border-white/10 bg-[#000b1e]/40'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
                        >
                          <span className="text-sm font-semibold text-white sm:text-base">{q}</span>
                          <span className="shrink-0 text-lg font-light text-[#00d2ff]">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen ? (
                          <p className="border-t border-white/10 px-4 py-4 text-sm leading-7 text-white/78 sm:px-5">{a}</p>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" className="flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="rounded-sm bg-[#00d2ff] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
                >
                  {pageData.primaryCtaLabel}
                </Link>
                <Link
                  to="/how-we-work"
                  className="rounded-sm border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff]"
                >
                  {pageData.secondaryCtaLabel}
                </Link>
              </ScrollReveal>
            </div>

            <aside className="space-y-5 lg:pt-4">
              <ScrollReveal variant="fade-up" className="rounded-2xl border border-white/10 bg-[#0a3146]/70 p-5 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold text-white">{pageData.asideTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">{pageData.asideBody}</p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-sm bg-[#00d2ff] py-3 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
                >
                  {pageData.asideCtaLabel}
                </Link>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00d2ff]/90">Related</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {pageData.asideLinks.map((link) => (
                      <li key={link._id || `${link.label}-${link.to}`}>
                        <Link
                          className="text-white/80 underline-offset-2 hover:text-[#00d2ff] hover:underline"
                          to={link.to}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
