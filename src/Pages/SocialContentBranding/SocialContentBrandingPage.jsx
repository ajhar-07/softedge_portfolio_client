import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/social-content-branding'

const fallbackContent = {
  hero: {
    heroImage:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Digital presence & voice',
    title: 'Social media, content & branding',
    subtitle:
      'We grow recognizable brands with channel-native social, editorial-grade content, and visual systems that stay consistent everywhere your audience meets you.',
  },
  navPills: [
    { label: 'Social + content + branding', to: PAGE_PATH },
    { label: 'Ads + SEO', to: '/ads-seo-management' },
    { label: 'Website development', to: '/website-development' },
    { label: 'All services', to: '/services' },
  ],
  introCards: [
    {
      label: 'Channels',
      value: 'Meta · LinkedIn · X · YouTube · TikTok',
    },
    {
      label: 'Content',
      value: 'Blogs · scripts · email · long-form',
    },
    {
      label: 'Brand',
      value: 'Identity · guidelines · templates',
    },
  ],
  unifiedPitch: {
    title: 'One narrative across every touchpoint',
    body:
      'Social amplifies, content educates, and branding ties it together. When strategy, tone, and design share the same brief, your campaigns feel intentional — not scattered.',
    bullets: [
      'Single messaging framework: pillars, proof points, and CTAs per funnel stage',
      'Editorial calendar aligned to product launches, seasons, and cultural moments',
      'Visual kit: logos, color, type, social templates, and motion rules',
      'Community playbooks: response SLAs, escalation paths, and crisis notes',
    ],
  },
  socialMedia: {
    eyebrow: 'Social media',
    title: 'Channel management that fits the algorithm — and your brand',
    intro:
      'Organic and paid social need different rhythms, but the same voice. We plan, produce, publish, and optimize so feeds stay active without burning your team.',
    items: [
      {
        title: 'Strategy & positioning',
        detail:
          'Audience segments, competitor listening, content pillars, and platform-specific hooks (short-form vs. long captions, carousels, Stories).',
      },
      {
        title: 'Content production',
        detail:
          'Shot lists, UGC direction, static and motion design, subtitles, and accessibility checks for each network’s specs.',
      },
      {
        title: 'Publishing & community',
        detail:
          'Scheduling, inbox monitoring, comment moderation, and FAQ-ready macros so engagement stays on-brand.',
      },
      {
        title: 'Performance loops',
        detail:
          'Weekly readouts: reach, saves, shares, watch time, and creative fatigue signals — with clear next experiments.',
      },
    ],
  },
  contentWriting: {
    eyebrow: 'Content writing',
    title: 'Copy and long-form that converts — and ranks',
    intro:
      'From landing pages to newsletters, we write for clarity, persuasion, and search intent — with editors who catch tone drift before it ships.',
    items: [
      {
        title: 'Website & landing copy',
        detail:
          'Hero blocks, feature pages, industry pages, and localized variants with consistent terminology and legal-safe claims.',
      },
      {
        title: 'Blog & thought leadership',
        detail:
          'Briefs from keyword research and SME interviews; outlines, drafts, and refresh cycles for evergreen posts.',
      },
      {
        title: 'Email & lifecycle',
        detail:
          'Welcome flows, nurture sequences, re-engagement, and transactional copy aligned to CRM fields and personalization rules.',
      },
      {
        title: 'Scripts & social captions',
        detail:
          'Hooks, CTA stacks, A/B caption sets, and video scripts with beat-by-beat timing for editors.',
      },
    ],
  },
  branding: {
    eyebrow: 'Branding',
    title: 'Identity and systems your team can actually use',
    intro:
      'A brand isn’t only a logo — it’s rules, templates, and examples that keep marketing, sales, and product aligned.',
    items: [
      {
        title: 'Brand strategy',
        detail:
          'Purpose, audience, differentiation, voice principles, and “do / don’t” examples for writers and designers.',
      },
      {
        title: 'Visual identity',
        detail:
          'Logo usage, color palettes, typography scales, iconography, photography direction, and layout grids.',
      },
      {
        title: 'Templates & toolkits',
        detail:
          'Social frames, presentation decks, one-pagers, and email headers — export-ready for Canva, Figma, or your DAM.',
      },
      {
        title: 'Rollout & training',
        detail:
          'Launch checklist, internal wiki pages, and short Loom-style walkthroughs so teams adopt the system.',
      },
    ],
  },
  processPhases: [
    {
      phase: 'Immersion',
      lines: [
        'Stakeholder interviews and offer clarity',
        'Audit of current channels, content, and assets',
        'Goals: awareness, leads, retention, or employer brand',
      ],
    },
    {
      phase: 'Blueprint',
      lines: [
        'Messaging house + content pillars',
        '90-day calendar sketch and creative territories',
        'Brand guidelines v1 and template priorities',
      ],
    },
    {
      phase: 'Production & ship',
      lines: [
        'Batch content creation with approval workflow',
        'Publishing schedule and community coverage',
        'Monthly optimization and reporting narrative',
      ],
    },
  ],
  processSection: {
    eyebrow: 'How we work',
    title: 'From discovery to always-on execution',
    subtitle: 'Transparent phases so you know what ships when — and who approves it.',
  },
  deliverablesStrip: [
    { label: 'Editorial calendar', detail: 'Monthly view with themes, formats, and owners' },
    { label: 'Content briefs', detail: 'Objective, audience, outline, references, SEO notes' },
    { label: 'Asset library', detail: 'Organized folders + naming for handoff' },
    { label: 'Brand book PDF', detail: 'Strategy + visual rules + examples' },
    { label: 'Reporting deck', detail: 'Narrative + metrics + next tests' },
  ],
  faqs: [
    {
      q: 'Do you handle only organic social or paid as well?',
      a: 'We can run organic-only retainers or pair with your media team / our Ads specialists for boosted posts and full-funnel campaigns.',
    },
    {
      q: 'Can you match our existing brand voice?',
      a: 'Yes. We start from your guidelines and live assets, then stress-test with sample posts and iterate with your reviewers.',
    },
    {
      q: 'What if we need content in English and Bengali?',
      a: 'We structure bilingual calendars and translations with native review so tone stays natural in both languages.',
    },
    {
      q: 'How fast can we go live?',
      a: 'Lightweight social + content programs often start within 2–3 weeks after brief; full rebrands depend on scope and legal review.',
    },
    {
      q: 'Do you provide designers and video editors?',
      a: 'Yes — static, motion, and simple edits in-house; larger shoots can be planned with partners under one creative brief.',
    },
  ],
  faqSection: { eyebrow: 'FAQ', title: 'Common questions' },
  cta: {
    title: 'Sharpen your brand voice everywhere',
    subtitle:
      'Tell us your markets, channels, and internal capacity — we’ll propose a retainer or project scope with clear deliverables.',
    buttonLabel: 'Explore all services',
    buttonTo: '/services',
  },
}

function mapPillarItems(arr, fallbackItems) {
  if (Array.isArray(arr) && arr.length) {
    return arr.map((item) => ({
      _id: item._id,
      title: typeof item.title === 'string' ? item.title : '',
      detail: typeof item.detail === 'string' ? item.detail : '',
    }))
  }
  return fallbackItems.map((item, i) => ({ _id: `pi-${i}`, ...item }))
}

function mergeSocialContentBrandingFromApi(data) {
  if (!data || typeof data !== 'object') return fallbackContent

  const f = fallbackContent

  const navPills =
    Array.isArray(data.navPills) && data.navPills.length
      ? data.navPills.map((p) => ({
          _id: p._id,
          label: typeof p.label === 'string' ? p.label : '',
          to: typeof p.to === 'string' ? p.to : '',
        }))
      : f.navPills.map((p, i) => ({ _id: `np-${i}`, ...p }))

  const introCards =
    Array.isArray(data.introCards) && data.introCards.length
      ? data.introCards.map((c) => ({
          _id: c._id,
          label: typeof c.label === 'string' ? c.label : '',
          value: typeof c.value === 'string' ? c.value : '',
        }))
      : f.introCards.map((c, i) => ({ _id: `ic-${i}`, ...c }))

  const bullets =
    Array.isArray(data.unifiedPitchBullets) && data.unifiedPitchBullets.length
      ? data.unifiedPitchBullets.map((b) => {
          if (typeof b === 'string') return { text: b }
          if (typeof b === 'object' && b !== null && 'text' in b)
            return { _id: b._id, text: String(b.text || '') }
          return { text: '' }
        })
      : f.unifiedPitch.bullets.map((text, i) => ({ _id: `ub-${i}`, text }))

  const processPhases =
    Array.isArray(data.processPhases) && data.processPhases.length
      ? data.processPhases.map((block) => ({
          _id: block._id,
          phase: typeof block.phase === 'string' ? block.phase : '',
          lines: Array.isArray(block.lines) ? block.lines.filter((x) => typeof x === 'string') : [],
        }))
      : f.processPhases.map((block, i) => ({ _id: `pp-${i}`, ...block }))

  const deliverablesStrip =
    Array.isArray(data.deliverablesStrip) && data.deliverablesStrip.length
      ? data.deliverablesStrip.map((d) => ({
          _id: d._id,
          label: typeof d.label === 'string' ? d.label : '',
          detail: typeof d.detail === 'string' ? d.detail : '',
        }))
      : f.deliverablesStrip.map((d, i) => ({ _id: `ds-${i}`, ...d }))

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
      heroImage:
        typeof data.heroImage === 'string' && data.heroImage.trim() ? data.heroImage.trim() : f.hero.heroImage,
      eyebrow: typeof data.eyebrow === 'string' && data.eyebrow.trim() ? data.eyebrow.trim() : f.hero.eyebrow,
      title: typeof data.title === 'string' && data.title.trim() ? data.title.trim() : f.hero.title,
      subtitle:
        typeof data.subtitle === 'string' && data.subtitle.trim() ? data.subtitle.trim() : f.hero.subtitle,
    },
    navPills,
    introCards,
    unifiedPitch: {
      title:
        typeof data.unifiedPitchTitle === 'string' && data.unifiedPitchTitle.trim()
          ? data.unifiedPitchTitle.trim()
          : f.unifiedPitch.title,
      body:
        typeof data.unifiedPitchBody === 'string' && data.unifiedPitchBody.trim()
          ? data.unifiedPitchBody.trim()
          : f.unifiedPitch.body,
      bullets,
    },
    socialMedia: {
      eyebrow:
        typeof data.socialMediaEyebrow === 'string' && data.socialMediaEyebrow.trim()
          ? data.socialMediaEyebrow.trim()
          : f.socialMedia.eyebrow,
      title:
        typeof data.socialMediaTitle === 'string' && data.socialMediaTitle.trim()
          ? data.socialMediaTitle.trim()
          : f.socialMedia.title,
      intro:
        typeof data.socialMediaIntro === 'string' && data.socialMediaIntro.trim()
          ? data.socialMediaIntro.trim()
          : f.socialMedia.intro,
      items: mapPillarItems(data.socialMediaItems, f.socialMedia.items),
    },
    contentWriting: {
      eyebrow:
        typeof data.contentWritingEyebrow === 'string' && data.contentWritingEyebrow.trim()
          ? data.contentWritingEyebrow.trim()
          : f.contentWriting.eyebrow,
      title:
        typeof data.contentWritingTitle === 'string' && data.contentWritingTitle.trim()
          ? data.contentWritingTitle.trim()
          : f.contentWriting.title,
      intro:
        typeof data.contentWritingIntro === 'string' && data.contentWritingIntro.trim()
          ? data.contentWritingIntro.trim()
          : f.contentWriting.intro,
      items: mapPillarItems(data.contentWritingItems, f.contentWriting.items),
    },
    branding: {
      eyebrow:
        typeof data.brandingEyebrow === 'string' && data.brandingEyebrow.trim()
          ? data.brandingEyebrow.trim()
          : f.branding.eyebrow,
      title:
        typeof data.brandingTitle === 'string' && data.brandingTitle.trim()
          ? data.brandingTitle.trim()
          : f.branding.title,
      intro:
        typeof data.brandingIntro === 'string' && data.brandingIntro.trim()
          ? data.brandingIntro.trim()
          : f.branding.intro,
      items: mapPillarItems(data.brandingItems, f.branding.items),
    },
    processPhases,
    processSection: {
      eyebrow:
        typeof data.processSectionEyebrow === 'string' && data.processSectionEyebrow.trim()
          ? data.processSectionEyebrow.trim()
          : f.processSection.eyebrow,
      title:
        typeof data.processSectionTitle === 'string' && data.processSectionTitle.trim()
          ? data.processSectionTitle.trim()
          : f.processSection.title,
      subtitle:
        typeof data.processSectionSubtitle === 'string' && data.processSectionSubtitle.trim()
          ? data.processSectionSubtitle.trim()
          : f.processSection.subtitle,
    },
    deliverablesStrip,
    faqs,
    faqSection: {
      eyebrow:
        typeof data.faqSectionEyebrow === 'string' && data.faqSectionEyebrow.trim()
          ? data.faqSectionEyebrow.trim()
          : f.faqSection.eyebrow,
      title:
        typeof data.faqSectionTitle === 'string' && data.faqSectionTitle.trim()
          ? data.faqSectionTitle.trim()
          : f.faqSection.title,
    },
    cta: {
      title:
        typeof data.ctaTitle === 'string' && data.ctaTitle.trim() ? data.ctaTitle.trim() : f.cta.title,
      subtitle:
        typeof data.ctaSubtitle === 'string' && data.ctaSubtitle.trim()
          ? data.ctaSubtitle.trim()
          : f.cta.subtitle,
      buttonLabel:
        typeof data.ctaButtonLabel === 'string' && data.ctaButtonLabel.trim()
          ? data.ctaButtonLabel.trim()
          : f.cta.buttonLabel,
      buttonTo:
        typeof data.ctaButtonTo === 'string' && data.ctaButtonTo.trim()
          ? data.ctaButtonTo.trim()
          : f.cta.buttonTo,
    },
  }
}

const serviceBlocks = [
  { key: 'social', accent: 'border-[#00d2ff]/40', num: '01', dataKey: 'socialMedia' },
  { key: 'content', accent: 'border-[#43B7E8]/40', num: '02', dataKey: 'contentWriting' },
  { key: 'brand', accent: 'border-white/20', num: '03', dataKey: 'branding' },
]

export default function SocialContentBrandingPage() {
  const [live, setLive] = useState(() => mergeSocialContentBrandingFromApi(null))
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const load = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/social-content-branding-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLive(mergeSocialContentBrandingFromApi(data))
          setFetchError('')
        } else {
          setLive(mergeSocialContentBrandingFromApi(null))
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_e) {
        setLive(mergeSocialContentBrandingFromApi(null))
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
    introCards,
    unifiedPitch,
    socialMedia,
    contentWriting,
    branding,
    processPhases,
    processSection,
    deliverablesStrip,
    faqs,
    faqSection,
    cta,
  } = live

  const blockData = { socialMedia, contentWriting, branding }

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

      <section className="bg-[#0f1f2e]">
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

          <ScrollReveal variant="fade-up" delay={0.04} className="grid gap-3 sm:grid-cols-3">
            {introCards.map((c) => (
              <div
                key={c._id || c.label}
                className="rounded-2xl border border-[#00d2ff]/15 bg-[linear-gradient(145deg,rgba(10,49,70,0.42)_0%,rgba(18,40,58,0.72)_100%)] p-5 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.55)] transition hover:border-[#00d2ff]/28"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#43B7E8]/90">{c.label}</p>
                <p className="mt-2 text-base font-semibold text-white/95 sm:text-lg">{c.value}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="relative border-y border-white/[0.08] bg-[#0e1c2c]/95">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal variant="fade-up">
            <span className="text-7xl font-black leading-none text-[#00d2ff]/25 sm:text-8xl" aria-hidden>
              “
            </span>
            <h2 className="-mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{unifiedPitch.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">{unifiedPitch.body}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.08} className="mt-10 text-left">
            <ul className="mx-auto max-w-xl space-y-3">
              {unifiedPitch.bullets.map((b) => (
                <li
                  key={b._id || b.text}
                  className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#0a3146]/25 px-4 py-3 text-sm leading-relaxed text-white/85"
                >
                  <span className="mt-0.5 font-mono text-xs font-bold text-[#00d2ff]" aria-hidden>
                    +
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0f1f2e] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
          {serviceBlocks.map((meta, idx) => {
            const block = blockData[meta.dataKey]
            const reverse = idx % 2 === 1
            return (
              <ScrollReveal key={meta.key} variant="fade-up" delay={idx * 0.04}>
                <div
                  className={`flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex w-full shrink-0 flex-col justify-center rounded-[2rem] border-2 ${meta.accent} bg-[#0a3146]/35 p-2 lg:w-[min(100%,280px)]`}
                  >
                    <div className="rounded-[1.65rem] bg-[linear-gradient(145deg,rgba(10,49,70,0.5)_0%,rgba(18,40,58,0.35)_100%)] px-8 py-10 text-center lg:py-14">
                      <span className="font-mono text-5xl font-black tabular-nums text-[#00d2ff]/40">{meta.num}</span>
                      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#43B7E8]">{block.eyebrow}</p>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 rounded-[2rem] border border-white/[0.1] bg-[#0a3146]/20 p-6 sm:p-8 lg:p-10">
                    <h2 className="text-2xl font-black leading-snug text-white sm:text-3xl">{block.title}</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base">{block.intro}</p>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {block.items.map((item) => (
                        <div
                          key={item._id || item.title}
                          className="rounded-xl border-l-2 border-[#43B7E8]/50 bg-[#122535]/60 py-2 pl-4"
                        >
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[linear-gradient(180deg,#0c1a28_0%,#132535_100%)] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{processSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{processSection.title}</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">{processSection.subtitle}</p>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-transparent via-[#00d2ff]/40 to-transparent md:block" />
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {processPhases.map((block, i) => (
                <ScrollReveal key={block._id || block.phase} variant="fade-up" delay={i * 0.06}>
                  <div className="relative pt-2 text-center md:pt-10">
                    <div className="relative z-[1] mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#00d2ff]/50 bg-[#122535] text-sm font-black text-[#00d2ff] shadow-[0_0_24px_rgba(0,210,255,0.2)]">
                      {i + 1}
                    </div>
                    <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-white">{block.phase}</h3>
                    <ul className="mt-4 space-y-2.5 text-left text-sm leading-relaxed text-white/72">
                      {(block.lines || []).map((line) => (
                        <li key={`${block._id || block.phase}-${line}`} className="flex gap-2">
                          <span className="text-[#43B7E8]" aria-hidden>
                            ·
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

          <ScrollReveal variant="fade-up" delay={0.12} className="mt-14 flex flex-wrap justify-center gap-3">
            {deliverablesStrip.map((d) => (
              <div
                key={d._id || d.label}
                className="max-w-[200px] rounded-2xl border border-white/[0.1] bg-[#152f45]/55 px-4 py-3 text-center transition hover:border-[#00d2ff]/30"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#00d2ff]">{d.label}</p>
                <p className="mt-1.5 text-xs leading-snug text-white/58">{d.detail}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#0d1b2a] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="mb-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{faqSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{faqSection.title}</h2>
          </ScrollReveal>
          <div className="columns-1 gap-4 sm:columns-2">
            {faqs.map((f, i) => (
              <ScrollReveal key={f._id || f.q} variant="fade-up" delay={i * 0.03} className="mb-4 break-inside-avoid">
                <details className="group rounded-2xl border border-white/[0.1] bg-[#0a3146]/25 open:border-[#00d2ff]/35 open:bg-[#0a3146]/40">
                  <summary className="cursor-pointer list-none px-5 py-4 text-left text-sm font-semibold text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="mt-2 block text-[11px] font-normal text-[#00d2ff] opacity-80 group-open:hidden" aria-hidden>
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
            <h2 className="text-2xl font-black tracking-tight text-[#0f1f2e] sm:text-3xl">{cta.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-[#0f1f2e]/75">{cta.subtitle}</p>
          </div>
          <Link
            to={cta.buttonTo}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0f1f2e] px-6 py-3 text-sm font-bold text-[#00d2ff] shadow-lg transition hover:bg-[#152f45]"
          >
            {cta.buttonLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
