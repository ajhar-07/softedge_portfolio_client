import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/municipality-union-management'

const municipalityPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Smart Governance',
  heroTitle: 'Municipality / Union Management',
  heroLead:
    'Digitize citizen services, tax collection, social safety operations, and administrative workflows with one connected e-governance platform.',
  serviceLinks: [
    { label: 'Municipality / Union Management', to: PAGE_PATH },
    { label: 'Our Services', to: '/services' },
    { label: 'Information Security', to: '/information-security' },
    { label: 'Process Automation', to: '/process-automation' },
    { label: 'Event Processing', to: '/event-processing' },
  ],
  civicModules: [
    {
      title: 'Citizen Service Desk',
      text: 'Application intake, certificate issuance, trade license flow, and digital tracking in one queue.',
      icon: '🏛️',
    },
    {
      title: 'Revenue & Tax Collection',
      text: 'Holding tax, water bills, market rent, and due notices with payment status visibility.',
      icon: '💳',
    },
    {
      title: 'Social Safety Net',
      text: 'Beneficiary enlistment, eligibility checks, and distribution audit trail by ward or village.',
      icon: '🫱🏻‍🫲🏽',
    },
    {
      title: 'Village Court & Complaints',
      text: 'Case registration, hearing schedule, order notes, and status updates for citizens.',
      icon: '⚖️',
    },
  ],
  processTimeline: [
    {
      step: 'Phase 01',
      title: 'Citizen Request Submission',
      text: 'Requests are received from front desk, agent point, or online form with instant token creation.',
    },
    {
      step: 'Phase 02',
      title: 'Field Validation & Approval',
      text: 'Assigned officials verify data and complete role-based approvals with full action history.',
    },
    {
      step: 'Phase 03',
      title: 'Fee, Tax & Payment Reconciliation',
      text: 'System generates payable amounts and syncs all transactions with treasury and finance records.',
    },
    {
      step: 'Phase 04',
      title: 'Document Delivery & Reporting',
      text: 'Approved documents are delivered while dashboards show ward-wise service performance and backlog.',
    },
  ],
  performanceCards: [
    { label: 'Citizen Requests Tracked', value: '50K+' },
    { label: 'Average Process Reduction', value: '60%' },
    { label: 'Revenue Visibility', value: '100%' },
    { label: 'Digital Record Confidence', value: '99.9%' },
  ],
  governanceFeatures: [
    'Ward/Area wise population and household registry',
    'Birth, death, marriage and inheritance certificate workflow',
    'Trade license issue, renewal and arrear tracking',
    'Tender notice, procurement and project progress board',
    'Employee attendance, movement log and payroll handoff',
    'Unified analytics dashboard for chairman, mayor and secretary',
  ],
  faq: [
    {
      q: 'Can this platform work for both municipality and union parishad?',
      a: 'Yes. The platform supports both structures with configurable service modules, naming, and role hierarchy.',
    },
    {
      q: 'Does it support Bangla-friendly citizen-facing operations?',
      a: 'Yes. Core forms, service labels, and printable outputs can be configured for Bangla and English usage.',
    },
    {
      q: 'Can it integrate payment gateway later?',
      a: 'Absolutely. The billing and reconciliation layer is designed to connect with gateway, wallet, or bank APIs.',
    },
  ],
}

function mergeMunicipalityPageFromApi(data) {
  if (!data || typeof data !== 'object') return municipalityPageData
  return {
    ...municipalityPageData,
    ...data,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : municipalityPageData.serviceLinks,
    civicModules: data.civicModules?.length ? data.civicModules : municipalityPageData.civicModules,
    processTimeline: data.processTimeline?.length ? data.processTimeline : municipalityPageData.processTimeline,
    performanceCards: data.performanceCards?.length
      ? data.performanceCards
      : municipalityPageData.performanceCards,
    governanceFeatures: data.governanceFeatures?.length
      ? data.governanceFeatures
      : municipalityPageData.governanceFeatures,
    faq: data.faq?.length ? data.faq : municipalityPageData.faq,
  }
}

export default function MunicipalityManagementPage() {
  const [pageData, setPageData] = useState(municipalityPageData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/municipality-union-management-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData(mergeMunicipalityPageFromApi(data))
          setFetchError('')
        } else {
          setPageData(municipalityPageData)
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_err) {
        setPageData(municipalityPageData)
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
          className="h-[260px] w-full bg-cover bg-center sm:h-[340px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,11,30,0.94)_20%,rgba(6,28,44,0.82)_58%,rgba(0,210,255,0.2)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/40 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{pageData.heroLead}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {pageData.serviceLinks.map((item) => {
            const active = item.to === PAGE_PATH
            return (
              <Link
                key={`${item.label}-${item.to}`}
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

        <ScrollReveal
          variant="fade-up"
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,49,70,0.6),rgba(0,11,30,0.84))] p-6 sm:p-8"
        >
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Core Civic Modules</h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">Citizen First</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pageData.civicModules.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-[#000b1e]/55 p-5 transition hover:-translate-y-1 hover:border-[#00d2ff]/40"
              >
                <p className="text-2xl" aria-hidden>
                  {card.icon}
                </p>
                <p className="mt-3 text-xl font-bold text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{card.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal
            variant="fade-up"
            className="rounded-[1.6rem] border border-white/10 bg-[#000b1e]/40 p-6 sm:p-7"
          >
            <h3 className="text-2xl font-bold text-white">Service Processing Journey</h3>
            <ol className="mt-6 space-y-4">
              {pageData.processTimeline.map((item) => (
                <li
                  key={`${item.step}-${item.title}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.step}</p>
                  <p className="mt-1 text-lg font-bold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.text}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="space-y-4">
            <div className="rounded-[1.6rem] border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.9),rgba(6,18,34,0.95))] p-6">
              <h3 className="text-xl font-bold text-white">Performance Snapshot</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {pageData.performanceCards.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-3xl font-black text-[#00d2ff]">{item.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/68">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[#0a3146]/30 p-6">
              <h3 className="text-xl font-bold text-white">Governance Features</h3>
              <ul className="mt-4 space-y-2.5">
                {pageData.governanceFeatures.map((feature) => (
                  <li
                    key={feature._id || feature.text || feature}
                    className="flex items-start gap-2 text-sm leading-7 text-white/78"
                  >
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d2ff]" />
                    <span>{typeof feature === 'string' ? feature : feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-14">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.faq.map((item) => (
              <li key={item.q} className="rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.q}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{item.a}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  )
}
