import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/ads-seo-management'

const fallbackPageContent = {
  hero: {
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Performance marketing',
    title: 'Ads + SEO management',
    subtitle:
      'Run profitable paid campaigns and build durable organic visibility — one team, shared measurement, and reporting you can actually use for decisions.',
    highlights: [
      { label: 'Paid media', value: 'Meta · Google · LinkedIn' },
      { label: 'Organic', value: 'Technical + content SEO' },
      { label: 'Attribution', value: 'GA4 · pixels · CRM hooks' },
    ],
  },
  navPills: [
    { label: 'Ads + SEO', to: PAGE_PATH },
    { label: 'Website development', to: '/website-development' },
    { label: 'Landing pages', to: '/landing-page-design' },
    { label: 'All services', to: '/services' },
  ],
  whyTogether: {
    title: 'Why Ads and SEO belong in one roadmap',
    body:
      'Paid ads give you speed; SEO compounds returns. When both share keyword research, landing page quality, and conversion tracking, you stop guessing which channel “won” — you see how demand is created, captured, and converted.',
    bullets: [
      'Shared keyword & intent map across paid and organic',
      'Landing pages tuned for Quality Score and Core Web Vitals',
      'Creative and copy tested in ads, winners folded into SEO content',
      'Unified dashboards: spend, impressions, rankings, leads, revenue',
    ],
  },
  adsPillars: [
    {
      title: 'Campaign architecture',
      detail:
        'Account structure by funnel stage, geo, and product line. Naming conventions, budget pacing, and audience exclusions that scale without chaos.',
    },
    {
      title: 'Creative & messaging',
      detail:
        'Hooks, angles, and offer stacks per persona. UGC-style variants, static + motion, and systematic refresh cadence to fight fatigue.',
    },
    {
      title: 'Bid & budget strategy',
      detail:
        'Target CPA/ROAS guardrails, seasonality rules, and experiments (ASC, PMax, search partners) with clear hypothesis and readouts.',
    },
    {
      title: 'Conversion tracking',
      detail:
        'Pixel + CAPI hygiene, offline conversions, enhanced measurements, and lead-quality signals back to the ad platforms.',
    },
  ],
  seoPillars: [
    {
      title: 'Technical SEO',
      detail:
        'Crawl budget, indexation, canonicals, schema, redirects, log analysis, and page experience (LCP, INP, CLS) fixes prioritized by revenue impact.',
    },
    {
      title: 'Information architecture',
      detail:
        'URL patterns, internal linking hubs, faceted navigation controls, and content depth aligned to search intent — not vanity keyword lists.',
    },
    {
      title: 'On-page & entities',
      detail:
        'Title/meta patterns, heading structure, E-E-A-T signals, FAQ blocks, and entity-rich copy that matches how people actually search.',
    },
    {
      title: 'Authority & digital PR',
      detail:
        'Link-worthy assets, outreach, digital PR, and brand SERP hygiene so rankings hold when competition increases.',
    },
  ],
  deliverables: [
    {
      phase: 'Discovery (week 1)',
      items: [
        'Business goals, margins, and LTV/CAC guardrails',
        'Analytics + ads account audit (access, events, data layer)',
        'Competitor visibility snapshot (ads libraries + SERP)',
        'Measurement plan: KPIs, attribution assumptions, reporting cadence',
      ],
    },
    {
      phase: 'Foundation (weeks 2–3)',
      items: [
        'Unified keyword & intent map (paid + organic)',
        'Landing page briefs: UX, copy, speed, and conversion events',
        'Technical SEO fixes backlog with effort vs impact scoring',
        'Creative matrix: angles × formats × audiences',
      ],
    },
    {
      phase: 'Execution (ongoing)',
      items: [
        'Campaign builds, experiments, and weekly optimization loops',
        'Content calendar tied to clusters and commercial intent',
        'Link building / PR outreach where it moves the needle',
        'Executive summary + granular dashboards (looker-style or sheets)',
      ],
    },
  ],
  platforms: [
    { name: 'Google Ads', note: 'Search, PMax, Display, YouTube' },
    { name: 'Meta Ads', note: 'Feed, Stories, Advantage+ tests' },
    { name: 'LinkedIn / others', note: 'B2B lead gen where CAC fits' },
    { name: 'GA4 + GTM', note: 'Events, conversions, audiences' },
    { name: 'Search Console', note: 'Queries, coverage, enhancements' },
    { name: 'SEO tooling', note: 'Crawlers, rank tracking, content briefs' },
  ],
  reporting: [
    {
      metric: 'Pipeline & revenue',
      desc: 'Leads, SQLs, closed-won where CRM is connected — not just “clicks.”',
    },
    {
      metric: 'Efficiency',
      desc: 'CPA, ROAS, MER blended view, and organic-assisted conversions.',
    },
    {
      metric: 'Visibility',
      desc: 'Share of voice for priority topics, ranking tiers, and SERP features.',
    },
    {
      metric: 'Experience',
      desc: 'Landing page speed, mobile usability, and on-page engagement proxies.',
    },
  ],
  faqs: [
    {
      q: 'Do you guarantee #1 rankings or a fixed ROAS?',
      a: 'No ethical team can guarantee rankings or platform-specific ROAS — algorithms, auctions, and competitors change. We guarantee rigorous process, transparent reporting, and prioritized work tied to business outcomes.',
    },
    {
      q: 'What budgets do you usually work with?',
      a: 'We work across ranges, but meaningful learning velocity in paid media typically needs enough daily volume to exit the “noise floor.” We’ll advise minimums per channel after your geo and goal clarity.',
    },
    {
      q: 'Can you work with our in-house designer or developer?',
      a: 'Yes. We often pair with internal teams: we supply briefs, specs, and acceptance checks (speed, tracking, SEO) so production stays smooth.',
    },
    {
      q: 'How fast will SEO show results?',
      a: 'Technical fixes can move the needle in weeks; competitive topics often need months of compounding. We stage quick wins alongside long-horizon cluster builds.',
    },
    {
      q: 'Do you handle Bengali / bilingual campaigns?',
      a: 'Yes — creative, keyword research, and localized landing experiences can be structured for mixed-language audiences where that matches your market.',
    },
  ],
  pillarsSectionEyebrow: 'Two engines · one customer journey',
  pillarsSectionTitle: 'Paid acquisition & organic growth',
  pillarsSectionSubtitle:
    'Deep capability lists — so you know exactly what we operate, measure, and improve week over week.',
  adsCardTitle: 'Paid media management',
  adsCardSubtitle: 'Auctions, creative, budgets, experiments',
  seoCardTitle: 'Search engine optimization',
  seoCardSubtitle: 'Technical, content, authority',
  deliverablesSectionEyebrow: 'How we work',
  deliverablesSectionTitle: 'Engagement phases & deliverables',
  deliverablesSectionSubtitle:
    'Clear checkpoints so stakeholders see progress — not a black box of “marketing activity.”',
  platformsSectionTitle: 'Platforms we operate',
  platformsSectionSubtitle:
    'Tooling is tailored to your stack; this is a typical enterprise-grade mix.',
  reportingSectionTitle: 'Reporting you can steer with',
  reportingSectionSubtitle: 'Every metric ties to a decision: scale, fix, or pause.',
  faqSectionEyebrow: 'FAQ',
  faqSectionTitle: 'Straight answers',
  growthCtaLabel: 'Talk to us about growth',
  growthCtaTo: '/services',
  ctaTitle: 'Ready to align Ads + SEO?',
  ctaSubtitle:
    'Share your goals, markets, and current stack — we’ll propose a practical plan with timelines and success metrics.',
  ctaButtonLabel: 'View all services',
  ctaButtonTo: '/services',
}

function mergeAdsSeoPageFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackPageContent

  const f = fallbackPageContent

  const highlights =
    Array.isArray(data.heroHighlights) && data.heroHighlights.length
      ? data.heroHighlights.map((h) => ({
          _id: h._id,
          label: typeof h.label === 'string' ? h.label : '',
          value: typeof h.value === 'string' ? h.value : '',
        }))
      : f.hero.highlights.map((h, i) => ({ _id: `fh-${i}`, ...h }))

  const navPills =
    Array.isArray(data.navPills) && data.navPills.length
      ? data.navPills.map((p) => ({
          _id: p._id,
          label: typeof p.label === 'string' ? p.label : '',
          to: typeof p.to === 'string' ? p.to : '',
        }))
      : f.navPills.map((p, i) => ({ _id: `fp-${i}`, ...p }))

  const bullets =
    Array.isArray(data.whyTogetherBullets) && data.whyTogetherBullets.length
      ? data.whyTogetherBullets.map((b) => {
          if (typeof b === 'string') return { text: b }
          if (typeof b === 'object' && b !== null && 'text' in b)
            return { _id: b._id, text: String(b.text || '') }
          return { text: '' }
        })
      : f.whyTogether.bullets.map((text, i) => ({ _id: `fb-${i}`, text }))

  const mapPillars = (arr, fallbackArr) =>
    Array.isArray(arr) && arr.length
      ? arr.map((item) => ({
          _id: item._id,
          title: typeof item.title === 'string' ? item.title : '',
          detail: typeof item.detail === 'string' ? item.detail : '',
        }))
      : fallbackArr.map((item, i) => ({ _id: `p-${i}`, ...item }))

  const deliverables =
    Array.isArray(data.deliverables) && data.deliverables.length
      ? data.deliverables.map((block) => ({
          _id: block._id,
          phase: typeof block.phase === 'string' ? block.phase : '',
          items: Array.isArray(block.items)
            ? block.items.filter((x) => typeof x === 'string')
            : [],
        }))
      : f.deliverables.map((block, i) => ({ _id: `d-${i}`, ...block }))

  const platforms =
    Array.isArray(data.platforms) && data.platforms.length
      ? data.platforms.map((p) => ({
          _id: p._id,
          name: typeof p.name === 'string' ? p.name : '',
          note: typeof p.note === 'string' ? p.note : '',
        }))
      : f.platforms.map((p, i) => ({ _id: `pl-${i}`, ...p }))

  const reporting =
    Array.isArray(data.reporting) && data.reporting.length
      ? data.reporting.map((row) => ({
          _id: row._id,
          metric: typeof row.metric === 'string' ? row.metric : '',
          desc: typeof row.desc === 'string' ? row.desc : '',
        }))
      : f.reporting.map((row, i) => ({ _id: `r-${i}`, ...row }))

  const faqs =
    Array.isArray(data.faqs) && data.faqs.length
      ? data.faqs.map((x) => ({
          _id: x._id,
          q: typeof x.q === 'string' ? x.q : '',
          a: typeof x.a === 'string' ? x.a : '',
        }))
      : f.faqs.map((x, i) => ({ _id: `fq-${i}`, ...x }))

  return {
    hero: {
      heroImage: typeof data.heroImage === 'string' && data.heroImage.trim() ? data.heroImage.trim() : f.hero.heroImage,
      eyebrow: typeof data.eyebrow === 'string' && data.eyebrow.trim() ? data.eyebrow.trim() : f.hero.eyebrow,
      title: typeof data.title === 'string' && data.title.trim() ? data.title.trim() : f.hero.title,
      subtitle:
        typeof data.subtitle === 'string' && data.subtitle.trim() ? data.subtitle.trim() : f.hero.subtitle,
      highlights,
    },
    navPills,
    whyTogether: {
      title:
        typeof data.whyTogetherTitle === 'string' && data.whyTogetherTitle.trim()
          ? data.whyTogetherTitle.trim()
          : f.whyTogether.title,
      body:
        typeof data.whyTogetherBody === 'string' && data.whyTogetherBody.trim()
          ? data.whyTogetherBody.trim()
          : f.whyTogether.body,
      bullets,
    },
    adsPillars: mapPillars(data.adsPillars, f.adsPillars),
    seoPillars: mapPillars(data.seoPillars, f.seoPillars),
    deliverables,
    platforms,
    reporting,
    faqs,
    pillarsSectionEyebrow:
      typeof data.pillarsSectionEyebrow === 'string' && data.pillarsSectionEyebrow.trim()
        ? data.pillarsSectionEyebrow.trim()
        : f.pillarsSectionEyebrow,
    pillarsSectionTitle:
      typeof data.pillarsSectionTitle === 'string' && data.pillarsSectionTitle.trim()
        ? data.pillarsSectionTitle.trim()
        : f.pillarsSectionTitle,
    pillarsSectionSubtitle:
      typeof data.pillarsSectionSubtitle === 'string' && data.pillarsSectionSubtitle.trim()
        ? data.pillarsSectionSubtitle.trim()
        : f.pillarsSectionSubtitle,
    adsCardTitle:
      typeof data.adsCardTitle === 'string' && data.adsCardTitle.trim()
        ? data.adsCardTitle.trim()
        : f.adsCardTitle,
    adsCardSubtitle:
      typeof data.adsCardSubtitle === 'string' && data.adsCardSubtitle.trim()
        ? data.adsCardSubtitle.trim()
        : f.adsCardSubtitle,
    seoCardTitle:
      typeof data.seoCardTitle === 'string' && data.seoCardTitle.trim()
        ? data.seoCardTitle.trim()
        : f.seoCardTitle,
    seoCardSubtitle:
      typeof data.seoCardSubtitle === 'string' && data.seoCardSubtitle.trim()
        ? data.seoCardSubtitle.trim()
        : f.seoCardSubtitle,
    deliverablesSectionEyebrow:
      typeof data.deliverablesSectionEyebrow === 'string' && data.deliverablesSectionEyebrow.trim()
        ? data.deliverablesSectionEyebrow.trim()
        : f.deliverablesSectionEyebrow,
    deliverablesSectionTitle:
      typeof data.deliverablesSectionTitle === 'string' && data.deliverablesSectionTitle.trim()
        ? data.deliverablesSectionTitle.trim()
        : f.deliverablesSectionTitle,
    deliverablesSectionSubtitle:
      typeof data.deliverablesSectionSubtitle === 'string' && data.deliverablesSectionSubtitle.trim()
        ? data.deliverablesSectionSubtitle.trim()
        : f.deliverablesSectionSubtitle,
    platformsSectionTitle:
      typeof data.platformsSectionTitle === 'string' && data.platformsSectionTitle.trim()
        ? data.platformsSectionTitle.trim()
        : f.platformsSectionTitle,
    platformsSectionSubtitle:
      typeof data.platformsSectionSubtitle === 'string' && data.platformsSectionSubtitle.trim()
        ? data.platformsSectionSubtitle.trim()
        : f.platformsSectionSubtitle,
    reportingSectionTitle:
      typeof data.reportingSectionTitle === 'string' && data.reportingSectionTitle.trim()
        ? data.reportingSectionTitle.trim()
        : f.reportingSectionTitle,
    reportingSectionSubtitle:
      typeof data.reportingSectionSubtitle === 'string' && data.reportingSectionSubtitle.trim()
        ? data.reportingSectionSubtitle.trim()
        : f.reportingSectionSubtitle,
    faqSectionEyebrow:
      typeof data.faqSectionEyebrow === 'string' && data.faqSectionEyebrow.trim()
        ? data.faqSectionEyebrow.trim()
        : f.faqSectionEyebrow,
    faqSectionTitle:
      typeof data.faqSectionTitle === 'string' && data.faqSectionTitle.trim()
        ? data.faqSectionTitle.trim()
        : f.faqSectionTitle,
    growthCtaLabel:
      typeof data.growthCtaLabel === 'string' && data.growthCtaLabel.trim()
        ? data.growthCtaLabel.trim()
        : f.growthCtaLabel,
    growthCtaTo:
      typeof data.growthCtaTo === 'string' && data.growthCtaTo.trim()
        ? data.growthCtaTo.trim()
        : f.growthCtaTo,
    ctaTitle:
      typeof data.ctaTitle === 'string' && data.ctaTitle.trim() ? data.ctaTitle.trim() : f.ctaTitle,
    ctaSubtitle:
      typeof data.ctaSubtitle === 'string' && data.ctaSubtitle.trim()
        ? data.ctaSubtitle.trim()
        : f.ctaSubtitle,
    ctaButtonLabel:
      typeof data.ctaButtonLabel === 'string' && data.ctaButtonLabel.trim()
        ? data.ctaButtonLabel.trim()
        : f.ctaButtonLabel,
    ctaButtonTo:
      typeof data.ctaButtonTo === 'string' && data.ctaButtonTo.trim()
        ? data.ctaButtonTo.trim()
        : f.ctaButtonTo,
  }
}

export default function AdsSEOPage() {
  const [live, setLive] = useState(() => mergeAdsSeoPageFromApi(null))
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const load = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/ads-seo-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLive(mergeAdsSeoPageFromApi(data))
          setFetchError('')
        } else {
          setLive(mergeAdsSeoPageFromApi(null))
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_e) {
        setLive(mergeAdsSeoPageFromApi(null))
        setFetchError('Could not reach server — showing built-in defaults')
      } finally {
        setPageLoading(false)
      }
    }
    load()
  }, [])

  const {
    hero,
    navPills,
    whyTogether,
    adsPillars,
    seoPillars,
    deliverables,
    platforms,
    reporting,
    faqs,
    pillarsSectionEyebrow,
    pillarsSectionTitle,
    pillarsSectionSubtitle,
    adsCardTitle,
    adsCardSubtitle,
    seoCardTitle,
    seoCardSubtitle,
    deliverablesSectionEyebrow,
    deliverablesSectionTitle,
    deliverablesSectionSubtitle,
    platformsSectionTitle,
    platformsSectionSubtitle,
    reportingSectionTitle,
    reportingSectionSubtitle,
    faqSectionEyebrow,
    faqSectionTitle,
    growthCtaLabel,
    growthCtaTo,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonTo,
  } = live

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
        <div
          className="h-[280px] w-full bg-cover bg-center sm:h-[360px]"
          style={{ backgroundImage: `url(${hero.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,210,255,0.25)_0%,transparent_36%),linear-gradient(112deg,rgba(15,31,46,0.92)_22%,rgba(8,34,53,0.78)_58%,rgba(15,31,46,0.52)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal variant="slide-right" duration={0.5}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-[#0a3146]/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{hero.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
          {navPills.map((p) => (
            <Link
              key={p._id || `${p.label}-${p.to}`}
              to={p.to}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                p.to === PAGE_PATH
                  ? 'border-[#00d2ff] bg-[#00d2ff] text-[#0f1f2e]'
                  : 'border-white/15 bg-[#0a3146]/30 text-white/85 hover:border-[#00d2ff]/45 hover:text-[#00d2ff]'
              }`}
            >
              {p.label}
            </Link>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.04} className="mb-2 grid gap-3 sm:grid-cols-3">
          {hero.highlights.map((h) => (
            <div
              key={h._id || h.label}
              className="rounded-2xl border border-[#00d2ff]/15 bg-[linear-gradient(145deg,rgba(10,49,70,0.42)_0%,rgba(18,40,58,0.72)_100%)] p-5 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.55)] transition hover:border-[#00d2ff]/28"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#43B7E8]/90">{h.label}</p>
              <p className="mt-2 text-base font-semibold text-white/95 sm:text-lg">{h.value}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08}>
          <Link
            to={growthCtaTo}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#00d2ff]/40 bg-[#00d2ff]/10 px-4 py-3 text-sm font-bold text-[#00d2ff] transition hover:bg-[#00d2ff]/18"
          >
            {growthCtaLabel}
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </Link>
        </ScrollReveal>
      </div>

      <section className="relative border-y border-white/[0.08] bg-[#0e1c2c]/95">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal variant="fade-up">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{whyTogether.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{whyTogether.body}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.06}>
              <ul className="space-y-4">
                {whyTogether.bullets.map((b) => (
                  <li
                    key={b._id || b.text}
                    className="flex gap-3 rounded-xl border border-white/[0.08] bg-[#0a3146]/25 px-4 py-3 text-sm leading-relaxed text-white/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d2ff]" aria-hidden />
                    {b.text}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal variant="fade-up" className="mb-10 text-center lg:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{pillarsSectionEyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{pillarsSectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">{pillarsSectionSubtitle}</p>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal variant="slide-right">
            <div className="relative h-full rounded-3xl border border-[#00d2ff]/25 bg-[linear-gradient(160deg,rgba(0,210,255,0.12)_0%,rgba(18,40,58,0.88)_38%,rgba(20,44,62,0.95)_100%)] p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00d2ff]/20 text-lg font-black text-[#00d2ff]">
                  ADS
                </span>
                <div>
                  <h3 className="text-xl font-bold">{adsCardTitle}</h3>
                  <p className="text-xs text-white/55">{adsCardSubtitle}</p>
                </div>
              </div>
              <ul className="space-y-5">
                {adsPillars.map((item) => (
                  <li key={item._id || item.title} className="border-l-2 border-[#00d2ff]/50 pl-4">
                    <p className="font-semibold text-white/95">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" delay={0.1}>
            <div className="relative h-full rounded-3xl border border-[#43B7E8]/25 bg-[linear-gradient(200deg,rgba(67,183,232,0.1)_0%,rgba(18,40,58,0.88)_40%,rgba(20,44,62,0.95)_100%)] p-6 sm:p-8 lg:translate-y-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#43B7E8]/20 text-lg font-black text-[#43B7E8]">
                  SEO
                </span>
                <div>
                  <h3 className="text-xl font-bold">{seoCardTitle}</h3>
                  <p className="text-xs text-white/55">{seoCardSubtitle}</p>
                </div>
              </div>
              <ul className="space-y-5">
                {seoPillars.map((item) => (
                  <li key={item._id || item.title} className="border-l-2 border-[#43B7E8]/50 pl-4">
                    <p className="font-semibold text-white/95">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[linear-gradient(180deg,#0c1a28_0%,#132535_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal variant="fade-up" className="mb-10 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{deliverablesSectionEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{deliverablesSectionTitle}</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">{deliverablesSectionSubtitle}</p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {deliverables.map((block, i) => (
              <ScrollReveal key={block._id || block.phase} variant="fade-up" delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.1] bg-[#0a3146]/20 p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d2ff]/15 text-xs font-black text-[#00d2ff]">
                      {i + 1}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">{block.phase}</h3>
                  </div>
                  <ul className="flex-1 space-y-3 text-sm leading-relaxed text-white/72">
                    {(block.items || []).map((line) => (
                      <li key={`${block._id || block.phase}-${line}`} className="flex gap-2">
                        <span className="text-[#43B7E8]" aria-hidden>
                          ◆
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal variant="fade-up">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{platformsSectionTitle}</h2>
            <p className="mt-2 text-sm text-white/65">{platformsSectionSubtitle}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {platforms.map((p) => (
                <div
                  key={p._id || p.name}
                  className="rounded-xl border border-white/[0.1] bg-[#152f45]/55 px-4 py-3 transition hover:border-[#00d2ff]/30"
                >
                  <p className="font-semibold text-[#00d2ff]">{p.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{p.note}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08}>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{reportingSectionTitle}</h2>
            <p className="mt-2 text-sm text-white/65">{reportingSectionSubtitle}</p>
            <div className="mt-6 space-y-3">
              {reporting.map((row) => (
                <div
                  key={row._id || row.metric}
                  className="flex flex-col gap-1 rounded-xl border-l-4 border-[#43B7E8] bg-[#0a3146]/30 px-4 py-3 sm:flex-row sm:items-start sm:gap-6"
                >
                  <p className="shrink-0 text-sm font-bold text-white/95 sm:w-40">{row.metric}</p>
                  <p className="text-sm leading-relaxed text-white/65">{row.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#0d1b2a]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal variant="fade-up" className="mb-8 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{faqSectionEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{faqSectionTitle}</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={f._id || f.q} variant="fade-up" delay={i * 0.04}>
                <details className="group rounded-2xl border border-white/[0.1] bg-[#0a3146]/25 open:border-[#00d2ff]/35 open:bg-[#0a3146]/40">
                  <summary className="cursor-pointer list-none px-5 py-4 pr-10 text-left text-sm font-semibold text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="block">{f.q}</span>
                    <span
                      className="mt-3 block text-[11px] font-normal text-[#00d2ff] opacity-80 group-open:hidden"
                      aria-hidden
                    >
                      Tap to expand
                    </span>
                  </summary>
                  <div className="border-t border-white/[0.06] px-5 pb-4 pt-3 text-sm leading-relaxed text-white/70">
                    {f.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.1] bg-[linear-gradient(90deg,rgba(0,210,255,0.14)_0%,rgba(67,183,232,0.1)_50%,rgba(0,210,255,0.14)_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#0f1f2e] sm:text-3xl">{ctaTitle}</h2>
            <p className="mt-2 max-w-xl text-sm text-[#0f1f2e]/75">{ctaSubtitle}</p>
          </div>
          <Link
            to={ctaButtonTo}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0f1f2e] px-6 py-3 text-sm font-bold text-[#00d2ff] shadow-lg transition hover:bg-[#152f45]"
          >
            {ctaButtonLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
