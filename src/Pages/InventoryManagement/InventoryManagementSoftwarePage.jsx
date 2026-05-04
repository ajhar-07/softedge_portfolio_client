import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/inventory-management-software'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=80',
  heroTitle: 'Inventory Management Software',
  heroLead:
    'Track stock movement, automate replenishment, and control warehouse operations with one intelligent inventory platform.',
  heroBadge: 'Stock. Control. Visibility.',
  serviceLinks: [
    { label: 'Inventory Management Software', to: PAGE_PATH },
    { label: 'ERP Software', to: '/erp-software' },
    { label: 'Hospital Management Software', to: '/hospital-management-software' },
    { label: 'Restaurant Management Software', to: '/restaurant-management-software' },
    { label: 'Our Services', to: '/services' },
  ],
  overviewCards: [
    { title: 'Live Stock Ledger', text: 'Batch-wise, SKU-wise, and location-wise stock updates in real time.' },
    { title: 'Smart Reorder', text: 'Auto reorder points based on demand pattern and lead time.' },
    { title: 'Audit Trail', text: 'Every stock in/out, transfer, and correction stays fully traceable.' },
  ],
  operationsFlow: [
    {
      step: 'Step 01',
      title: 'Goods Receive Note (GRN)',
      text: 'Capture inbound stock with supplier reference, batch details, and quality checkpoints.',
    },
    {
      step: 'Step 02',
      title: 'Bin Allocation & Putaway',
      text: 'Assign SKUs to optimized rack/bin locations for faster retrieval and fewer picking errors.',
    },
    {
      step: 'Step 03',
      title: 'Order Fulfillment',
      text: 'Create pick list, validate packed quantities, and update stock ledger automatically.',
    },
    {
      step: 'Step 04',
      title: 'Cycle Count & Reconciliation',
      text: 'Run periodic counts, detect variances, and maintain audit-ready adjustments.',
    },
  ],
  integrationGrid: [
    { label: 'POS Systems', detail: 'Sales sync to inventory in real time' },
    { label: 'ERP & Finance', detail: 'Purchase, stock value, and COGS alignment' },
    { label: 'E-commerce', detail: 'Live availability across online channels' },
    { label: 'Barcode Devices', detail: 'Faster GRN, transfers, and stock count' },
    { label: 'Delivery Modules', detail: 'Dispatch status with item-level tracking' },
    { label: 'Analytics Layer', detail: 'Demand forecasting and reorder intelligence' },
  ],
  outcomes: [
    {
      title: 'Lower stock leakage',
      text: 'Role-based approvals and movement tracking reduce unauthorized adjustments.',
    },
    {
      title: 'Faster warehouse response',
      text: 'Structured receiving and pick workflows reduce operational delays.',
    },
    {
      title: 'Better planning accuracy',
      text: 'Historical consumption with lead-time awareness improves procurement decisions.',
    },
  ],
  capabilities: [
    {
      id: 'A1',
      heading: 'Multi-warehouse control',
      detail: 'Central view with warehouse-specific permissions and transfer approvals.',
    },
    {
      id: 'A2',
      heading: 'Barcode & QR support',
      detail: 'Fast scanning for receiving, picking, cycle counts, and retail dispatch.',
    },
    {
      id: 'A3',
      heading: 'Dead stock insights',
      detail: 'Slow movers, overstock risk, and aging inventory alerts with action suggestions.',
    },
    {
      id: 'A4',
      heading: 'Purchase coordination',
      detail: 'Vendor-wise rates, pending POs, and GRN mismatch visibility for finance teams.',
    },
  ],
  metrics: [
    { value: '99.9%', label: 'Stock accuracy target' },
    { value: '24/7', label: 'Owner dashboard visibility' },
    { value: '∞', label: 'Scalable SKU handling' },
  ],
  faqs: [
    {
      question: 'Can we manage multiple warehouses and outlets?',
      answer:
        'Yes. You can manage central warehouse, branches, and counters from one system with role-based access.',
    },
    {
      question: 'Does this support barcode-based operations?',
      answer:
        'Yes. Receiving, transfer, stock count, and dispatch can all be performed with barcode/QR scanning.',
    },
    {
      question: 'Can we integrate with billing or ERP later?',
      answer:
        'Absolutely. The inventory modules are designed for phased integration with POS, accounting, and ERP workflows.',
    },
  ],
}

function mergeInventoryPageFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackPageData
  return {
    ...fallbackPageData,
    ...data,
    serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
    overviewCards: data.overviewCards?.length ? data.overviewCards : fallbackPageData.overviewCards,
    operationsFlow: data.operationsFlow?.length ? data.operationsFlow : fallbackPageData.operationsFlow,
    integrationGrid: data.integrationGrid?.length ? data.integrationGrid : fallbackPageData.integrationGrid,
    outcomes: data.outcomes?.length ? data.outcomes : fallbackPageData.outcomes,
    capabilities: data.capabilities?.length ? data.capabilities : fallbackPageData.capabilities,
    metrics: data.metrics?.length ? data.metrics : fallbackPageData.metrics,
    faqs: data.faqs?.length ? data.faqs : fallbackPageData.faqs,
  }
}

export default function InventoryManagementSoftwarePage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/inventory-management-software-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData(mergeInventoryPageFromApi(data))
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
          className="h-[250px] w-full bg-cover bg-center sm:h-[320px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,11,30,0.9)_20%,rgba(0,11,30,0.58)_58%,rgba(4,49,77,0.45)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
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

        <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,49,70,0.56),rgba(0,11,30,0.82))] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {pageData.overviewCards.map((card) => (
              <div key={card._id || card.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-bold text-[#00d2ff]">{card.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{card.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.06} className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-bold text-white">Operations Workflow</h3>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">Data-driven execution</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pageData.operationsFlow.map((item) => (
              <li key={item._id || `${item.step}-${item.title}`} className="rounded-2xl border border-white/10 bg-[#0a3146]/30 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.step}</p>
                <p className="mt-2 text-lg font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <h3 className="text-2xl font-bold text-white">Integration Matrix</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pageData.integrationGrid.map((item) => (
              <div key={item._id || item.label} className="rounded-2xl border border-white/10 bg-[#000b1e]/50 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.detail}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-14">
          <h3 className="text-2xl font-bold text-white">Business Outcomes</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.outcomes.map((item) => (
              <div
                key={item._id || item.title}
                className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.85),rgba(6,18,34,0.95))] p-5"
              >
                <p className="text-lg font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal variant="fade-up" className="rounded-[1.8rem] border border-white/10 bg-[#000b1e]/45 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white">Core Capabilities</h3>
            <ul className="mt-6 space-y-4">
              {pageData.capabilities.map((item) => (
                <li key={item._id || item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.id}</p>
                  <p className="mt-1 text-lg font-bold text-white">{item.heading}</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.detail}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="space-y-4">
            {pageData.metrics.map((m) => (
              <div
                key={m._id || m.label}
                className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.9),rgba(6,18,34,0.95))] p-6"
              >
                <p className="text-4xl font-black text-[#00d2ff]">{m.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62">{m.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-16">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.faqs.map((item) => (
              <li key={item._id || item.question} className="rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.question}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{item.answer}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  )
}
