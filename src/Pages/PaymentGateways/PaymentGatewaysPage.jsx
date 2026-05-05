import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/payment-gateways'

const pageData = {
  heroImage:
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'FinTech Infrastructure',
  heroTitle: 'Payment Gateways & Digital Wallets',
  heroLead:
    'Launch secure, scalable payment experiences with wallet operations, merchant onboarding, settlement intelligence, and fraud-aware transaction controls.',
  heroStats: [
    { value: '120M+', label: 'Yearly transactions processed' },
    { value: '35+', label: 'Integrated banks and processors' },
    { value: '9', label: 'Risk engines in one pipeline' },
  ],
  serviceLinks: [
    { label: 'Payment Gateways & Digital Wallets', to: PAGE_PATH },
    { label: 'Municipality / Union Management', to: '/municipality-union-management' },
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Information Security', to: '/information-security' },
    { label: 'Our Services', to: '/services' },
  ],
  rails: [
    {
      title: 'Checkout Orchestration',
      text: 'Route transactions by bank, method, and risk score to maximize approval rate.',
      gradient: 'from-[#00d2ff]/45 to-[#1b6ea1]/35',
    },
    {
      title: 'Wallet Ledger Engine',
      text: 'Credit/debit, reversal, hold, release, and statement generation with immutable history.',
      gradient: 'from-[#00c17c]/35 to-[#0a4d64]/35',
    },
    {
      title: 'Merchant Settlement',
      text: 'Automated T+0/T+1 settlement, fee split, and payout file generation.',
      gradient: 'from-[#7a6bff]/35 to-[#13395b]/35',
    },
  ],
  partnerChannels: [
    { name: 'Card Networks', detail: 'Visa, Mastercard, local schemes, tokenized rails' },
    { name: 'Wallet Partners', detail: 'App wallets, telco wallets, super app ecosystems' },
    { name: 'QR & NFC', detail: 'Static/dynamic QR and contactless acceptance flows' },
    { name: 'Bank Transfers', detail: 'Instant transfer, scheduled payout, virtual accounts' },
  ],
  flowSteps: [
    { phase: '01', title: 'User Pays', text: 'Customer completes payment through card, wallet, QR, or transfer.' },
    { phase: '02', title: 'Risk Check', text: 'Real-time fraud filters and velocity rules evaluate transaction health.' },
    { phase: '03', title: 'Authorization', text: 'Smart routing sends request to best processor/bank channel.' },
    { phase: '04', title: 'Settlement', text: 'Funds are reconciled and settled to merchant and platform wallets.' },
  ],
  riskLayers: [
    { id: 'R1', title: 'Device fingerprinting', text: 'Detect unusual device swaps and emulator activity.' },
    { id: 'R2', title: 'Behavior intelligence', text: 'Model transaction rhythm, amount spikes, and geo mismatch.' },
    { id: 'R3', title: 'Rule orchestration', text: 'Allow, challenge, queue, or block with policy-based routing.' },
    { id: 'R4', title: 'Case management', text: 'Fraud review board with annotated timelines and outcomes.' },
  ],
  walletCapabilities: [
    { code: 'W1', heading: 'KYC & account tiers', detail: 'Support onboarding tiers with configurable limits.' },
    { code: 'W2', heading: 'Cash in / cash out', detail: 'Agent, bank, and API-assisted top-up and withdrawal flows.' },
    { code: 'W3', heading: 'Bill & utility payments', detail: 'Single dashboard for recurring and one-time payment services.' },
    { code: 'W4', heading: 'Refund & dispute handling', detail: 'Traceable dispute states with SLA timers and audit notes.' },
  ],
  metrics: [
    { value: '99.95%', label: 'Transaction uptime target' },
    { value: '< 1.8s', label: 'Average payment response' },
    { value: '24/7', label: 'Monitoring & alerts' },
  ],
  businessUseCases: [
    {
      title: 'E-commerce checkout',
      text: 'Improve conversion with one-click cards, saved instruments, and retry routing.',
    },
    {
      title: 'Utility and bill payment',
      text: 'Handle recurring bills, reminders, and due-tracking in a wallet-first flow.',
    },
    {
      title: 'Agent cash operations',
      text: 'Branch and agent-assisted cash-in/cash-out with role-based limits.',
    },
    {
      title: 'Marketplace settlement',
      text: 'Split payments by merchant, commission, tax, and delayed release.',
    },
  ],
  faqs: [
    {
      q: 'Can this support both gateway and wallet in one platform?',
      a: 'Yes. The architecture supports processor integrations and full wallet lifecycle in one control panel.',
    },
    {
      q: 'Do you provide fraud and reconciliation modules?',
      a: 'Yes. We provide rule-based fraud checks, transaction traceability, and auto reconciliation workflows.',
    },
    {
      q: 'Can we start with gateway first and add wallet later?',
      a: 'Absolutely. Modules are deployment-ready in phases so you can scale from gateway to full fintech stack.',
    },
  ],
}

function mergePaymentGatewaysPageFromApi(data) {
  if (!data || typeof data !== 'object') return pageData
  return {
    ...pageData,
    ...data,
    heroStats: data.heroStats?.length ? data.heroStats : pageData.heroStats,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : pageData.serviceLinks,
    rails: data.rails?.length ? data.rails : pageData.rails,
    partnerChannels: data.partnerChannels?.length ? data.partnerChannels : pageData.partnerChannels,
    flowSteps: data.flowSteps?.length ? data.flowSteps : pageData.flowSteps,
    riskLayers: data.riskLayers?.length ? data.riskLayers : pageData.riskLayers,
    walletCapabilities: data.walletCapabilities?.length ? data.walletCapabilities : pageData.walletCapabilities,
    metrics: data.metrics?.length ? data.metrics : pageData.metrics,
    businessUseCases: data.businessUseCases?.length ? data.businessUseCases : pageData.businessUseCases,
    faqs: data.faqs?.length ? data.faqs : pageData.faqs,
  }
}

export default function PaymentGatewaysPage() {
  const [liveData, setLiveData] = useState(pageData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment-gateways-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLiveData(mergePaymentGatewaysPageFromApi(data))
          setFetchError('')
        } else {
          setLiveData(pageData)
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_error) {
        setLiveData(pageData)
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
        <div className="h-[260px] w-full bg-cover bg-center sm:h-[340px]" style={{ backgroundImage: `url(${liveData.heroImage})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,11,30,0.92)_16%,rgba(9,35,54,0.78)_58%,rgba(0,210,255,0.24)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {liveData.heroBadge}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">{liveData.heroTitle}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{liveData.heroLead}</p>
            <div className="mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">
              {liveData.heroStats.map((item) => (
                <div key={item._id || item.label} className="rounded-xl border border-[#00d2ff]/25 bg-[#0a3146]/45 px-3 py-2">
                  <p className="text-lg font-black text-[#00d2ff] sm:text-xl">{item.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {liveData.serviceLinks.map((item) => {
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

        <ScrollReveal variant="fade-up" className="grid gap-4 md:grid-cols-3">
          {liveData.rails.map((rail) => (
            <article
              key={rail._id || rail.title}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${rail.gradient} p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)]`}
            >
              <h3 className="text-lg font-bold text-white">{rail.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/80">{rail.text}</p>
            </article>
          ))}
        </ScrollReveal>

        <ScrollReveal
          variant="fade-up"
          delay={0.04}
          className="mt-10 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,36,54,0.8),rgba(2,15,30,0.92))] p-6 sm:p-8"
        >
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">Partner Channel Matrix</h2>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">Omni-rail Connectivity</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {liveData.partnerChannels.map((item) => (
              <article key={item._id || item.name} className="rounded-2xl border border-[#00d2ff]/20 bg-[#0a3146]/35 p-4">
                <p className="text-base font-bold text-[#00d2ff]">{item.name}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{item.detail}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.06} className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">Payment Lifecycle</h2>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">Realtime Transaction Flow</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {liveData.flowSteps.map((item) => (
              <li key={item._id || item.phase} className="rounded-2xl border border-[#00d2ff]/18 bg-[#0a3146]/38 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">Phase {item.phase}</p>
                <p className="mt-2 text-lg font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">Risk & Compliance Layers</h2>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">Trust Architecture</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {liveData.riskLayers.map((layer) => (
              <article key={layer._id || layer.id} className="rounded-2xl border border-[#00d2ff]/18 bg-[#0a3146]/38 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{layer.id}</p>
                <p className="mt-2 text-lg font-bold text-white">{layer.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/74">{layer.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal variant="fade-up" className="rounded-[1.7rem] border border-white/10 bg-[#000b1e]/45 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white">Digital Wallet Capabilities</h3>
            <ul className="mt-6 space-y-4">
              {liveData.walletCapabilities.map((item) => (
                <li key={item._id || item.code} className="rounded-xl border border-[#00d2ff]/18 bg-[#0a3146]/28 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.code}</p>
                  <p className="mt-1 text-lg font-bold text-white">{item.heading}</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.detail}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1} className="space-y-4">
            {liveData.metrics.map((metric) => (
              <div key={metric._id || metric.label} className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.9),rgba(6,18,34,0.95))] p-6">
                <p className="text-4xl font-black text-[#00d2ff]">{metric.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62">{metric.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-14">
          <h3 className="text-2xl font-bold text-white">Business Use Cases</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {liveData.businessUseCases.map((useCase) => (
              <article
                key={useCase._id || useCase.title}
                className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.86),rgba(6,18,34,0.95))] p-5"
              >
                <p className="text-lg font-bold text-white">{useCase.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{useCase.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.14} className="mt-16">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {liveData.faqs.map((item) => (
              <li key={item._id || item.q} className="rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5">
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
