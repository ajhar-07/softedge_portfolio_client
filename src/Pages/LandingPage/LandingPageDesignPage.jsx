import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const PAGE_PATH = '/landing-page-design'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const fallbackLandingData = {
  heroImage:
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=2200&q=80',
  badge: 'Conversion-Centric Design',
  title: 'Landing Page Design',
  subtitle:
    'Build high-performing landing pages that turn clicks into leads, signups, and sales with strategy-led messaging and sharp visual storytelling.',
  quickActions: [
    { label: 'Landing Page Design', to: PAGE_PATH },
    { label: 'Website Design & Development', to: '/website-development' },
    { label: 'Content Management', to: '/content-management' },
    { label: 'Our Services', to: '/services' },
  ],
  campaignTypes: [
    {
      type: 'Lead Generation',
      detail: 'Service inquiry, form capture, and consultation booking focused pages.',
      accent: 'from-[#00d2ff]/45 to-[#0c4d75]/45',
    },
    {
      type: 'Product Launch',
      detail: 'Feature spotlight, urgency blocks, social proof, and CTA sequencing.',
      accent: 'from-[#1fa2ff]/35 to-[#12507a]/35',
    },
    {
      type: 'Webinar/Event Signup',
      detail: 'Speaker highlights, schedule modules, and conversion-friendly registration flow.',
      accent: 'from-[#00b09b]/35 to-[#0b5c66]/35',
    },
    {
      type: 'App Download',
      detail: 'Benefit-first storytelling with platform badges and trust indicators.',
      accent: 'from-[#667eea]/30 to-[#29408a]/35',
    },
  ],
  sectionBlocks: [
    {
      heading: 'Messaging Blueprint',
      points: [
        'Audience pain points and intent mapping',
        'Clear value proposition above the fold',
        'Headline-CTA alignment for better conversion',
      ],
    },
    {
      heading: 'Design Structure',
      points: [
        'Visual hierarchy with contrast-driven blocks',
        'Mobile-first responsive components',
        'Brand-consistent typography and color rhythm',
      ],
    },
    {
      heading: 'Trust & Proof',
      points: [
        'Testimonial and review placement strategy',
        'Client logos, badges, and credibility cards',
        'FAQ layer to reduce objection friction',
      ],
    },
    {
      heading: 'Growth Optimization',
      points: [
        'A/B ready sections and copy variants',
        'Heatmap + analytics event integration',
        'Post-launch CRO iteration workflow',
      ],
    },
  ],
  processFlow: [
    { step: 'Step 01', title: 'Brief & Goal Setup', text: 'Define offer, audience, and conversion target KPI.' },
    { step: 'Step 02', title: 'Wireframe & Copy', text: 'Craft page flow, section intent, and CTA placements.' },
    { step: 'Step 03', title: 'UI & Development', text: 'Design + build with responsive and fast-load standards.' },
    { step: 'Step 04', title: 'Launch & Experiment', text: 'Deploy with analytics and start optimization cycles.' },
  ],
  conversionStats: [
    { value: '+38%', label: 'Average lead uplift' },
    { value: '-42%', label: 'Bounce rate reduction' },
    { value: '2.4x', label: 'CTA click improvement' },
  ],
  pricingCards: [
    {
      name: 'Starter Landing',
      features: ['1 page design', 'Responsive build', 'Lead form integration', 'Basic analytics'],
      timeline: '3-5 days',
      price: 'From $120',
    },
    {
      name: 'Growth Landing',
      features: ['A/B-ready sections', 'Custom illustrations', 'Advanced copy blocks', 'CRM sync'],
      timeline: '7-10 days',
      price: 'From $280',
    },
    {
      name: 'Campaign Pro',
      features: ['Multi-variant setup', 'Heatmap tooling', 'Conversion dashboard', 'CRO support'],
      timeline: '2-3 weeks',
      price: 'Custom quote',
    },
  ],
  faqs: [
    {
      q: 'Can you redesign an existing landing page to improve results?',
      a: 'Yes. We audit your current page, identify conversion leaks, then redesign structure, copy, and CTA hierarchy.',
    },
    {
      q: 'Will the page load fast on mobile networks?',
      a: 'Absolutely. We optimize media and frontend delivery to maintain strong page speed across devices.',
    },
    {
      q: 'Can this connect with Facebook/Google Ads tracking?',
      a: 'Yes. We can configure Meta Pixel, Google tag events, and custom conversion tracking setup.',
    },
  ],
}

export default function LandingPageDesignPage() {
  const [landingData, setLandingData] = useState(fallbackLandingData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const mergeLandingPageFromApi = (apiData = {}) => {
      const normalizedFaqs = Array.isArray(apiData.faqs)
        ? apiData.faqs
        : Array.isArray(apiData.faq)
          ? apiData.faq
          : fallbackLandingData.faqs

      return {
        ...fallbackLandingData,
        ...apiData,
        quickActions: Array.isArray(apiData.quickActions) && apiData.quickActions.length ? apiData.quickActions : fallbackLandingData.quickActions,
        campaignTypes: Array.isArray(apiData.campaignTypes) && apiData.campaignTypes.length ? apiData.campaignTypes : fallbackLandingData.campaignTypes,
        sectionBlocks: Array.isArray(apiData.sectionBlocks) && apiData.sectionBlocks.length ? apiData.sectionBlocks : fallbackLandingData.sectionBlocks,
        processFlow: Array.isArray(apiData.processFlow) && apiData.processFlow.length ? apiData.processFlow : fallbackLandingData.processFlow,
        conversionStats: Array.isArray(apiData.conversionStats) && apiData.conversionStats.length ? apiData.conversionStats : fallbackLandingData.conversionStats,
        pricingCards: Array.isArray(apiData.pricingCards) && apiData.pricingCards.length ? apiData.pricingCards : fallbackLandingData.pricingCards,
        faqs: normalizedFaqs,
      }
    }

    const fetchPageData = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing-page-design-page`)
        if (!response.ok) throw new Error('Failed to fetch landing page data')
        const data = await response.json()
        if (isMounted) setLandingData(mergeLandingPageFromApi(data))
      } catch (requestError) {
        if (isMounted) {
          setLandingData(fallbackLandingData)
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
        <div className="h-[280px] w-full bg-cover bg-center sm:h-[360px]" style={{ backgroundImage: `url(${landingData.heroImage})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(0,210,255,0.28)_0%,transparent_34%),linear-gradient(115deg,rgba(0,11,30,0.95)_22%,rgba(7,30,48,0.78)_58%,rgba(0,11,30,0.48)_100%)]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal variant="slide-right" duration={0.5}>
            <p className="mb-3 inline-flex rounded-full border border-[#00d2ff]/45 bg-[#0a3146]/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {landingData.badge}
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{landingData.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">{landingData.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
            {landingData.quickActions.map((item) => (
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

        <ScrollReveal variant="fade-up" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {landingData.campaignTypes.map((item) => (
              <article key={item._id || item.type} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} p-5`}>
              <p className="text-lg font-black text-white">{item.type}</p>
              <p className="mt-2 text-sm leading-7 text-white/82">{item.detail}</p>
            </article>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.05} className="mt-14 rounded-[2rem] border border-[#00d2ff]/20 bg-[linear-gradient(160deg,rgba(8,36,54,0.8),rgba(2,15,30,0.95))] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-white">Landing Page Performance Architecture</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {landingData.sectionBlocks.map((block) => (
              <article key={block._id || block.heading} className="rounded-2xl border border-white/10 bg-[#0a3146]/30 p-5">
                <p className="text-lg font-bold text-[#00d2ff]">{block.heading}</p>
                <ul className="mt-3 space-y-2">
                  {(Array.isArray(block.points) ? block.points : []).map((point) => (
                    <li key={`${block._id || block.heading}-${point}`} className="flex gap-2 text-sm text-white/78">
                      <span className="text-[#00d2ff]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.08} className="mt-14">
          <h2 className="text-2xl font-black text-white">Execution Process</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {landingData.processFlow.map((item) => (
              <article key={item._id || item.step} className="rounded-2xl border border-white/10 bg-[#0a3146]/32 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d2ff]">{item.step}</p>
                <p className="mt-2 text-lg font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/74">{item.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal variant="fade-up" className="space-y-4">
            {landingData.conversionStats.map((stat) => (
              <div key={stat._id || stat.label} className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(12,40,57,0.9),rgba(6,18,34,0.95))] p-6">
                <p className="text-4xl font-black text-[#00d2ff]">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <h2 className="text-2xl font-black text-white">Packages</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {landingData.pricingCards.map((pkg) => (
                <article key={pkg._id || pkg.name} className="rounded-2xl border border-[#00d2ff]/18 bg-[linear-gradient(180deg,rgba(12,40,57,0.86),rgba(6,18,34,0.96))] p-5">
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
            {landingData.faqs.map((item) => (
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
