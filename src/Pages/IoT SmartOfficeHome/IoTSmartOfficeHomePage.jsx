import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1581092921461-39b2f2f53a22?auto=format&fit=crop&w=2200&q=80',
  heroTitle: 'IoT Smart Office/Home + Smart Board/ICT Lab',
  breadcrumbTitle: 'IoT Smart Office/Home',
  sectionBadge: 'Next Generation Infrastructure',
  sectionTitle: 'Intelligent Spaces for Productivity, Learning, and Security',
  sectionDescription:
    'We build complete IoT ecosystems for offices, homes, educational institutes, and training centers. From smart board enabled classrooms to automated office floors, our solutions combine hardware, software, and cloud analytics to deliver measurable energy savings, better operational control, and safer environments.',
  deliverTitle: 'What We Deliver',
  roadmapTitle: 'Implementation Roadmap',
  ctaBadge: 'Ready To Upgrade',
  ctaTitle: 'Build a smarter office, home, and ICT learning ecosystem with SoftEdge.',
  ctaDescription:
    'We provide end-to-end planning, deployment, user training, and after-sales support so your smart setup is stable from day one.',
  ctaButtonText: 'Explore More Services',
  ctaButtonLink: '/services',
  featureCards: [
    {
      _id: 'f1',
      title: 'Smart Office Automation',
      description:
        'Lighting, AC, curtain, meeting room booking, and occupancy sensors are integrated into one intelligent control layer.',
      icon: '🏢',
    },
    {
      _id: 'f2',
      title: 'Smart Home Integration',
      description:
        'Voice-ready automation with remote app control, energy scheduling, and family safety alerts for modern connected homes.',
      icon: '🏠',
    },
    {
      _id: 'f3',
      title: 'Smart Board & ICT Lab Setup',
      description:
        'Interactive board deployment, classroom device management, and lab network optimization for training institutes and schools.',
      icon: '🧑‍🏫',
    },
  ],
  includedServices: [
    { _id: 's1', text: 'IoT device selection, installation and commissioning' },
    { _id: 's2', text: 'Sensor network design (temperature, motion, door, smoke, humidity)' },
    { _id: 's3', text: 'Central dashboard with role-based access control' },
    { _id: 's4', text: 'Smart board installation with teacher training support' },
    { _id: 's5', text: 'ICT lab desktop/network architecture and secure internet policy' },
    { _id: 's6', text: 'CCTV + biometric attendance integration with IoT trigger events' },
    { _id: 's7', text: 'Preventive maintenance and remote monitoring' },
    { _id: 's8', text: 'Custom automation rules and monthly performance reports' },
  ],
  solutionPhases: [
    {
      _id: 'p1',
      title: 'Discover',
      text: 'Site visit, requirement collection, and infrastructure audit to design a practical smart environment.',
    },
    {
      _id: 'p2',
      title: 'Design',
      text: 'Blueprint with device map, network zoning, security controls, and deployment milestones.',
    },
    {
      _id: 'p3',
      title: 'Deploy',
      text: 'Hardware installation, smart board calibration, ICT lab setup, and software integration.',
    },
    {
      _id: 'p4',
      title: 'Optimize',
      text: 'Usage analytics, preventive support, and automation tuning for long-term reliability.',
    },
  ],
}

export default function IoTSmartOfficeHomePage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let ignore = false

    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/iot-smart-office-home-page`)
        if (!response.ok) throw new Error('Failed to fetch IoT page data')
        const data = await response.json()
        if (ignore) return
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          featureCards: data.featureCards?.length ? data.featureCards : DEFAULT_PAGE_DATA.featureCards,
          includedServices: data.includedServices?.length
            ? data.includedServices
            : DEFAULT_PAGE_DATA.includedServices,
          solutionPhases: data.solutionPhases?.length ? data.solutionPhases : DEFAULT_PAGE_DATA.solutionPhases,
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
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/80 via-[#000b1e]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/iot-smart-office-home" className="transition-colors hover:text-[#00d2ff]">
                {pageData.breadcrumbTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <ScrollReveal variant="fade-up" className="rounded-2xl border border-white/10 bg-[#02182d]/70 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.sectionBadge}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {pageData.sectionTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-white/80">
            {pageData.sectionDescription}
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pageData.featureCards.map((item, index) => (
            <ScrollReveal
              key={item._id || item.title}
              variant="fade-up"
              delay={index * 0.08}
              className="group rounded-2xl border border-white/10 bg-[#000b1e]/45 p-5 shadow-[0_12px_34px_-14px_rgba(0,0,0,0.6)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#00d2ff]/40"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#00d2ff]/45 bg-[#00d2ff]/10 text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-14">
        <ScrollReveal variant="fade-up" className="rounded-2xl border border-white/10 bg-[#051e34]/70 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.deliverTitle}</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {pageData.includedServices.map((item) => (
              <div key={item._id || item.text} className="flex items-start gap-2 rounded-lg bg-[#0a3146]/45 px-3 py-2.5">
                <span className="mt-1 text-[#00d2ff]" aria-hidden>
                  ✓
                </span>
                <p className="text-sm leading-6 text-white/85">{item.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/50 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.roadmapTitle}</h3>
          <div className="mt-5 space-y-3">
            {pageData.solutionPhases.map((step, idx) => (
              <article key={step._id || step.title} className="rounded-lg border border-white/10 bg-[#08253b]/65 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">Phase {idx + 1}</p>
                <h4 className="mt-1 text-lg font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/80">{step.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.92),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">{pageData.ctaBadge}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                {pageData.ctaTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {pageData.ctaDescription}
              </p>
            </div>
            <Link
              to={pageData.ctaButtonLink || '/services'}
              className="inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
            >
              {pageData.ctaButtonText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
