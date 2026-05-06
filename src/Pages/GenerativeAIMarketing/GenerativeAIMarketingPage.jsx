import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1674027392844-8d3fd2fda8f4?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'AI-Powered Growth',
  heroTitle: 'Generative AI For Marketing',
  breadcrumbTitle: 'Generative AI Marketing',
  introBadge: 'Creative Intelligence',
  introTitle: 'Produce, Personalize, and Optimize Marketing Content at Scale',
  introDescription:
    'Generative AI helps marketing teams accelerate campaign execution without sacrificing quality. We design practical AI workflows that produce consistent messaging, support rapid experimentation, and improve decision-making with analytics.',
  introDescriptionBottom:
    'From awareness campaigns to conversion-focused creatives, our framework combines strategic prompts, human review, and performance insights to deliver measurable business outcomes.',
  workflowTitle: 'Implementation Workflow',
  capabilitiesTitle: 'Core Capabilities',
  faqTitle: 'FAQ & Next Step',
  ctaButtonText: 'Launch AI Marketing',
  ctaButtonLink: '/services',
  marketingUseCases: [
    {
      _id: 'usecase-1',
      title: 'AI Content Studio',
      description:
        'Generate campaign copies, social captions, ad variations, blog drafts, and product descriptions with brand-tone consistency.',
      points: ['Brand voice prompt library', 'Multi-format content generation', 'Fast localization for multiple audiences'],
    },
    {
      _id: 'usecase-2',
      title: 'Campaign Personalization Engine',
      description:
        'Create audience-segment specific messaging, offers, and CTAs to improve engagement and conversion at each funnel stage.',
      points: ['Segment-level messaging', 'Dynamic personalization rules', 'Offer optimization by behavior'],
    },
    {
      _id: 'usecase-3',
      title: 'Creative Performance Intelligence',
      description:
        'Analyze ad creatives and campaign outcomes to identify top-performing messaging patterns and optimization opportunities.',
      points: ['Creative scoring signals', 'A/B message iteration', 'Performance trend dashboard'],
    },
  ],
  workflowStages: [
    {
      _id: 'workflow-1',
      phase: 'Stage 1',
      title: 'Brand Context Setup',
      text: 'Collect product, audience, positioning, and tone rules to build an AI-ready marketing knowledge base.',
    },
    {
      _id: 'workflow-2',
      phase: 'Stage 2',
      title: 'Prompt & Template Design',
      text: 'Create reusable prompt templates for campaigns, channels, audience segments, and conversion goals.',
    },
    {
      _id: 'workflow-3',
      phase: 'Stage 3',
      title: 'Production & Review Pipeline',
      text: 'Automate draft generation with human-in-the-loop review for quality, compliance, and final publishing.',
    },
    {
      _id: 'workflow-4',
      phase: 'Stage 4',
      title: 'Measure & Optimize',
      text: 'Track engagement, conversion, and ROI data to continuously improve prompts and content strategy.',
    },
  ],
  capabilityTags: [
    { _id: 'cap-1', text: 'AI copywriting' },
    { _id: 'cap-2', text: 'Ad headline generation' },
    { _id: 'cap-3', text: 'Email sequence drafting' },
    { _id: 'cap-4', text: 'Social media calendar content' },
    { _id: 'cap-5', text: 'SEO-focused article briefs' },
    { _id: 'cap-6', text: 'Landing page message variants' },
    { _id: 'cap-7', text: 'Audience intent-based content' },
    { _id: 'cap-8', text: 'Campaign performance insights' },
    { _id: 'cap-9', text: 'Multilingual marketing content' },
    { _id: 'cap-10', text: 'Creative prompt governance' },
  ],
  resultCards: [
    { _id: 'result-1', value: '4x', label: 'Faster content production cycle' },
    { _id: 'result-2', value: 'Higher', label: 'Campaign relevance per audience' },
    { _id: 'result-3', value: 'Lower', label: 'Manual content bottleneck' },
    { _id: 'result-4', value: 'Data-led', label: 'Creative decision process' },
  ],
  faqs: [
    {
      _id: 'faq-1',
      q: 'Will AI replace my marketing team?',
      a: 'No. AI accelerates drafting and experimentation, while your team controls strategy, brand direction, and final approvals.',
    },
    {
      _id: 'faq-2',
      q: 'How do you keep content on-brand?',
      a: 'We build brand voice instructions, approved prompt templates, and review gates before content goes live.',
    },
    {
      _id: 'faq-3',
      q: 'Can AI content be measured properly?',
      a: 'Yes. We connect content outputs with campaign metrics and conversion signals for continuous optimization.',
    },
  ],
}

export default function GenerativeAIMarketingPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/generative-ai-marketing-page`)
        if (!response.ok) {
          return
        }
        const data = await response.json()
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          marketingUseCases: Array.isArray(data.marketingUseCases) ? data.marketingUseCases : DEFAULT_PAGE_DATA.marketingUseCases,
          workflowStages: Array.isArray(data.workflowStages) ? data.workflowStages : DEFAULT_PAGE_DATA.workflowStages,
          capabilityTags: Array.isArray(data.capabilityTags) ? data.capabilityTags : DEFAULT_PAGE_DATA.capabilityTags,
          resultCards: Array.isArray(data.resultCards) ? data.resultCards : DEFAULT_PAGE_DATA.resultCards,
          faqs: Array.isArray(data.faqs) ? data.faqs : DEFAULT_PAGE_DATA.faqs,
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
          className="h-[230px] w-full bg-cover bg-center sm:h-[260px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,210,255,0.18),transparent_45%),linear-gradient(120deg,rgba(0,11,30,0.9),rgba(0,11,30,0.55),rgba(0,11,30,0.25))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="inline-flex items-center gap-2 rounded-sm bg-[#1f4358]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/generative-ai-marketing" className="transition-colors hover:text-[#00d2ff]">
                {pageData.breadcrumbTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.introBadge}</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {pageData.introTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {pageData.introDescription}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {pageData.introDescriptionBottom}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="grid gap-4 rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6">
            {pageData.resultCards.map((item) => (
              <div key={item._id || item.label} className="rounded-xl border border-white/10 bg-[#0a3146]/35 px-4 py-3">
                <p className="text-2xl font-black text-[#00d2ff]">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{item.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.marketingUseCases.map((item, index) => (
            <ScrollReveal
              key={item._id || item.title}
              variant="fade-up"
              delay={index * 0.08}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(0,11,30,0.8),rgba(7,36,54,0.72))] p-5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.65)]"
            >
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
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

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[#041d33]/72 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.workflowTitle}</h3>
          <div className="mt-4 space-y-3">
            {pageData.workflowStages.map((step) => (
              <div key={step._id || step.title} className="rounded-lg border border-white/10 bg-[#08253b]/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{step.phase}</p>
                <h4 className="mt-1 text-lg font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.capabilitiesTitle}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pageData.capabilityTags.map((tag) => (
              <div key={tag._id || tag.text} className="rounded-lg border border-white/10 bg-[#0a3146]/38 px-3 py-2 text-sm text-white/85">
                {tag.text}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/28 bg-[linear-gradient(145deg,rgba(0,11,30,0.92),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.faqTitle}</h3>
              <div className="mt-4 space-y-3">
                {pageData.faqs.map((item) => (
                  <article key={item._id || item.q} className="rounded-lg border border-white/12 bg-[#0a3146]/35 p-4">
                    <p className="text-sm font-semibold text-white">{item.q}</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
            <Link
              to={pageData.ctaButtonLink || '/services'}
              className="inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
            >
              {pageData.ctaButtonText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

