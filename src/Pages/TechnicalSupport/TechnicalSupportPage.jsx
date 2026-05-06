import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage: 'https://images.unsplash.com/photo-1516110833967-5785e5f8c3ff?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Support Operations Center',
  heroTitle: '24/7 Technical Support & AMC',
  breadcrumbTitle: 'Technical Support',
  introTitle: 'Reliable Support To Keep Your Business Running Every Hour',
  introDescription:
    'SoftEdge provides proactive and reactive support under a unified AMC model. From incident response to preventive maintenance, our team ensures your technology stack remains secure, optimized, and available with predictable service quality.',
  coverageTitle: 'AMC Coverage Scope',
  matrixTitle: 'Incident Response Matrix',
  packagesTitle: 'AMC Packages',
  toolsTitle: 'Support Tools & Monitoring Stack',
  workflowTitle: 'Support Handling Workflow',
  videoTitle: 'Support Demo & Service Brief',
  videoBadge: '24/7 Coverage',
  faqTitle: 'Support FAQ',
  ctaTitle: 'Need Dedicated AMC For Your Organization?',
  ctaDescription:
    'Share your current infrastructure and support challenges. We will propose a practical AMC model with response SLA, preventive maintenance scope, and cost-effective support roadmap.',
  ctaPrimaryText: 'Request AMC Proposal',
  ctaPrimaryLink: '/contact',
  ctaSecondaryText: 'Explore More Services',
  ctaSecondaryLink: '/services',
  supportPillars: [
    {
      _id: 'pillar-1',
      title: '24/7 Helpdesk Operations',
      description:
        'Round-the-clock support via ticket, phone, WhatsApp, and remote session to resolve incidents quickly and keep business continuity stable.',
      points: ['Priority-based ticket routing', 'SLA monitoring dashboard', 'Escalation matrix with response targets'],
    },
    {
      _id: 'pillar-2',
      title: 'AMC Preventive Maintenance',
      description:
        'Annual maintenance contract coverage for servers, networks, workstations, and business applications with scheduled checks.',
      points: ['Monthly health audit', 'Patch and antivirus management', 'Performance tuning and system cleanup'],
    },
    {
      _id: 'pillar-3',
      title: 'Onsite + Remote Hybrid Support',
      description:
        'Critical issues are handled onsite while routine issues are solved remotely to reduce downtime and optimize support cost.',
      points: ['Rapid onsite dispatch', 'Secure remote troubleshooting', 'Detailed service reports per visit'],
    },
  ],
  amcCoverage: [
    { _id: 'coverage-1', text: 'Desktop/Laptop troubleshooting' },
    { _id: 'coverage-2', text: 'Server uptime and backup check' },
    { _id: 'coverage-3', text: 'LAN/WiFi/switch/router maintenance' },
    { _id: 'coverage-4', text: 'Printer and peripheral support' },
    { _id: 'coverage-5', text: 'Application support coordination' },
    { _id: 'coverage-6', text: 'License and renewal reminders' },
  ],
  responseMatrix: [
    { _id: 'matrix-1', severity: 'Critical', time: '15-30 mins', window: '24/7', example: 'Server down, billing stop, network outage' },
    { _id: 'matrix-2', severity: 'High', time: '1 hour', window: 'Business + extended', example: 'Major module error, branch connectivity issue' },
    { _id: 'matrix-3', severity: 'Medium', time: '2-4 hours', window: 'Business hours', example: 'User-level software conflict' },
    { _id: 'matrix-4', severity: 'Low', time: 'Within 1 day', window: 'Business hours', example: 'Configuration request, optimization task' },
  ],
  supportVideos: [
    { _id: 'video-1', title: 'Remote Support Workflow', url: 'https://www.youtube.com/embed/ysz5S6PUM-U' },
    { _id: 'video-2', title: 'AMC Service Checklist Overview', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ],
  amcPlans: [
    { _id: 'plan-1', name: 'Essential AMC', fit: 'Small office / startup', features: ['8x6 support window', 'Monthly preventive visit', 'Remote troubleshooting'] },
    { _id: 'plan-2', name: 'Business AMC', fit: 'Growing multi-team company', features: ['Extended support hours', 'Priority ticket queue', 'Quarterly security hardening'] },
    { _id: 'plan-3', name: 'Enterprise AMC', fit: 'High-availability operations', features: ['24/7 critical incident support', 'Dedicated support manager', 'Custom SLA and governance review'] },
  ],
  toolStack: [
    { _id: 'tool-1', text: 'Ticketing + SLA tracking' },
    { _id: 'tool-2', text: 'Remote monitoring dashboard' },
    { _id: 'tool-3', text: 'Endpoint protection + patching' },
    { _id: 'tool-4', text: 'Backup health monitoring' },
    { _id: 'tool-5', text: 'Asset inventory management' },
    { _id: 'tool-6', text: 'Audit-ready service reports' },
  ],
  workingFlow: [
    { _id: 'flow-1', step: 'Step 01', title: 'Issue Logging', text: 'All incidents are logged with category, severity, and impact details.' },
    { _id: 'flow-2', step: 'Step 02', title: 'Diagnosis & Assignment', text: 'Ticket is routed to the right engineer with proper response priority.' },
    { _id: 'flow-3', step: 'Step 03', title: 'Fix & Validation', text: 'Root cause is fixed, service restored, and validation done with your team.' },
    { _id: 'flow-4', step: 'Step 04', title: 'RCA & Prevention', text: 'Post-resolution notes and preventive action recommendations are shared.' },
  ],
  supportFaqs: [
    {
      _id: 'faq-1',
      question: 'Do you provide both onsite and remote support?',
      answer: 'Yes. We use hybrid support where critical tasks can be handled onsite and routine tasks are resolved remotely.',
    },
    {
      _id: 'faq-2',
      question: 'Can AMC include third-party software support?',
      answer: 'Yes. We coordinate with your software vendors and assist in application-level issue escalation and follow-up.',
    },
    {
      _id: 'faq-3',
      question: 'How do you report completed support work?',
      answer: 'Each task is documented with action summary, resolution note, and recommendation in a service report.',
    },
  ],
}

export default function TechnicalSupportPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let isMounted = true
    async function loadPageData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/technical-support-page`)
        if (!response.ok) throw new Error('Request failed')
        const data = await response.json()
        if (!isMounted) return
        setPageData({ ...DEFAULT_PAGE_DATA, ...data })
      } catch (error) {
        if (isMounted) setPageData(DEFAULT_PAGE_DATA)
      }
    }
    loadPageData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[250px] w-full bg-cover bg-center sm:h-[310px]"
          style={{
            backgroundImage: `url(${pageData.heroImage || DEFAULT_PAGE_DATA.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,11,30,0.92),rgba(0,11,30,0.55),rgba(0,210,255,0.16)),radial-gradient(circle_at_85%_20%,rgba(0,210,255,0.2),transparent_35%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right">
            <p className="inline-flex rounded-sm border border-[#00d2ff]/30 bg-[#0f2f46]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#99ebff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">{pageData.heroTitle}</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="hover:text-[#00d2ff]">Home</Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/technical-support-amc" className="hover:text-[#00d2ff]">{pageData.breadcrumbTitle}</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(2,20,36,0.92),rgba(8,46,67,0.76))] p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">{pageData.introTitle}</h2>
          <p className="mt-4 text-base leading-8 text-white/80">
            {pageData.introDescription}
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(pageData.supportPillars || []).map((pillar, index) => (
            <ScrollReveal key={pillar._id || pillar.title} delay={index * 0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-5">
              <h3 className="text-xl font-bold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{pillar.description}</p>
              <ul className="mt-4 space-y-2">
                {(pillar.points || []).map((point) => (
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
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#000b1e]/60 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.coverageTitle}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {(pageData.amcCoverage || []).map((item) => (
                <li key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/25 px-3 py-2 text-sm text-white/85">
                  {item.text}
                </li>
              ))}
            </ul>
            <img
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80"
              alt="Technical support team in monitoring room"
              className="mt-5 h-48 w-full rounded-xl border border-white/10 object-cover"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.matrixTitle}</h3>
            <div className="mt-4 space-y-3">
              {(pageData.responseMatrix || []).map((item) => (
                <div key={item._id || item.severity} className="rounded-xl border border-white/10 bg-[#0b2438]/55 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8de8ff]">{item.severity}</p>
                    <p className="text-xs text-white/70">{item.time} response</p>
                  </div>
                  <p className="mt-1 text-xs text-white/60">{item.window}</p>
                  <p className="mt-2 text-sm text-white/80">{item.example}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/72 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.packagesTitle}</h3>
            <div className="mt-4 grid gap-3">
              {(pageData.amcPlans || []).map((plan) => (
                <div key={plan._id || plan.name} className="rounded-xl border border-white/10 bg-[#08283f]/45 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-white">{plan.name}</h4>
                    <span className="rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-2.5 py-1 text-[11px] text-[#8de8ff]">
                      {plan.fit}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {(plan.features || []).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-white/85">
                        <span className="mt-1 text-[#00d2ff]">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#000b1e]/63 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.toolsTitle}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(pageData.toolStack || []).map((tool) => (
                <div key={tool._id || tool.text} className="rounded-lg border border-white/10 bg-[#0a3146]/25 px-3 py-2 text-sm text-white/85">
                  {tool.text}
                </div>
              ))}
            </div>
            <h4 className="mt-6 text-lg font-bold">{pageData.workflowTitle}</h4>
            <div className="mt-3 space-y-2.5">
              {(pageData.workingFlow || []).map((item) => (
                <div key={item._id || item.step} className="rounded-lg border border-white/10 bg-[#0b2438]/55 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8de8ff]">{item.step}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/75">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.96),rgba(8,40,58,0.82))] p-6 sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.videoTitle}</h3>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.videoBadge}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {(pageData.supportVideos || []).map((video) => (
              <div key={video._id || video.title} className="overflow-hidden rounded-xl border border-white/10 bg-[#021427]/60">
                <p className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8be6ff]">
                  {video.title}
                </p>
                <iframe
                  className="h-64 w-full"
                  src={video.url}
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

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/72 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.faqTitle}</h3>
            <div className="mt-4 space-y-3">
              {(pageData.supportFaqs || []).map((item) => (
                <div key={item._id || item.question} className="rounded-xl border border-white/10 bg-[#0a3146]/25 p-4">
                  <p className="text-sm font-semibold text-white">{item.question}</p>
                  <p className="mt-2 text-sm leading-7 text-white/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.96),rgba(8,40,58,0.82))] p-6 sm:p-8">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.ctaTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
              {pageData.ctaDescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to={pageData.ctaPrimaryLink || '/contact'}
                className="rounded-lg bg-[#00d2ff] px-5 py-2.5 text-sm font-bold text-[#001523] transition hover:bg-[#42ddff]"
              >
                {pageData.ctaPrimaryText}
              </Link>
              <Link
                to={pageData.ctaSecondaryLink || '/services'}
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff]"
              >
                {pageData.ctaSecondaryText}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

