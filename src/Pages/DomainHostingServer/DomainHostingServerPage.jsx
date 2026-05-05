import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const PAGE_PATH = '/domain-hosting-server-management'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80',
  badge: 'Domain + Hosting + Server Excellence',
  title: 'Domain, Hosting, Server Management & Support Packages',
  subtitle:
    'Build a reliable digital foundation with domain strategy, high-performance hosting, proactive server operations, and dedicated support packages designed for growing businesses.',
  quickLinks: [
    { label: 'Domain, hosting, server management & support packages', to: PAGE_PATH },
    { label: 'Website Design & Development', to: '/website-development' },
    { label: 'E-commerce & news portal', to: '/ecommerce-news-portal' },
    { label: 'Information Security', to: '/information-security' },
  ],
  domainServices: [
    {
      title: 'Domain Planning & Brand Protection',
      detail:
        'Primary domain selection, TLD strategy (.com/.net/.org/.bd), typo-domain protection, competitor conflict checks, and renewal risk prevention.',
    },
    {
      title: 'DNS Architecture & Delivery',
      detail:
        'Managed DNS zones, failover records, SPF/DKIM/DMARC setup, subdomain routing, and CDN-aware DNS tuning for speed and reliability.',
    },
    {
      title: 'Transfer, Renewal & Ownership Governance',
      detail:
        'Safe registrar transfer, lock/unlock control, WHOIS privacy, organization ownership cleanup, and domain lifecycle governance.',
    },
  ],
  hostingStacks: [
    {
      type: 'Managed Shared / Business Hosting',
      useCase: 'Startup websites, portfolios, and business landing pages with cost-efficient management.',
      features: ['SSL included', 'Daily backup', 'Email accounts', 'Control panel access'],
    },
    {
      type: 'VPS / Cloud Hosting',
      useCase: 'High-traffic websites and custom applications needing better resource isolation.',
      features: ['Dedicated resources', 'Root access', 'Scalable RAM/CPU', 'Firewall hardening'],
    },
    {
      type: 'Dedicated & Hybrid Infrastructure',
      useCase: 'Mission-critical platforms that require maximum control, custom networking, and compliance.',
      features: ['Private networking', 'Load balancing', 'Disaster planning', 'Advanced monitoring'],
    },
  ],
  serverOpsFlow: [
    {
      step: '01',
      heading: 'Assessment & Architecture',
      text: 'Audit traffic, compute profile, risk points, and target availability before final stack design.',
    },
    {
      step: '02',
      heading: 'Provisioning & Hardening',
      text: 'Secure OS baseline, patching, access policy setup, SSH hardening, and firewall rule enforcement.',
    },
    {
      step: '03',
      heading: 'Performance Optimization',
      text: 'Web server tuning, database optimization, cache policy setup, and page delivery acceleration.',
    },
    {
      step: '04',
      heading: 'Monitoring & Incident Response',
      text: '24/7 uptime checks, threshold alerts, incident playbooks, and recovery workflows.',
    },
  ],
  supportPackages: [
    {
      name: 'Essential Care',
      timeline: 'Monthly plan',
      features: ['Uptime monitoring', 'Security patch updates', 'Weekly backup verification', 'Email support'],
      price: 'From $49/mo',
    },
    {
      name: 'Growth Ops',
      timeline: 'Monthly plan',
      features: ['Everything in Essential', 'Performance optimization', 'Priority issue handling', 'DNS and SSL management'],
      price: 'From $119/mo',
    },
    {
      name: 'Enterprise Guard',
      timeline: 'Custom SLA',
      features: ['24/7 incident response', 'Dedicated engineer support', 'Advanced compliance reports', 'DR drill support'],
      price: 'Custom quote',
    },
  ],
  securityCoverage: [
    {
      title: 'Server & Access Security',
      points: [
        'MFA-first admin access policy',
        'SSH key rotation and restricted sudo model',
        'WAF and firewall hardening baseline',
      ],
    },
    {
      title: 'Data Protection & Continuity',
      points: [
        'Automated backup retention rules',
        'Recovery point objective planning',
        'Disaster recovery drill and verification',
      ],
    },
    {
      title: 'Compliance Readiness',
      points: [
        'Log retention and audit trail setup',
        'Security posture reporting',
        'Policy alignment for industry controls',
      ],
    },
  ],
  migrationChecklist: [
    'Existing DNS and registrar audit',
    'Mail delivery records (SPF/DKIM/DMARC) validation',
    'Staging clone and load test before cutover',
    'Downtime-safe switch plan with rollback',
    'Post-migration security and speed re-check',
  ],
  platformCoverage: [
    { name: 'WordPress / CMS', detail: 'Plugin-safe updates, cache strategy, media optimization, and security hardening.' },
    { name: 'Node / React Apps', detail: 'PM2/runtime process management, Nginx reverse proxy, and CI-friendly deployment flow.' },
    { name: 'Laravel / PHP Apps', detail: 'Queue/cron supervision, OPcache tuning, and database connection stability setup.' },
    { name: 'Custom APIs', detail: 'Rate limiting, observability dashboards, and endpoint-level uptime tracking.' },
  ],
  reliabilityMetrics: [
    { value: '99.95%', label: 'Target uptime standard' },
    { value: '<15 min', label: 'Critical alert response goal' },
    { value: '24/7', label: 'Monitoring coverage' },
    { value: '0-downtime', label: 'Planned release strategy' },
  ],
  faqs: [
    {
      q: 'Can you migrate my existing site and emails without downtime?',
      a: 'Yes. We prepare staging migration, DNS cutover planning, and rollback strategy to minimize or avoid downtime.',
    },
    {
      q: 'Do you provide SSL, backups, and malware protection in support plans?',
      a: 'Yes. Security, backup policy, patch updates, and threat monitoring are included based on your chosen plan.',
    },
    {
      q: 'Which option is better for me: business hosting, VPS, or dedicated server?',
      a: 'We recommend based on traffic, app complexity, security requirements, and expected growth roadmap.',
    },
  ],
}

export default function DomainHostingServerPage() {
  const [pageData, setPageData] = useState(fallbackPageData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const normalizeTextItems = (value, fallback) => {
      if (!Array.isArray(value) || !value.length) return fallback
      return value
        .map((item) => {
          if (typeof item === 'string') return item.trim()
          if (item && typeof item === 'object' && typeof item.text === 'string') return item.text.trim()
          return ''
        })
        .filter(Boolean)
    }

    const mergePageData = (apiData = {}) => ({
      ...fallbackPageData,
      ...apiData,
      quickLinks: Array.isArray(apiData.quickLinks) && apiData.quickLinks.length ? apiData.quickLinks : fallbackPageData.quickLinks,
      domainServices: Array.isArray(apiData.domainServices) && apiData.domainServices.length ? apiData.domainServices : fallbackPageData.domainServices,
      hostingStacks: Array.isArray(apiData.hostingStacks) && apiData.hostingStacks.length ? apiData.hostingStacks : fallbackPageData.hostingStacks,
      serverOpsFlow: Array.isArray(apiData.serverOpsFlow) && apiData.serverOpsFlow.length ? apiData.serverOpsFlow : fallbackPageData.serverOpsFlow,
      supportPackages: Array.isArray(apiData.supportPackages) && apiData.supportPackages.length ? apiData.supportPackages : fallbackPageData.supportPackages,
      securityCoverage: Array.isArray(apiData.securityCoverage) && apiData.securityCoverage.length ? apiData.securityCoverage : fallbackPageData.securityCoverage,
      migrationChecklist: normalizeTextItems(apiData.migrationChecklist, fallbackPageData.migrationChecklist),
      platformCoverage: Array.isArray(apiData.platformCoverage) && apiData.platformCoverage.length ? apiData.platformCoverage : fallbackPageData.platformCoverage,
      reliabilityMetrics: Array.isArray(apiData.reliabilityMetrics) && apiData.reliabilityMetrics.length ? apiData.reliabilityMetrics : fallbackPageData.reliabilityMetrics,
      faqs: Array.isArray(apiData.faqs) && apiData.faqs.length ? apiData.faqs : fallbackPageData.faqs,
    })

    const fetchPageData = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/domain-hosting-server-page`)
        if (!response.ok) throw new Error('Failed to fetch domain hosting server content')
        const data = await response.json()
        if (isMounted) setPageData(mergePageData(data))
      } catch (requestError) {
        if (isMounted) {
          setPageData(fallbackPageData)
          setError(requestError?.message || 'Using fallback content')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPageData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="w-full text-white">
      {loading ? (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75">Loading latest content...</p>
        </div>
      ) : null}
      {error ? (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{error}</p>
        </div>
      ) : null}

      <section className="relative isolate overflow-hidden">
        <div className="h-[300px] w-full bg-cover bg-center sm:h-[390px]" style={{ backgroundImage: `url(${pageData.heroImage})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,210,255,0.24)_0%,transparent_38%),radial-gradient(circle_at_84%_74%,rgba(87,132,255,0.14)_0%,transparent_45%),linear-gradient(120deg,rgba(0,11,30,0.94)_22%,rgba(8,33,52,0.74)_60%,rgba(0,11,30,0.5)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal variant="slide-right" duration={0.5}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-[#0a3146]/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.badge}
            </p>
            <h1 className="max-w-5xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{pageData.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/86 sm:text-base">{pageData.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {pageData.quickLinks.map((item) => (
            <Link
              key={item._id || `${item.label}-${item.to}`}
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

        <ScrollReveal variant="fade-up" className="grid gap-4 lg:grid-cols-3">
          {pageData.domainServices.map((item) => (
            <article key={item._id || item.title} className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(18,72,99,0.28),rgba(10,38,58,0.42))] p-6">
              <h2 className="text-xl font-black text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
            </article>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.06} className="mt-14">
          <h2 className="text-2xl font-black text-white">Hosting Stack Recommendations</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.hostingStacks.map((stack) => (
              <article key={stack._id || stack.type} className="rounded-2xl border border-[#00d2ff]/18 bg-[#1a5c7f]/20 p-5">
                <p className="text-lg font-black text-white">{stack.type}</p>
                <p className="mt-2 text-sm leading-7 text-white/74">{stack.useCase}</p>
                <ul className="mt-4 space-y-2">
                  {(Array.isArray(stack.features) ? stack.features : []).map((feature) => (
                    <li key={`${stack._id || stack.type}-${feature}`} className="flex gap-2 text-sm text-white/80">
                      <span className="text-[#00d2ff]">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <h2 className="text-2xl font-black text-white">Server Operations Lifecycle</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pageData.serverOpsFlow.map((flow) => (
              <article key={flow._id || flow.step} className="rounded-2xl border border-[#00d2ff]/14 bg-[#1f6e95]/16 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">Step {flow.step}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{flow.heading}</h3>
                <p className="mt-2 text-sm leading-7 text-white/74">{flow.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal variant="fade-up" className="rounded-[2rem] border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(16,62,86,0.22),rgba(10,34,52,0.4))] p-6 sm:p-7">
            <h2 className="text-2xl font-black text-white">Security & Compliance Coverage</h2>
            <div className="mt-5 space-y-4">
              {pageData.securityCoverage.map((block) => (
                <article key={block._id || block.title} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                  <h3 className="text-base font-bold text-[#00d2ff]">{block.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {(Array.isArray(block.points) ? block.points : []).map((point) => (
                      <li key={`${block._id || block.title}-${point}`} className="flex gap-2 text-sm text-white/80">
                        <span className="text-[#00d2ff]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08} className="rounded-[2rem] border border-[#00d2ff]/16 bg-[#1a6086]/16 p-6 sm:p-7">
            <h2 className="text-2xl font-black text-white">Migration & Launch Checklist</h2>
            <ul className="mt-5 grid gap-3">
              {pageData.migrationChecklist.map((item) => (
                <li key={item} className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
                  <span className="mr-2 text-[#00d2ff]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.1} className="mt-14">
          <h2 className="text-2xl font-black text-white">Platform-Specific Operations Coverage</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pageData.platformCoverage.map((item) => (
              <article key={item._id || item.name} className="rounded-2xl border border-[#00d2ff]/16 bg-[#1a5c7f]/18 p-5">
                <h3 className="text-lg font-black text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-7 text-white/78">{item.detail}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal variant="fade-up" className="space-y-4">
            {pageData.reliabilityMetrics.map((stat) => (
              <div key={stat._id || stat.label} className="rounded-2xl border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(16,60,83,0.28),rgba(9,31,47,0.42))] p-6">
                <p className="text-4xl font-black text-[#00d2ff]">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <h2 className="text-2xl font-black text-white">Support Packages</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pageData.supportPackages.map((pkg) => (
                <article key={pkg._id || pkg.name} className="rounded-2xl border border-[#00d2ff]/16 bg-[linear-gradient(180deg,rgba(16,62,86,0.24),rgba(10,34,52,0.44))] p-5">
                  <p className="text-lg font-black text-white">{pkg.name}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#00d2ff]">{pkg.timeline}</p>
                  <ul className="mt-4 space-y-2">
                    {(Array.isArray(pkg.features) ? pkg.features : []).map((feature) => (
                      <li key={`${pkg._id || pkg.name}-${feature}`} className="flex gap-2 text-sm text-white/80">
                        <span className="text-[#00d2ff]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-base font-black text-[#00d2ff]">{pkg.price}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.12} className="mt-14">
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pageData.faqs.map((item) => (
              <article key={item._id || item.q} className="rounded-2xl border border-[#00d2ff]/14 bg-[#1a6086]/18 p-5">
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
