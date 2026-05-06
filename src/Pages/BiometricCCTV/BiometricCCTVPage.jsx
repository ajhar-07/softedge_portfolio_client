import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Physical Security Solutions',
  heroTitle: 'Biometric Access + CCTV Surveillance',
  breadcrumbTitle: 'Biometric + CCTV',
  whyBadge: 'Why This Matters',
  whyTitle: 'Integrated Security For People, Assets, and Data',
  whyDescription:
    'Modern organizations need more than standalone devices. We build integrated biometric and CCTV systems where entry points, surveillance, alerting, and reporting operate together. This reduces unauthorized access risk, improves response time, and gives clear evidence trails for management, compliance, and legal review.',
  whyDescriptionBottom:
    'Our deployments include site-specific planning, secure networking, centralized control, and user training so your team can operate confidently from day one.',
  implementationTitle: 'Implementation Flow',
  coverageTitle: 'Coverage Environments',
  complianceTitle: 'Compliance & Security Governance',
  complianceDescription:
    'A security deployment is complete only when operations, policy, and audit trails are aligned. We help your team maintain secure daily operations through documentation and periodic reviews.',
  stackTitle: 'Recommended Technology Stack',
  supportTitle: 'Operations & Support Plans',
  faqTitle: 'FAQ & Next Step',
  ctaButtonText: 'Request Consultation',
  ctaButtonLink: '/services',
  metrics: [
    { _id: 'm1', value: '99.9%', label: 'System Uptime Target' },
    { _id: 'm2', value: '24/7', label: 'Monitoring Ready' },
    { _id: 'm3', value: 'Role-based', label: 'Access Permission Control' },
    { _id: 'm4', value: 'Instant', label: 'Alert & Notification Pipeline' },
  ],
  coreModules: [
    {
      _id: 'c1',
      title: 'Biometric Access Control',
      description:
        'Fingerprint, face, card, and PIN based multi-factor entry with role-wise permissions for office floors, labs, and restricted zones.',
      points: ['RFID + Finger + Face combo', 'Shift-based access schedule', 'Anti-passback and forced-door alerts'],
    },
  ],
  projectFlow: [{ _id: 'p1', text: 'Security requirement survey and zone risk mapping' }],
  coverageItems: [{ _id: 'v1', text: 'Corporate office' }],
  hardwareStack: [{ _id: 'h1', title: 'Access Hardware', items: ['Biometric reader'] }],
  compliancePoints: [{ _id: 'cp1', text: 'User access policy with approval workflow' }],
  servicePlans: [{ _id: 'sp1', name: 'Standard Support', details: 'Business-hours monitoring support.' }],
  faqItems: [{ _id: 'f1', q: 'Can biometric and CCTV work together?', a: 'Yes.' }],
}

export default function BiometricCCTVPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let ignore = false

    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/biometric-cctv-page`)
        if (!response.ok) throw new Error('Failed to fetch biometric cctv page data')
        const data = await response.json()
        if (ignore) return
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          metrics: data.metrics?.length ? data.metrics : DEFAULT_PAGE_DATA.metrics,
          coreModules: data.coreModules?.length ? data.coreModules : DEFAULT_PAGE_DATA.coreModules,
          projectFlow: data.projectFlow?.length ? data.projectFlow : DEFAULT_PAGE_DATA.projectFlow,
          coverageItems: data.coverageItems?.length ? data.coverageItems : DEFAULT_PAGE_DATA.coverageItems,
          hardwareStack: data.hardwareStack?.length ? data.hardwareStack : DEFAULT_PAGE_DATA.hardwareStack,
          compliancePoints:
            data.compliancePoints?.length ? data.compliancePoints : DEFAULT_PAGE_DATA.compliancePoints,
          servicePlans: data.servicePlans?.length ? data.servicePlans : DEFAULT_PAGE_DATA.servicePlans,
          faqItems: data.faqItems?.length ? data.faqItems : DEFAULT_PAGE_DATA.faqItems,
        })
      } catch (error) {
        console.error(error)
      }
    }

    loadPage()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[230px] w-full bg-cover bg-center sm:h-[260px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,11,30,0.86),rgba(0,11,30,0.45),rgba(0,11,30,0.15))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="inline-flex items-center gap-2 rounded-sm bg-[#1f4358]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/biometric-cctv-surveillance" className="transition-colors hover:text-[#00d2ff]">
                {pageData.breadcrumbTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.whyBadge}</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{pageData.whyTitle}</h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {pageData.whyDescription}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {pageData.whyDescriptionBottom}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="grid gap-4 rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6">
            {pageData.metrics.map((item) => (
              <div key={item._id || `${item.value}-${item.label}`} className="rounded-xl border border-white/10 bg-[#0a3146]/35 px-4 py-3">
                <p className="text-2xl font-black text-[#00d2ff]">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{item.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.coreModules.map((module, index) => (
            <ScrollReveal
              key={module._id || module.title}
              variant="fade-up"
              delay={index * 0.08}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(0,11,30,0.8),rgba(7,36,54,0.72))] p-5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.65)]"
            >
              <h3 className="text-xl font-bold text-white">{module.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{module.description}</p>
              <ul className="mt-4 space-y-2">
                {(module.points || []).map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-white/85">
                    <span className="mt-1 text-[#00d2ff]">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[#041d33]/72 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.implementationTitle}</h3>
          <div className="mt-4 space-y-3">
            {pageData.projectFlow.map((step, idx) => (
              <div key={step._id || step.text} className="flex gap-3 rounded-lg border border-white/10 bg-[#08253b]/50 p-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00d2ff] text-xs font-bold text-[#000b1e]">
                  {idx + 1}
                </span>
                <p className="text-sm leading-6 text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.coverageTitle}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {pageData.coverageItems.map((item) => (
              <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/38 px-3 py-2 text-sm text-white/85">
                {item.text}
              </div>
            ))}
          </div>
          <h4 className="mt-6 text-lg font-bold text-white">{pageData.complianceTitle}</h4>
          <p className="mt-2 text-sm leading-7 text-white/78">
            {pageData.complianceDescription}
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#041a2f]/72 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white">{pageData.stackTitle}</h3>
            <div className="mt-4 space-y-4">
              {pageData.hardwareStack.map((block) => (
                <article key={block._id || block.title} className="rounded-xl border border-white/10 bg-[#08253b]/50 p-4">
                  <h4 className="text-base font-bold text-[#00d2ff]">{block.title}</h4>
                  <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                    {(block.items || []).map((item) => (
                      <li key={item} className="text-sm text-white/82">
                        - {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#000b1e]/58 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white">{pageData.complianceTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-white/78">
              {pageData.complianceDescription}
            </p>
            <div className="mt-4 grid gap-2">
              {pageData.compliancePoints.map((item) => (
                <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/35 px-3 py-2 text-sm text-white/85">
                  {item.text}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(0,11,30,0.86),rgba(8,37,59,0.76))] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.supportTitle}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pageData.servicePlans.map((plan) => (
              <article key={plan._id || plan.name} className="rounded-xl border border-white/12 bg-[#0a3146]/30 p-4">
                <h4 className="text-base font-bold text-[#00d2ff]">{plan.name}</h4>
                <p className="mt-2 text-sm leading-7 text-white/82">{plan.details}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/28 bg-[linear-gradient(145deg,rgba(0,11,30,0.92),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.faqTitle}</h3>
              <div className="mt-4 space-y-3">
                {pageData.faqItems.map((item) => (
                  <article key={item._id || item.q} className="rounded-lg border border-white/12 bg-[#0a3146]/35 p-4">
                    <p className="text-sm font-semibold text-white">{item.q}</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
            <Link
              to={pageData.ctaButtonLink || '/services'}
              className="inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
            >
              {pageData.ctaButtonText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

