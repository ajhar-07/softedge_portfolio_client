import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/security-audit'

const AUDIT_BLOCK_STYLES = [
  {
    accent: 'from-[#00d2ff]/15 via-[#0a3146]/45 to-[#132535]/95',
    border: 'border-[#00d2ff]/25',
    tagClass: 'text-[#00d2ff]',
    orbClass: 'bg-[#00d2ff]/10',
    bulletClass: 'bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.55)]',
  },
  {
    accent: 'from-[#43B7E8]/12 via-[#0a3146]/45 to-[#132535]/95',
    border: 'border-[#43B7E8]/25',
    tagClass: 'text-[#43B7E8]',
    orbClass: 'bg-[#43B7E8]/10',
    bulletClass: 'bg-[#43B7E8] shadow-[0_0_8px_rgba(67,183,232,0.45)]',
  },
]

const fallbackContent = {
  hero: {
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Ethical hacking · defensive assurance',
    title: 'Security audits & penetration testing',
    subtitle:
      'Independent validation of your attack surface — from architecture review to controlled exploitation — with clear priorities, evidence, and a remediation path your developers can ship.',
  },
  methodologySectionEyebrow: 'Methodology',
  methodologySectionTitle: 'How we run every engagement',
  methodologySectionSubtitle:
    'A consistent cadence so your teams always know what happens next — from kickoff to retest sign-off.',
  coverageSectionEyebrow: 'Coverage',
  coverageSectionTitle: 'What we can test',
  deliverablesSectionEyebrow: 'Deliverables',
  deliverablesSectionTitle: 'What you receive',
  frameworksSectionEyebrow: 'Alignment',
  frameworksSectionTitle: 'Frameworks we map to',
  frameworksSectionSubtitle: 'Language your security team and auditors already speak.',
  faqSectionEyebrow: 'FAQ',
  faqSectionTitle: 'Common questions',
  ctaTitle: 'Ready to validate your defenses?',
  ctaSubtitle:
    'Share your environment and compliance goals — we will propose a scoped audit, pentest, or combined program.',
  ctaPrimaryLabel: 'Start a conversation',
  ctaPrimaryTo: '/how-we-work',
  ctaSecondaryLabel: 'Browse services',
  ctaSecondaryTo: '/services',
  navPills: [
    { label: 'Security audit + pentest', to: PAGE_PATH },
    { label: 'Information security', to: '/information-security' },
    { label: 'Our services', to: '/services' },
    { label: 'How we work', to: '/how-we-work' },
  ],
  stats: [
    { label: 'Engagement models', value: 'Black / grey / white box' },
    { label: 'Reporting', value: 'Exec + technical + retest' },
    { label: 'Scope', value: 'Web · API · cloud · network' },
  ],
  auditVsPentestRaw: [
    {
      tag: 'ASSESS',
      title: 'Security audit & hardening review',
      body:
        'Policy, configuration, and design review aligned to your risk profile. We map controls, gap-test against frameworks, and produce prioritized fixes before attackers find them first.',
      bullets: [
        'Architecture & threat modeling workshops',
        'Secure configuration baselines (cloud, IAM, network)',
        'Code & dependency risk sampling where applicable',
        'Compliance-oriented evidence packs (OWASP, CIS-style)',
      ],
    },
    {
      tag: 'PENTEST',
      title: 'Penetration testing',
      body:
        'Goal-oriented simulated attacks with safe, agreed rules of engagement. We chain realistic weaknesses to show business impact — not just scanner noise.',
      bullets: [
        'External & internal network testing',
        'Web & mobile application exploitation',
        'API & authentication / session abuse cases',
        'Phishing simulations & awareness (optional add-on)',
      ],
    },
  ],
  methodology: [
    {
      phase: '01 — Scoping',
      detail:
        'Assets, sensitivity tiers, blackout windows, and legal boundaries. We align on success criteria and communication channels.',
    },
    {
      phase: '02 — Recon & mapping',
      detail:
        'Surface discovery, asset inventory cross-checks, and passive intelligence — always within the agreed envelope.',
    },
    {
      phase: '03 — Vulnerability analysis',
      detail:
        'Manual validation on top of tooling: business logic flaws, authZ gaps, and misconfigurations scanners miss.',
    },
    {
      phase: '04 — Controlled exploitation',
      detail:
        'Demonstrate impact with evidence screenshots and reproduction steps — stopping short of anything that could harm production.',
    },
    {
      phase: '05 — Report & retest',
      detail:
        'Executive summary for leadership, technical appendix for engineering, and optional remediation retest windows.',
    },
  ],
  coverage: [
    { area: 'Web applications', note: 'OWASP Top 10, business logic, SSRF/IDOR, XSS, CSRF' },
    { area: 'APIs & microservices', note: 'AuthN/Z, rate limits, mass assignment, schema abuse' },
    { area: 'Cloud & containers', note: 'IAM, storage policies, K8s RBAC, secrets hygiene' },
    { area: 'Network perimeter', note: 'Exposure, segmentation, VPN, wireless (where in scope)' },
    { area: 'Mobile apps', note: 'Local storage, SSL pinning bypass checks, deep links' },
    { area: 'Social engineering', note: 'Phishing, vishing, physical tests — scoped separately' },
  ],
  deliverables: [
    {
      title: 'Executive summary',
      desc: 'Risk themes, dollars-at-stake framing, and what to fix first for board-ready clarity.',
    },
    {
      title: 'Technical findings',
      desc: 'CVSS-style severity, reproduction steps, affected components, and references.',
    },
    {
      title: 'Remediation roadmap',
      desc: 'Grouped by sprint-friendly themes with owners and suggested timelines.',
    },
    {
      title: 'Retest attestation',
      desc: 'Evidence that critical and high issues were resolved — or residual risk accepted.',
    },
  ],
  frameworks: ['OWASP ASVS', 'OWASP WSTG', 'OWASP Top 10', 'PTES mindset', 'CIS benchmarks', 'NIST CSF mapping'],
  faqs: [
    {
      q: 'Will penetration testing take our systems offline?',
      a: 'No — we design tests to avoid denial-of-service conditions and coordinate any intrusive steps. Production safety is explicit in the rules of engagement.',
    },
    {
      q: 'How is this different from a vulnerability scan?',
      a: 'Scanners are broad and shallow. Pentesting adds human judgment, chaining, and business-context abuse cases that automation cannot reason about.',
    },
    {
      q: 'Can you test our staging instead of production?',
      a: 'Yes — many clients prefer staging-first engagements. We will note environmental gaps that might differ from production.',
    },
    {
      q: 'Do you provide fixes or only reports?',
      a: 'Deliverables focus on clarity and proof. We can pair with your engineering team for remediation guidance and retesting as a follow-on.',
    },
  ],
}

function mergeSecurityAuditFromApi(data) {
  const fb = fallbackContent
  if (!data || typeof data !== 'object') {
    return {
      ...fb,
      auditVsPentest: fb.auditVsPentestRaw.map((item, i) => ({
        ...item,
        ...AUDIT_BLOCK_STYLES[i % AUDIT_BLOCK_STYLES.length],
      })),
    }
  }

  const str = (k, fallback) => (typeof data[k] === 'string' && data[k].trim() ? data[k].trim() : fallback)

  const auditRaw =
    Array.isArray(data.auditVsPentest) && data.auditVsPentest.length ? data.auditVsPentest : fb.auditVsPentestRaw

  const auditVsPentest = auditRaw.map((item, i) => {
    const bullets = Array.isArray(item.bullets)
      ? item.bullets.filter((b) => typeof b === 'string' && b.trim())
      : []
    return {
      _id: item._id,
      tag: typeof item.tag === 'string' ? item.tag : fb.auditVsPentestRaw[i]?.tag || '',
      title: typeof item.title === 'string' ? item.title : fb.auditVsPentestRaw[i]?.title || '',
      body: typeof item.body === 'string' ? item.body : fb.auditVsPentestRaw[i]?.body || '',
      bullets: bullets.length ? bullets : fb.auditVsPentestRaw[i]?.bullets || [],
      ...AUDIT_BLOCK_STYLES[i % AUDIT_BLOCK_STYLES.length],
    }
  })

  const frameworkList = Array.isArray(data.frameworks)
    ? data.frameworks
        .map((x) => (typeof x === 'string' ? x.trim() : typeof x?.text === 'string' ? x.text.trim() : ''))
        .filter(Boolean)
    : fb.frameworks

  return {
    hero: {
      image: str('heroImage', fb.hero.image),
      eyebrow: str('eyebrow', fb.hero.eyebrow),
      title: str('title', fb.hero.title),
      subtitle: str('subtitle', fb.hero.subtitle),
    },
    methodologySectionEyebrow: str('methodologySectionEyebrow', fb.methodologySectionEyebrow),
    methodologySectionTitle: str('methodologySectionTitle', fb.methodologySectionTitle),
    methodologySectionSubtitle: str('methodologySectionSubtitle', fb.methodologySectionSubtitle),
    coverageSectionEyebrow: str('coverageSectionEyebrow', fb.coverageSectionEyebrow),
    coverageSectionTitle: str('coverageSectionTitle', fb.coverageSectionTitle),
    deliverablesSectionEyebrow: str('deliverablesSectionEyebrow', fb.deliverablesSectionEyebrow),
    deliverablesSectionTitle: str('deliverablesSectionTitle', fb.deliverablesSectionTitle),
    frameworksSectionEyebrow: str('frameworksSectionEyebrow', fb.frameworksSectionEyebrow),
    frameworksSectionTitle: str('frameworksSectionTitle', fb.frameworksSectionTitle),
    frameworksSectionSubtitle: str('frameworksSectionSubtitle', fb.frameworksSectionSubtitle),
    faqSectionEyebrow: str('faqSectionEyebrow', fb.faqSectionEyebrow),
    faqSectionTitle: str('faqSectionTitle', fb.faqSectionTitle),
    ctaTitle: str('ctaTitle', fb.ctaTitle),
    ctaSubtitle: str('ctaSubtitle', fb.ctaSubtitle),
    ctaPrimaryLabel: str('ctaPrimaryLabel', fb.ctaPrimaryLabel),
    ctaPrimaryTo: str('ctaPrimaryTo', fb.ctaPrimaryTo),
    ctaSecondaryLabel: str('ctaSecondaryLabel', fb.ctaSecondaryLabel),
    ctaSecondaryTo: str('ctaSecondaryTo', fb.ctaSecondaryTo),
    navPills: Array.isArray(data.navPills) && data.navPills.length ? data.navPills : fb.navPills,
    stats: Array.isArray(data.stats) && data.stats.length ? data.stats : fb.stats,
    auditVsPentest,
    methodology: Array.isArray(data.methodology) && data.methodology.length ? data.methodology : fb.methodology,
    coverage: Array.isArray(data.coverage) && data.coverage.length ? data.coverage : fb.coverage,
    deliverables:
      Array.isArray(data.deliverables) && data.deliverables.length ? data.deliverables : fb.deliverables,
    frameworks: frameworkList.length ? frameworkList : fb.frameworks,
    faqs: Array.isArray(data.faqs) && data.faqs.length ? data.faqs : fb.faqs,
  }
}

export default function SecurityAuditPage() {
  const [live, setLive] = useState(() => mergeSecurityAuditFromApi(null))
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const load = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/security-audit-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLive(mergeSecurityAuditFromApi(data))
          setFetchError('')
        } else {
          setLive(mergeSecurityAuditFromApi(null))
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_e) {
        setLive(mergeSecurityAuditFromApi(null))
        setFetchError('Could not reach server — showing built-in defaults')
      } finally {
        setPageLoading(false)
      }
    }
    load()
  }, [])

  const {
    hero,
    methodologySectionEyebrow,
    methodologySectionTitle,
    methodologySectionSubtitle,
    coverageSectionEyebrow,
    coverageSectionTitle,
    deliverablesSectionEyebrow,
    deliverablesSectionTitle,
    frameworksSectionEyebrow,
    frameworksSectionTitle,
    frameworksSectionSubtitle,
    faqSectionEyebrow,
    faqSectionTitle,
    ctaTitle,
    ctaSubtitle,
    ctaPrimaryLabel,
    ctaPrimaryTo,
    ctaSecondaryLabel,
    ctaSecondaryTo,
    navPills,
    stats,
    auditVsPentest,
    methodology,
    coverage,
    deliverables,
    frameworks,
    faqs,
  } = live

  return (
    <div className="relative w-full overflow-x-hidden text-white">
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
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,210,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,210,255,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10">
        <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
          <div
            className="h-[300px] w-full bg-cover bg-center sm:h-[380px]"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,210,255,0.22)_0%,transparent_38%),linear-gradient(112deg,rgba(15,31,46,0.92)_22%,rgba(8,34,53,0.78)_58%,rgba(15,31,46,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(67,183,232,0.1),transparent_45%)]" />

          <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
            <ScrollReveal variant="slide-right" duration={0.55}>
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#00d2ff]">
                <span
                  className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#00d2ff] shadow-[0_0_12px_rgba(0,210,255,0.65)]"
                  aria-hidden
                />
                {hero.eyebrow}
              </p>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{hero.subtitle}</p>
            </ScrollReveal>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
          <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
            {navPills.map((p) => (
              <Link
                key={p._id || `${p.label}-${p.to}`}
                to={p.to}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                  p.to === PAGE_PATH
                    ? 'border-[#00d2ff] bg-[#00d2ff] text-[#0f1f2e] shadow-[0_0_24px_-4px_rgba(0,210,255,0.45)]'
                    : 'border-white/15 bg-[#0a3146]/30 text-white/85 hover:border-[#00d2ff]/45 hover:text-[#00d2ff]'
                }`}
              >
                {p.label}
              </Link>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.05} className="mb-14 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s._id || s.label}
                className="rounded-2xl border border-[#00d2ff]/15 bg-[linear-gradient(145deg,rgba(10,49,70,0.42)_0%,rgba(18,40,58,0.72)_100%)] px-5 py-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)]"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#43B7E8]">{s.label}</p>
                <p className="mt-2 text-lg font-bold text-white">{s.value}</p>
              </div>
            ))}
          </ScrollReveal>

          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {auditVsPentest.map((block, i) => (
              <ScrollReveal key={block._id || block.title || i} variant="fade-up" delay={i * 0.08}>
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border ${block.border} bg-gradient-to-br ${block.accent} p-6 sm:p-8`}
                >
                  <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${block.orbClass} blur-2xl`} aria-hidden />
                  <span
                    className={`inline-block rounded-lg border border-white/10 bg-[#0f1f2e]/55 px-2 py-1 font-mono text-[10px] font-bold tracking-widest ${block.tagClass}`}
                  >
                    {block.tag}
                  </span>
                  <h2 className="mt-4 text-2xl font-black tracking-tight">{block.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">{block.body}</p>
                  <ul className="mt-6 space-y-3 text-sm text-white/88">
                    {(block.bullets || []).map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${block.bulletClass}`} aria-hidden />
                        <span className="leading-relaxed text-white/78">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" className="mb-6 max-w-3xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">
              {methodologySectionEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{methodologySectionTitle}</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">{methodologySectionSubtitle}</p>
          </ScrollReveal>

          <div className="relative mb-20 border-l-2 border-[#00d2ff]/40 pl-6 sm:pl-10">
            {methodology.map((step, i) => (
              <ScrollReveal key={step._id || step.phase} variant="fade-up" delay={i * 0.05}>
                <div className={`relative pb-10 ${i === methodology.length - 1 ? 'pb-0' : ''}`}>
                  <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#00d2ff] bg-[#0f1f2e] sm:-left-[41px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00d2ff]" />
                  </span>
                  <h3 className="text-lg font-bold text-white/95">{step.phase}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/68">{step.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" className="mb-8 max-w-3xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">
              {coverageSectionEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{coverageSectionTitle}</h2>
          </ScrollReveal>

          <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((c, i) => (
              <ScrollReveal key={c._id || c.area} variant="fade-up" delay={i * 0.04}>
                <div className="group h-full rounded-2xl border border-white/[0.1] bg-[#0a3146]/25 p-5 transition hover:border-[#00d2ff]/30 hover:bg-[#0a3146]/40">
                  <p className="font-semibold text-[#00d2ff] transition group-hover:text-[#38ddff]">{c.area}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{c.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" className="mb-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">
              {deliverablesSectionEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{deliverablesSectionTitle}</h2>
          </ScrollReveal>

          <div className="mb-16 grid gap-5 sm:grid-cols-2">
            {deliverables.map((d, i) => (
              <ScrollReveal key={d._id || d.title} variant="fade-up" delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-[#00d2ff]/15 bg-[linear-gradient(160deg,rgba(10,49,70,0.35)_0%,rgba(18,40,58,0.82)_100%)] p-6">
                  <span className="font-mono text-[10px] text-[#43B7E8]/90">OUT / {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/68">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" className="mb-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">
              {frameworksSectionEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{frameworksSectionTitle}</h2>
            <p className="mt-2 text-sm text-white/65">{frameworksSectionSubtitle}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="mb-20 flex flex-wrap gap-2">
            {frameworks.map((f) => (
              <span
                key={f}
                className="rounded-lg border border-[#00d2ff]/22 bg-[#0a3146]/45 px-3 py-2 text-xs font-semibold text-white/88"
              >
                {f}
              </span>
            ))}
          </ScrollReveal>

          <section className="rounded-3xl border border-white/[0.1] bg-[#0d1b2a]/90 p-6 sm:p-10">
            <ScrollReveal variant="fade-up" className="mb-8 text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">
                {faqSectionEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">{faqSectionTitle}</h2>
            </ScrollReveal>
            <div className="mx-auto max-w-3xl space-y-3">
              {faqs.map((f, i) => (
                <ScrollReveal key={f._id || f.q} variant="fade-up" delay={i * 0.04}>
                  <details className="group rounded-2xl border border-white/[0.1] bg-[#0a3146]/25 open:border-[#00d2ff]/35 open:bg-[#0a3146]/40">
                    <summary className="cursor-pointer list-none px-5 py-4 pr-10 text-left text-sm font-semibold text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="mt-2 block text-[11px] font-normal text-[#00d2ff]/85 group-open:hidden">
                        Tap to expand
                      </span>
                    </summary>
                    <div className="border-t border-white/[0.06] px-5 pb-4 pt-3 text-sm leading-relaxed text-white/70">{f.a}</div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>

        <section className="border-t border-white/[0.1] bg-[linear-gradient(90deg,rgba(0,210,255,0.14)_0%,rgba(67,183,232,0.1)_50%,rgba(0,210,255,0.14)_100%)]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <ScrollReveal variant="fade-up">
              <h2 className="text-2xl font-black tracking-tight text-[#0f1f2e] sm:text-3xl">{ctaTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-[#0f1f2e]/78">{ctaSubtitle}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.08}>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={ctaPrimaryTo}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f1f2e] px-6 py-3.5 text-sm font-bold text-[#00d2ff] shadow-lg transition hover:bg-[#152f45]"
                >
                  {ctaPrimaryLabel}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to={ctaSecondaryTo}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#0f1f2e]/25 bg-[#0f1f2e]/08 px-6 py-3.5 text-sm font-bold text-[#0f1f2e] transition hover:border-[#0f1f2e]/40"
                >
                  {ctaSecondaryLabel}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  )
}
