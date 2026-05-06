import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Product Engineering Studio',
  heroTitle: 'Custom Software + SaaS Platform Development',
  breadcrumbTitle: 'Custom SaaS',
  introTitle: 'Build Software That Fits Your Business, Then Scale It Like A Product',
  introDescription:
    'We design and engineer custom software systems and SaaS products that solve real operational problems, reduce manual bottlenecks, and create long-term digital assets for growth. Whether you need an internal command center, a customer-facing portal, or a subscription-based platform, we deliver with a product-first mindset.',
  workingProcessTitle: 'Working Process',
  workingProcessDescription:
    'Our team follows a predictable product delivery framework so stakeholders get transparency on scope, timeline, and release quality.',
  architectureTitle: 'Platform Architecture & Engineering Focus',
  engagementTitle: 'Engagement Models',
  showcaseTitle: 'Project Showcase',
  showcaseBadge: 'Live + Code Access',
  videoDemoTitle: 'Projects Video Demo',
  videoDemoBadge: 'Live Walkthrough',
  faqTitle: 'Frequently Asked Questions',
  deliveryTracks: [
    {
      _id: 'track-1',
      title: 'Custom Business Software',
      description:
        'Requirement-driven software for operations, sales, support, finance, and reporting with role-based workflows and approval layers.',
      points: ['Process mapping workshops', 'Modular architecture for growth', 'Enterprise security and audit logging'],
    },
    {
      _id: 'track-2',
      title: 'SaaS Product Engineering',
      description:
        'From MVP to scale-ready multi-tenant SaaS platform with subscription, analytics, and customer self-service onboarding.',
      points: ['Tenant-isolated data design', 'Usage and billing lifecycle', 'Scalable API + dashboard ecosystem'],
    },
    {
      _id: 'track-3',
      title: 'Integration & Automation Layer',
      description:
        'Connect ERP, CRM, payment gateway, identity systems, and third-party APIs into one stable digital operating model.',
      points: ['Event-based sync architecture', 'Reliable webhook pipelines', 'Operational alerts and monitoring'],
    },
  ],
  buildFlow: [
    {
      _id: 'flow-1',
      stage: '01',
      title: 'Discovery & Product Blueprint',
      text: 'Business goals, user roles, core workflows, and success metrics are finalized.',
    },
    {
      _id: 'flow-2',
      stage: '02',
      title: 'UX Prototyping & Technical Design',
      text: 'Interactive journey mapping with data model and architecture planning.',
    },
    {
      _id: 'flow-3',
      stage: '03',
      title: 'Agile Build & QA Cycle',
      text: 'Sprint-wise development with regression testing and security checks.',
    },
    {
      _id: 'flow-4',
      stage: '04',
      title: 'Launch, Support & Growth',
      text: 'Deployment, observability, team enablement, and roadmap expansion support.',
    },
  ],
  architectureHighlights: [
    { _id: 'arch-1', text: 'Multi-tenant SaaS architecture with tenant-aware access control' },
    { _id: 'arch-2', text: 'Secure authentication with role hierarchy and policy enforcement' },
    { _id: 'arch-3', text: 'Billing, subscription, and plan lifecycle automation' },
    { _id: 'arch-4', text: 'Analytics dashboard with KPI drill-downs and export pipelines' },
    { _id: 'arch-5', text: 'API-first design for web, mobile, and third-party integrations' },
    { _id: 'arch-6', text: 'Audit trails, activity logs, and compliance-ready reporting' },
  ],
  engagementModels: [
    { _id: 'eng-1', title: 'MVP Launch', timeline: '8-12 weeks', fit: 'For startups validating product-market fit quickly' },
    { _id: 'eng-2', title: 'Growth Build', timeline: '3-6 months', fit: 'For scaling teams needing strong modules and integrations' },
    { _id: 'eng-3', title: 'Enterprise Track', timeline: '6+ months', fit: 'For complex workflows, governance, and high-scale rollout' },
  ],
  projects: [
    {
      _id: 'proj-1',
      name: 'RetailOps Cloud Suite',
      category: 'Inventory + POS + Procurement SaaS',
      summary: 'Unified platform for stock planning, branch POS sync, supplier workflows, and executive dashboards.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/retailops-saas',
    },
    {
      _id: 'proj-2',
      name: 'ClinicFlow 360',
      category: 'Healthcare workflow software',
      summary: 'Patient queue, consultation, billing, pharmacy, and follow-up automation for multi-branch clinics.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/clinicflow-platform',
    },
    {
      _id: 'proj-3',
      name: 'GovService Portal',
      category: 'Citizen service custom platform',
      summary: 'Digital application, tracking, and service desk management with role-based authority approvals.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/govservice-portal',
    },
  ],
  projectDemoVideos: [
    { _id: 'video-1', title: 'SaaS Product Dashboard Demo', embedUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
    { _id: 'video-2', title: 'Custom Workflow Automation Demo', embedUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
  ],
  saasFaqs: [
    {
      _id: 'faq-1',
      q: 'Can you modernize our existing legacy software into SaaS?',
      a: 'Yes. We audit your current system, define migration phases, preserve critical data, and rebuild modules in a scalable SaaS architecture.',
    },
    {
      _id: 'faq-2',
      q: 'How do you ensure security for custom SaaS platforms?',
      a: 'We implement role-based authorization, secure API standards, activity logs, backup strategy, and environment-specific hardening controls.',
    },
    {
      _id: 'faq-3',
      q: 'Do you provide post-launch support and feature evolution?',
      a: 'Absolutely. We offer structured support, performance monitoring, and roadmap-driven feature releases based on user feedback and business goals.',
    },
  ],
}

function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v7h-7" />
      <path d="M3 10V3h7" />
      <path d="M3 21l8-8" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.49.75 11.77c0 5.02 3.26 9.27 7.78 10.78.57.1.78-.25.78-.56 0-.28-.01-1.2-.02-2.18-3.16.69-3.82-1.34-3.82-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.52-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.05 0 0 .95-.3 3.11 1.16a10.9 10.9 0 0 1 5.66 0c2.15-1.46 3.1-1.16 3.1-1.16.63 1.59.24 2.76.12 3.05.73.79 1.17 1.8 1.17 3.04 0 4.37-2.66 5.33-5.19 5.61.41.35.77 1.03.77 2.09 0 1.51-.01 2.72-.01 3.09 0 .31.21.67.79.56 4.51-1.51 7.76-5.76 7.76-10.78C23.25 5.49 18.27.5 12 .5Z" />
    </svg>
  )
}

export default function CustomSaaSPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/custom-saas-page`)
        if (!response.ok) return
        const data = await response.json()
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          deliveryTracks: Array.isArray(data.deliveryTracks) ? data.deliveryTracks : DEFAULT_PAGE_DATA.deliveryTracks,
          buildFlow: Array.isArray(data.buildFlow) ? data.buildFlow : DEFAULT_PAGE_DATA.buildFlow,
          architectureHighlights: Array.isArray(data.architectureHighlights) ? data.architectureHighlights : DEFAULT_PAGE_DATA.architectureHighlights,
          engagementModels: Array.isArray(data.engagementModels) ? data.engagementModels : DEFAULT_PAGE_DATA.engagementModels,
          projects: Array.isArray(data.projects) ? data.projects : DEFAULT_PAGE_DATA.projects,
          projectDemoVideos: Array.isArray(data.projectDemoVideos) ? data.projectDemoVideos : DEFAULT_PAGE_DATA.projectDemoVideos,
          saasFaqs: Array.isArray(data.saasFaqs) ? data.saasFaqs : DEFAULT_PAGE_DATA.saasFaqs,
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
          className="h-[245px] w-full bg-cover bg-center sm:h-[290px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,210,255,0.25),transparent_40%),linear-gradient(120deg,rgba(0,11,30,0.92),rgba(0,11,30,0.62),rgba(0,11,30,0.35))]" />
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
              <Link to="/custom-saas-platform-development" className="hover:text-[#00d2ff]">{pageData.breadcrumbTitle}</Link>
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
          {pageData.deliveryTracks.map((item, index) => (
            <ScrollReveal key={item._id || item.title} delay={index * 0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-5">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
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

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#000b1e]/58 p-6 sm:p-8">
          <h3 className="text-2xl font-bold">{pageData.workingProcessTitle}</h3>
          <p className="mt-2 text-sm text-white/78">
            {pageData.workingProcessDescription}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageData.buildFlow.map((step) => (
              <div key={step._id || step.title} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                <p className="text-xs font-bold tracking-[0.18em] text-[#00d2ff]">{step.stage}</p>
                <h4 className="mt-1 text-base font-bold">{step.title}</h4>
                <p className="mt-2 text-sm text-white/75">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.architectureTitle}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {pageData.architectureHighlights.map((item) => (
                <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/32 px-3 py-2 text-sm text-white/82">
                  {item.text}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#000b1e]/60 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.engagementTitle}</h3>
            <div className="mt-4 space-y-3">
              {pageData.engagementModels.map((model) => (
                <div key={model._id || model.title} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold">{model.title}</h4>
                    <span className="rounded-full bg-[#00d2ff]/12 px-2.5 py-1 text-xs font-semibold text-[#8feeff]">{model.timeline}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/78">{model.fit}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.95),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.showcaseTitle}</h3>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.showcaseBadge}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {pageData.projects.map((project) => (
              <article key={project._id || project.name} className="rounded-xl border border-white/10 bg-[#021427]/60 p-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-40 w-full rounded-lg border border-white/10 object-cover"
                />
                <p className="text-xs uppercase tracking-[0.14em] text-[#00d2ff]">{project.category}</p>
                <h4 className="mt-1 text-lg font-bold">{project.name}</h4>
                <p className="mt-2 text-sm text-white/78">{project.summary}</p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 hover:border-[#00d2ff]/60 hover:text-[#00d2ff]"
                  >
                    <LiveIcon />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 hover:border-[#00d2ff]/60 hover:text-[#00d2ff]"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(2,20,39,0.9),rgba(10,49,70,0.45))] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.videoDemoTitle}</h3>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.videoDemoBadge}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {pageData.projectDemoVideos.map((video) => (
              <div key={video._id || video.title} className="overflow-hidden rounded-xl border border-white/10 bg-[#021427]/60">
                <p className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8be6ff]">
                  {video.title}
                </p>
                <iframe
                  className="h-64 w-full"
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[#021427]/70 p-6 sm:p-8">
          <h3 className="text-2xl font-bold sm:text-3xl">{pageData.faqTitle}</h3>
          <div className="mt-4 space-y-3">
            {pageData.saasFaqs.map((faq) => (
              <article key={faq._id || faq.q} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                <p className="text-sm font-semibold">{faq.q}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{faq.a}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

