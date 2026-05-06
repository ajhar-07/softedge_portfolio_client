import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Automation Excellence',
  heroTitle: 'Robotic Process Automation (RPA)',
  breadcrumbTitle: 'RPA',
  processBadge: 'Process Intelligence',
  processTitle: 'Automate Repetitive Workflows and Free Your Team For Higher-Value Tasks',
  processDescription:
    'RPA helps organizations reduce manual workload, improve speed, and maintain process consistency across departments. Our bots follow your SOPs, integrate with existing systems, and provide full operational visibility through logs and dashboards.',
  processDescriptionBottom:
    'We design automation with governance in mind: exception control, audit traceability, and scalable bot operations for business growth.',
  implementationTitle: 'Implementation Workflow',
  targetsTitle: 'High-impact Automation Targets',
  faqTitle: 'FAQ & Next Step',
  ctaButtonText: 'Plan RPA Strategy',
  ctaButtonLink: '/services',
  rpaSolutions: [
  {
    _id: 's1',
    title: 'Back-office Task Automation',
    description:
      'Automate repetitive daily tasks like data entry, reconciliation, report generation, and document movement across systems.',
    points: ['Rule-based workflows', 'Human approval checkpoints', 'Error handling and retry logic'],
  },
  {
    _id: 's2',
    title: 'Finance & HR Process Bots',
    description:
      'RPA bots for invoice processing, payroll validations, leave tracking, onboarding forms, and compliance documentation.',
    points: ['Excel/PDF extraction', 'Auto validation rules', 'Audit-ready logs'],
  },
  {
    _id: 's3',
    title: 'Customer Operations Automation',
    description:
      'Automate ticket routing, status updates, SLA reminders, and service follow-up actions to speed up response delivery.',
    points: ['CRM integration', 'Notification triggers', 'Escalation pipelines'],
  },
  ],

  automationTargets: [{ _id: 'a1', text: 'Data migration and synchronization' }],

  implementationFlow: [
  {
    _id: 'w1',
    phase: 'Phase 1',
    title: 'Process Discovery',
    text: 'Identify high-volume repetitive tasks and map current process gaps with measurable baseline KPIs.',
  },
  {
    _id: 'w2',
    phase: 'Phase 2',
    title: 'Bot Design',
    text: 'Define workflow rules, exception handling, security controls, and integration touchpoints.',
  },
  {
    _id: 'w3',
    phase: 'Phase 3',
    title: 'Development & UAT',
    text: 'Build bots, run test scenarios, validate business outputs, and finalize go-live checklist.',
  },
  {
    _id: 'w4',
    phase: 'Phase 4',
    title: 'Deployment & Monitoring',
    text: 'Launch automation with live monitoring, optimization cycles, and controlled scaling.',
  },
  ],

  outcomes: [{ _id: 'o1', value: '70%+', label: 'Faster repetitive process execution' }],

  faqs: [
  {
    _id: 'f1',
    q: 'Which processes are best suited for RPA?',
    a: 'Rule-based, repetitive, high-volume tasks with structured inputs are ideal for fast and stable automation.',
  },
  {
    _id: 'f2',
    q: 'Do we need to replace existing software?',
    a: 'No. RPA generally works with your current tools by automating interaction steps, reducing disruption.',
  },
  {
    _id: 'f3',
    q: 'How do you ensure control and security?',
    a: 'We use role-based access, bot credential governance, detailed logs, and approval checkpoints where needed.',
  },
  ],
}

export default function RoboticProcessPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let ignore = false

    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/robotic-process-page`)
        if (!response.ok) throw new Error('Failed to fetch robotic process page data')
        const data = await response.json()
        if (ignore) return
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          rpaSolutions: data.rpaSolutions?.length ? data.rpaSolutions : DEFAULT_PAGE_DATA.rpaSolutions,
          automationTargets:
            data.automationTargets?.length ? data.automationTargets : DEFAULT_PAGE_DATA.automationTargets,
          implementationFlow:
            data.implementationFlow?.length ? data.implementationFlow : DEFAULT_PAGE_DATA.implementationFlow,
          outcomes: data.outcomes?.length ? data.outcomes : DEFAULT_PAGE_DATA.outcomes,
          faqs: data.faqs?.length ? data.faqs : DEFAULT_PAGE_DATA.faqs,
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
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,11,30,0.88),rgba(0,11,30,0.48),rgba(0,11,30,0.2))]" />
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
              <Link to="/robotic-process-automation" className="transition-colors hover:text-[#00d2ff]">
                {pageData.breadcrumbTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.processBadge}</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {pageData.processTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {pageData.processDescription}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {pageData.processDescriptionBottom}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="grid gap-4 rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6">
            {pageData.outcomes.map((item) => (
              <div key={item._id || item.label} className="rounded-xl border border-white/10 bg-[#0a3146]/35 px-4 py-3">
                <p className="text-2xl font-black text-[#00d2ff]">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{item.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.rpaSolutions.map((block, index) => (
            <ScrollReveal
              key={block._id || block.title}
              variant="fade-up"
              delay={index * 0.08}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(0,11,30,0.8),rgba(7,36,54,0.72))] p-5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.65)]"
            >
              <h3 className="text-xl font-bold text-white">{block.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{block.description}</p>
              <ul className="mt-4 space-y-2">
                {(block.points || []).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                    <span className="mt-1 text-[#00d2ff]">•</span>
                    <span>{item}</span>
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
            {pageData.implementationFlow.map((step) => (
              <div key={step._id || step.title} className="rounded-lg border border-white/10 bg-[#08253b]/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{step.phase}</p>
                <h4 className="mt-1 text-lg font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.targetsTitle}</h3>
          <div className="mt-4 grid gap-2">
            {pageData.automationTargets.map((item) => (
              <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/38 px-3 py-2 text-sm text-white/85">
                {item.text}
              </div>
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
                {pageData.faqs.map((item) => (
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

