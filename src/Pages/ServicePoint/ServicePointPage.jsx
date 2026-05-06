import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'E-Governance Platform',
  heroTitle: 'Service Point (Municipality / Union)',
  breadcrumbTitle: 'Service Point',
  overviewTitle: 'Smart Public Service Delivery Hub',
  overviewDescription:
    'Service Point platform enables municipality and union offices to deliver faster, transparent, and citizen-friendly digital services. From registration and billing to grievance handling and social program support, every workflow becomes trackable and measurable.',
  overviewDescriptionBottom:
    'This solution combines front-desk service modules, administration tools, finance operations, and analytics dashboard so leadership can monitor performance and improve local governance quality.',
  serviceModulesTitle: 'Core Service Modules',
  roadmapTitle: 'Implementation Roadmap',
  governanceTitle: 'Governance Capability Stack',
  videoSectionTitle: 'Live Demo & Explainer Videos',
  videoSectionSubtitle:
    'Municipality and union offices can use training and rollout videos for staff onboarding, citizen awareness, and process adoption.',
  videoTagText: 'Field-ready onboarding',
  galleryTitle: 'Field Gallery',
  proposalTitle: 'Need a Custom Rollout Plan?',
  proposalDescription:
    'Get a module-wise proposal and deployment timeline for your municipality or union office based on your local service priorities.',
  proposalButtonText: 'Request Service Point Proposal',
  proposalButtonLink: '/contact-us',
  serviceModules: [
    {
      _id: 'mod-1',
      title: 'Citizen Service Desk',
      description:
        'Birth certificate, death registration, trade license support, and application tracking from one digital counter.',
      points: ['Token-based queue management', 'SMS status notifications', 'Digital record and print-ready documents'],
    },
    {
      _id: 'mod-2',
      title: 'Tax, Billing & Collection',
      description:
        'Holding tax, water bill, waste fee, market fee, and service charge collection with transparent transaction logs.',
      points: ['Demand register automation', 'Due list and penalty setup', 'Daily collection reconciliation'],
    },
    {
      _id: 'mod-3',
      title: 'Social Safety Net Distribution',
      description:
        'Beneficiary profile management, fund disbursement monitoring, and verification workflow to reduce leakage.',
      points: ['Ward-level beneficiary database', 'Eligibility verification checklist', 'Program-wise performance reports'],
    },
  ],
  governancePillars: [
    { _id: 'gov-1', text: 'Citizen-first service delivery model' },
    { _id: 'gov-2', text: 'Digital records with role-based access' },
    { _id: 'gov-3', text: 'Audit trail and accountability tracking' },
    { _id: 'gov-4', text: 'Village court and complaint monitoring' },
    { _id: 'gov-5', text: 'Budget, finance, and voucher reporting' },
    { _id: 'gov-6', text: 'Land, certificate, and notice workflow' },
    { _id: 'gov-7', text: 'Mobile-friendly field operation support' },
    { _id: 'gov-8', text: 'Data backup and disaster recovery readiness' },
  ],
  implementationPlan: [
    { _id: 'plan-1', phase: 'Phase 1', title: 'Assessment & Digitization', text: 'Service mapping, form standardization, and citizen process redesign.' },
    { _id: 'plan-2', phase: 'Phase 2', title: 'System Deployment', text: 'Module setup, user role creation, and branch-wise operational onboarding.' },
    { _id: 'plan-3', phase: 'Phase 3', title: 'Training & Pilot Run', text: 'Hands-on training for staff with supervised pilot operation.' },
    { _id: 'plan-4', phase: 'Phase 4', title: 'Scale & Monitoring', text: 'Live dashboard usage, monthly review, and policy-aligned optimization.' },
  ],
  videoItems: [
    { _id: 'video-1', title: 'Citizen Service Flow', embedUrl: 'https://www.youtube.com/embed/2ePf9rue1Ao' },
    { _id: 'video-2', title: 'Admin Operation Walkthrough', embedUrl: 'https://www.youtube.com/embed/8aGhZQkoFbQ' },
  ],
  galleryItems: [
    {
      _id: 'gallery-1',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1400&q=80',
      alt: 'Team planning public service modernization',
    },
    {
      _id: 'gallery-2',
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80',
      alt: 'Digital dashboard for public administration',
    },
  ],
}

export default function ServicePointPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/service-point-page`)
        if (!response.ok) {
          return
        }
        const data = await response.json()
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          serviceModules: Array.isArray(data.serviceModules) ? data.serviceModules : DEFAULT_PAGE_DATA.serviceModules,
          governancePillars: Array.isArray(data.governancePillars) ? data.governancePillars : DEFAULT_PAGE_DATA.governancePillars,
          implementationPlan: Array.isArray(data.implementationPlan) ? data.implementationPlan : DEFAULT_PAGE_DATA.implementationPlan,
          videoItems: Array.isArray(data.videoItems) ? data.videoItems : DEFAULT_PAGE_DATA.videoItems,
          galleryItems: Array.isArray(data.galleryItems) ? data.galleryItems : DEFAULT_PAGE_DATA.galleryItems,
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
          className="h-[240px] w-full bg-cover bg-center sm:h-[290px]"
          style={{
            backgroundImage:
              `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,11,30,0.92),rgba(0,11,30,0.6),rgba(0,210,255,0.14))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right">
            <p className="inline-flex rounded-sm bg-[#1f4358]/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">Home</Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/service-point-municipality-union" className="transition-colors hover:text-[#00d2ff]">{pageData.breadcrumbTitle}</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{pageData.overviewTitle}</h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {pageData.overviewDescription}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {pageData.overviewDescriptionBottom}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6">
            <img
              src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80"
              alt="Citizen service support desk"
              className="h-56 w-full rounded-xl object-cover"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#00d2ff]">Citizen-Centric Operations</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <h3 className="mb-4 text-2xl font-bold text-white">{pageData.serviceModulesTitle}</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.serviceModules.map((module, index) => (
            <ScrollReveal key={module._id || module.title} variant="fade-up" delay={index * 0.08} className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(0,11,30,0.82),rgba(7,36,54,0.72))] p-5">
              <h3 className="text-xl font-bold">{module.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{module.description}</p>
              <ul className="mt-4 space-y-2">
                {module.points.map((point) => (
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
          <h3 className="text-2xl font-bold">{pageData.roadmapTitle}</h3>
          <div className="mt-4 space-y-3">
            {pageData.implementationPlan.map((step) => (
              <div key={step._id || step.title} className="rounded-lg border border-white/10 bg-[#08253b]/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{step.phase}</p>
                <h4 className="mt-1 text-lg font-bold">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6 sm:p-8">
          <h3 className="text-2xl font-bold">{pageData.governanceTitle}</h3>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pageData.governancePillars.map((item) => (
              <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/38 px-3 py-2 text-sm text-white/85">
                {item.text}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/35 bg-[linear-gradient(145deg,rgba(0,11,30,0.96),rgba(7,31,46,0.88))] p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">Dedicated Video Section</p>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">{pageData.videoSectionTitle}</h3>
            </div>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.videoTagText}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-white/80">
            {pageData.videoSectionSubtitle}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {pageData.videoItems.map((video) => (
              <div key={video._id || video.title} className="group overflow-hidden rounded-2xl border border-white/12 bg-[#021427]/60 shadow-[0_12px_34px_-18px_rgba(0,0,0,0.7)]">
                <div className="border-b border-white/10 px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8be6ff]">{video.title}</p>
                </div>
                <iframe
                  className="h-56 w-full transition duration-300 group-hover:scale-[1.01]"
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
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(0,11,30,0.92),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(5,25,40,0.75),rgba(4,17,31,0.82))] p-4 sm:p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">{pageData.galleryTitle}</p>
              {pageData.galleryItems.map((item, index) => (
                <img
                  key={item._id || item.image || index}
                  src={item.image}
                  alt={item.alt}
                  className="mt-3 h-40 w-full rounded-xl border border-white/10 object-cover"
                />
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a3146]/30 p-4 sm:p-6">
              <h3 className="text-2xl font-bold">{pageData.proposalTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {pageData.proposalDescription}
              </p>
              <Link
                to={pageData.proposalButtonLink || '/contact-us'}
                className="mt-4 inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-7 py-2.5 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                {pageData.proposalButtonText}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

