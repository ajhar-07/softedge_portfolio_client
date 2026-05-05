import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/website-development'

const websiteData = {
  heroImage:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2200&q=80',
  eyebrow: 'Creative Web Studio',
  title: 'Website Design & Development',
  subtitle:
    'We craft brand-first, conversion-ready websites with modern engineering, clean architecture, and measurable growth outcomes.',
  introPoints: [
    'SEO-friendly architecture with semantic markup and clean URL patterns',
    'Responsive UI across desktop, tablet, and mobile with accessibility-first layout',
    'Fast-loading pages with image optimization, caching strategy, and code splitting',
    'Analytics-ready deployment so you can track leads, clicks, and conversion funnels',
  ],
  quickLinks: [
    { label: 'Website Design & Development', to: PAGE_PATH },
    { label: 'Landing Page Design', to: '/services' },
    { label: 'E-commerce & News Portal', to: '/services' },
    { label: 'Domain & Hosting', to: '/services' },
  ],
  designPillars: [
    { name: 'Visual Identity', detail: 'Brand-driven UI system, typography, spacing rhythm, and interaction language.' },
    { name: 'User Journey', detail: 'Clear content hierarchy, CTA placement, and frictionless conversion paths.' },
    { name: 'Engineering Quality', detail: 'Reusable components, clean code, and scalable deployment strategy.' },
  ],
  deliveryTracks: [
    { track: 'Track 01', title: 'Discovery & Wireframe', text: 'Audience map, goal architecture, and low-fidelity blueprint.' },
    { track: 'Track 02', title: 'UI Design & Prototype', text: 'High-fidelity visual system with animated click-through prototypes.' },
    { track: 'Track 03', title: 'Development Sprint', text: 'Responsive frontend, CMS/API integration, and performance tuning.' },
    { track: 'Track 04', title: 'Launch & Optimization', text: 'SEO baseline, analytics setup, and post-launch conversion iteration.' },
  ],
  packageGrid: [
    { type: 'Starter Site', scope: 'Corporate profile', eta: '7-10 days', price: 'From $250' },
    { type: 'Growth Site', scope: 'Dynamic CMS pages', eta: '2-3 weeks', price: 'From $700' },
    { type: 'Commerce Site', scope: 'Product + checkout', eta: '3-5 weeks', price: 'From $1200' },
    { type: 'Custom Build', scope: 'Complex portal/SaaS', eta: 'By scope', price: 'Custom quote' },
  ],
  serviceDetails: [
    {
      title: 'UI/UX Strategy',
      text: 'From content hierarchy to wireframe and clickable prototypes, we validate user flow before development starts.',
    },
    {
      title: 'Custom Frontend Development',
      text: 'Pixel-perfect components, motion interactions, reusable sections, and scalable code structure for future growth.',
    },
    {
      title: 'Backend & CMS Integration',
      text: 'Dynamic content control, API integration, admin-ready setup, and secure data handling for production usage.',
    },
    {
      title: 'Launch & Growth Support',
      text: 'Deployment, QA, SEO baseline, analytics setup, and iterative improvements after launch.',
    },
  ],
  projectShowcase: [
    {
      name: 'SoftEdge Corporate Website',
      category: 'Corporate / IT Services',
      summary: 'Modern company profile website with service funnels, team page, and lead generation flow.',
      liveLink: 'https://example.com/softedge-corporate',
      githubLink: 'https://github.com/example/softedge-corporate',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      tech: ['React', 'Tailwind', 'Node.js'],
    },
    {
      name: 'NovaShop E-commerce',
      category: 'E-commerce',
      summary: 'Product catalog, cart/checkout journey, payment integration, and order management dashboard.',
      liveLink: 'https://example.com/novashop',
      githubLink: 'https://github.com/example/novashop',
      image:
        'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      tech: ['React', 'Express', 'MongoDB'],
    },
    {
      name: 'DailyNews Portal',
      category: 'News & Media',
      summary: 'High-content publishing portal with category-based routing, trending widgets, and admin posting tools.',
      liveLink: 'https://example.com/dailynews',
      githubLink: 'https://github.com/example/dailynews',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      tech: ['Next.js', 'API', 'Cloud CDN'],
    },
  ],
  stack: ['React', 'Node.js', 'MongoDB', 'WordPress', 'Tailwind CSS', 'Cloud Hosting'],
  stats: [
    { value: '120+', label: 'Web projects delivered' },
    { value: '96%', label: 'Client satisfaction rate' },
    { value: '90+', label: 'Lighthouse performance target' },
  ],
  faqs: [
    {
      q: 'Can you redesign our existing website without losing SEO?',
      a: 'Yes. We preserve URL strategy, set redirects, and apply technical SEO checks during migration.',
    },
    {
      q: 'Will the site be editable by our internal team?',
      a: 'Absolutely. We provide CMS controls and training so your team can update content independently.',
    },
    {
      q: 'Do you offer maintenance after launch?',
      a: 'Yes. We provide monthly maintenance plans including updates, backups, and performance monitoring.',
    },
  ],
}

function mergeWebsiteDevelopmentPageFromApi(data) {
  if (!data || typeof data !== 'object') return websiteData
  return {
    ...websiteData,
    ...data,
    introPoints: data.introPoints?.length ? data.introPoints : websiteData.introPoints,
    quickLinks: data.quickLinks?.length ? data.quickLinks : websiteData.quickLinks,
    designPillars: data.designPillars?.length ? data.designPillars : websiteData.designPillars,
    deliveryTracks: data.deliveryTracks?.length ? data.deliveryTracks : websiteData.deliveryTracks,
    packageGrid: data.packageGrid?.length ? data.packageGrid : websiteData.packageGrid,
    serviceDetails: data.serviceDetails?.length ? data.serviceDetails : websiteData.serviceDetails,
    projectShowcase: data.projectShowcase?.length ? data.projectShowcase : websiteData.projectShowcase,
    stack: data.stack?.length ? data.stack : websiteData.stack,
    stats: data.stats?.length ? data.stats : websiteData.stats,
    faqs: data.faqs?.length ? data.faqs : websiteData.faqs,
  }
}

export default function WebsiteDevelopmentPage() {
  const [liveData, setLiveData] = useState(websiteData)
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/website-development-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLiveData(mergeWebsiteDevelopmentPageFromApi(data))
          setFetchError('')
        } else {
          setLiveData(websiteData)
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_error) {
        setLiveData(websiteData)
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
        <div className="h-[280px] w-full bg-cover bg-center sm:h-[360px]" style={{ backgroundImage: `url(${liveData.heroImage})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,210,255,0.25)_0%,transparent_36%),linear-gradient(112deg,rgba(0,11,30,0.94)_22%,rgba(8,34,53,0.78)_58%,rgba(0,11,30,0.55)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal variant="slide-right" duration={0.5}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-[#0a3146]/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {liveData.eyebrow}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{liveData.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{liveData.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {liveData.quickLinks.map((item) => (
            <Link
              key={`${item.label}-${item.to}`}
              to={item.to}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                item.to === PAGE_PATH
                  ? 'border-[#00d2ff] bg-[#00d2ff] text-[#000b1e]'
                  : 'border-white/15 bg-[#0a3146]/30 text-white/85 hover:border-[#00d2ff]/45 hover:text-[#00d2ff]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.04} className="mb-10 rounded-2xl border border-[#00d2ff]/18 bg-[#0a3146]/28 p-5 sm:p-6">
          <h2 className="text-xl font-black text-white sm:text-2xl">What You Get</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {liveData.introPoints.map((point) => (
              <li key={point._id || point.text || point} className="flex gap-3 rounded-xl border border-white/10 bg-[#0a3146]/30 px-4 py-3 text-sm text-white/82">
                <span className="mt-[2px] text-[#00d2ff]">◆</span>
                <span>{typeof point === 'string' ? point : point.text}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-[#00d2ff]/20 bg-[linear-gradient(160deg,rgba(8,36,54,0.78),rgba(2,15,30,0.94))] p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Design Pillars</h2>
            <div className="mt-6 space-y-4">
              {liveData.designPillars.map((pillar) => (
                <article key={pillar._id || pillar.name} className="rounded-xl border border-white/10 bg-[#0a3146]/28 p-4">
                  <p className="text-lg font-bold text-[#00d2ff]">{pillar.name}</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">{pillar.detail}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="rounded-[2rem] border border-white/10 bg-[#0a3146]/24 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Tech Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {liveData.stack.map((item) => (
                <span key={item._id || item.text || item} className="rounded-lg border border-[#00d2ff]/25 bg-[#00172b] px-3 py-2 text-sm font-semibold text-white/90">
                  {typeof item === 'string' ? item : item.text}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {liveData.stats.map((stat) => (
                <div key={stat._id || stat.label} className="rounded-xl border border-white/10 bg-[#0a3146]/34 p-4 text-center">
                  <p className="text-2xl font-black text-[#00d2ff]">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/62">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.09} className="mt-14">
          <h2 className="text-2xl font-black text-white">Detailed Service Scope</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {liveData.serviceDetails.map((detail) => (
              <article key={detail._id || detail.title} className="rounded-2xl border border-white/10 bg-[#0a3146]/30 p-5">
                <p className="text-lg font-bold text-[#00d2ff]">{detail.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{detail.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <h2 className="text-2xl font-black text-white">Project Delivery Tracks</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {liveData.deliveryTracks.map((item) => (
              <article key={item._id || item.track} className="rounded-2xl border border-white/10 bg-[#0a3146]/30 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.track}</p>
                <p className="mt-2 text-lg font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/74">{item.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-14">
          <h2 className="text-2xl font-black text-white">Package Overview</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {liveData.packageGrid.map((pkg) => (
              <article key={pkg._id || pkg.type} className="rounded-2xl border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(12,40,57,0.86),rgba(6,18,34,0.96))] p-5">
                <p className="text-lg font-bold text-white">{pkg.type}</p>
                <p className="mt-3 text-sm text-white/80">
                  <span className="text-[#00d2ff]">Scope:</span> {pkg.scope}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  <span className="text-[#00d2ff]">ETA:</span> {pkg.eta}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  <span className="text-[#00d2ff]">Pricing:</span> {pkg.price}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-14">
          <h2 className="text-2xl font-black text-white">Project Showcase</h2>
          <p className="mt-2 text-sm text-white/72">
            You can replace these demo entries with your real projects and keep live/GitHub links here.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {liveData.projectShowcase.map((project) => (
              <article
                key={project._id || project.name}
                className="rounded-2xl border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(12,40,57,0.86),rgba(6,18,34,0.96))] p-5"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={project.image}
                    alt={`${project.name} website preview`}
                    className="h-40 w-full object-cover transition duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00d2ff]">{project.category}</p>
                <h3 className="mt-2 text-lg font-black text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.tech || []).map((tech) => (
                    <span key={tech} className="rounded-md border border-white/15 bg-[#0a3146]/35 px-2.5 py-1 text-[11px] font-semibold text-white/85">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#00d2ff] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#000b1e] transition hover:bg-[#38ddff]"
                  >
                    Live Link
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#00d2ff]/55 hover:text-[#00d2ff]"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.14} className="mt-14">
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {liveData.faqs.map((item) => (
              <article key={item._id || item.q} className="rounded-2xl border border-white/10 bg-[#0a3146]/35 p-5">
                <p className="text-base font-bold text-[#00d2ff]">{item.q}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{item.a}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
