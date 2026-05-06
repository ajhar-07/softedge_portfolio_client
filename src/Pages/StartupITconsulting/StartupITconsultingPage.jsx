import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Startup Acceleration',
  heroTitle: 'Startup IT Consulting, System Setup + Digital Transformation',
  breadcrumbTitle: 'Startup IT Consulting',
  introTitle: 'Build A Strong Technology Core Before You Scale',
  introDescription:
    'Early-stage startups often move fast without structured systems, which creates hidden bottlenecks later. Our consulting program helps founders design the right architecture, choose cost-efficient tools, and establish repeatable operational systems that support growth without chaos.',
  processTitle: 'Transformation Working Process',
  outcomesTitle: 'Expected Outcomes',
  ctaButtonText: 'Book Startup IT Session',
  ctaButtonLink: '/contact-us',
  consultingPillars: [
    {
      _id: 'pillar-1',
      title: 'Startup Technology Strategy',
      description:
        'From idea validation to execution roadmap, we align business goals with the right technology stack, architecture, and delivery milestones.',
    },
    {
      _id: 'pillar-2',
      title: 'System Setup & Cloud Foundation',
      description:
        'We build your startup-ready infrastructure including cloud environments, CI/CD workflows, security baselines, and observability stack.',
    },
    {
      _id: 'pillar-3',
      title: 'Digital Transformation Programs',
      description:
        'Legacy/manual operations are redesigned into automated digital workflows for sales, operations, customer support, and analytics.',
    },
  ],
  transformationStages: [
    { _id: 'stage-1', step: 'Step 01', title: 'Current-State Assessment', text: 'Evaluate business model, process maturity, and technology readiness.' },
    { _id: 'stage-2', step: 'Step 02', title: 'Transformation Blueprint', text: 'Define systems, integrations, data model, and execution priorities.' },
    { _id: 'stage-3', step: 'Step 03', title: 'Implementation Sprint', text: 'Set up tools, automate workflows, and deliver measurable operational improvements.' },
    { _id: 'stage-4', step: 'Step 04', title: 'Scale & Governance', text: 'Introduce metrics, controls, and team operating rhythms for long-term growth.' },
  ],
  outcomes: [
    { _id: 'out-1', text: 'Faster product and feature launch cycle' },
    { _id: 'out-2', text: 'Lower technical debt from day one' },
    { _id: 'out-3', text: 'Clear architecture for scaling users' },
    { _id: 'out-4', text: 'Process automation for core operations' },
    { _id: 'out-5', text: 'Data-driven founder decision support' },
    { _id: 'out-6', text: 'Improved investor and compliance readiness' },
  ],
}

export default function StartupITconsultingPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/startup-it-consulting-page`)
        if (!response.ok) return
        const data = await response.json()
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          consultingPillars: Array.isArray(data.consultingPillars) ? data.consultingPillars : DEFAULT_PAGE_DATA.consultingPillars,
          transformationStages: Array.isArray(data.transformationStages) ? data.transformationStages : DEFAULT_PAGE_DATA.transformationStages,
          outcomes: Array.isArray(data.outcomes) ? data.outcomes : DEFAULT_PAGE_DATA.outcomes,
        })
      } catch (_error) {
      }
    }
    fetchPageData()
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[245px] w-full bg-cover bg-center sm:h-[295px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(0,210,255,0.22),transparent_40%),linear-gradient(120deg,rgba(0,11,30,0.92),rgba(0,11,30,0.62),rgba(0,11,30,0.35))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right">
            <p className="inline-flex rounded-sm bg-[#1f4358]/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="hover:text-[#00d2ff]">Home</Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/startup-it-consulting-digital-transformation" className="hover:text-[#00d2ff]">{pageData.breadcrumbTitle}</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(3,26,46,0.8),rgba(0,11,30,0.85))] p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">{pageData.introTitle}</h2>
          <p className="mt-4 text-base leading-8 text-white/80">
            {pageData.introDescription}
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.consultingPillars.map((item, index) => (
            <ScrollReveal key={item._id || item.title} delay={index * 0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-5">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#000b1e]/58 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.processTitle}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pageData.transformationStages.map((item) => (
                <div key={item._id || item.title} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#00d2ff]">{item.step}</p>
                  <h4 className="mt-1 text-base font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/75">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.outcomesTitle}</h3>
            <ul className="mt-4 space-y-2">
              {pageData.outcomes.map((item) => (
                <li key={item._id || item.text} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="mt-1 text-[#00d2ff]">•</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link
              to={pageData.ctaButtonLink || '/contact-us'}
              className="mt-5 inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-7 py-2.5 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
            >
              {pageData.ctaButtonText}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

