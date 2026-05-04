import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CYAN = '#00d2ff'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  historyEyebrow: 'Our History',
  historyTitle: 'How We Started',
  history: [
    {
      _id: 'default-hist-1',
      year: '2000',
      title: 'Company founded',
      description:
        "We're committed to providing customers exceptional service offering employees the best training.",
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-hist-2',
      year: '2005',
      title: 'Hiring more staff',
      description:
        "We're committed to providing customers exceptional service offering employees the best training.",
      image:
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-hist-3',
      year: '2007',
      title: 'Working on projects',
      description:
        "We're committed to providing customers exceptional service offering employees the best training.",
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    },
  ],
  pricingEyebrow: 'Pricing Table',
  pricingTitle: 'Our Pricing Plans',
  pricingFeatures: [
    { _id: 'default-feat-1', text: '30 Analytics Campaign' },
    { _id: 'default-feat-2', text: 'Branded Reports' },
    { _id: 'default-feat-3', text: '700 Keywords' },
    { _id: 'default-feat-4', text: '100 Social Account' },
    { _id: 'default-feat-5', text: 'Phone & Email Support' },
  ],
  plans: [
    {
      _id: 'default-plan-1',
      name: 'Basic',
      price: 59,
      image:
        'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-plan-2',
      name: 'Standard',
      price: 99,
      image:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-plan-3',
      name: 'Professional',
      price: 129,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    },
  ],
  planButtonLabel: 'Start Now',
  statsBannerImage:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80',
  stats: [
    { _id: 'default-stat-1', value: '15k', label: 'Customers' },
    { _id: 'default-stat-2', value: '78+', label: 'Branches' },
    { _id: 'default-stat-3', value: '3k', label: 'Employees' },
    { _id: 'default-stat-4', value: '8+', label: 'Countries' },
  ],
}

function mergeHowWeWorkPageData(data) {
  const d = DEFAULT_PAGE_DATA
  return {
    heroImage: data.heroImage || d.heroImage,
    historyEyebrow: data.historyEyebrow || d.historyEyebrow,
    historyTitle: data.historyTitle || d.historyTitle,
    history: data.history?.length ? data.history : d.history,
    pricingEyebrow: data.pricingEyebrow || d.pricingEyebrow,
    pricingTitle: data.pricingTitle || d.pricingTitle,
    pricingFeatures: data.pricingFeatures?.length ? data.pricingFeatures : d.pricingFeatures,
    plans: data.plans?.length ? data.plans : d.plans,
    planButtonLabel: data.planButtonLabel || d.planButtonLabel,
    statsBannerImage: data.statsBannerImage || d.statsBannerImage,
    stats: data.stats?.length ? data.stats : d.stats,
  }
}

export default function HowWeWork() {
  const historySliderRef = useRef(null)
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  const history = pageData.history || []
  const plans = pageData.plans || []
  const pricingFeatures = pageData.pricingFeatures || []
  const stats = pageData.stats || []

  useEffect(() => {
    let ignore = false

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/how-we-work-page`)
        if (!response.ok) throw new Error('Failed to fetch how we work page')
        const data = await response.json()
        if (!ignore) {
          setPageData(mergeHowWeWorkPageData(data))
        }
      } catch {
        if (!ignore) {
          setPageData(DEFAULT_PAGE_DATA)
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  const slideHistory = (direction) => {
    const el = historySliderRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.82, 320)
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/45 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">How We Work</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/how-we-work" className="transition-colors hover:text-[#00d2ff]">
                How We Work
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <ScrollReveal as="header" className="mx-auto max-w-3xl text-center" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.historyEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{pageData.historyTitle}</h2>
        </ScrollReveal>

        <div className="mt-8 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => slideHistory(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#000b1e]/40 text-xl text-white transition hover:border-[#00d2ff]/65 hover:text-[#00d2ff]"
            aria-label="Previous history cards"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => slideHistory(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#000b1e]/40 text-xl text-white transition hover:border-[#00d2ff]/65 hover:text-[#00d2ff]"
            aria-label="Next history cards"
          >
            →
          </button>
        </div>

        <div
          ref={historySliderRef}
          className="mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:thin]"
          aria-label="How We Started cards slider"
        >
          {history.map((item, i) => (
            <ScrollReveal
              key={item._id || `${item.year}-${item.title}-${i}`}
              variant="fade-up"
              delay={i * 0.1}
              className="w-[88%] shrink-0 snap-start overflow-hidden border border-white/10 bg-[#0a3146]/30 sm:w-[66%] md:w-[48%] lg:w-[32%]"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" loading="lazy" />
                <div
                  className="absolute left-1/2 top-2 -translate-x-1/2 px-4 py-1 text-sm font-bold text-[#000b1e]"
                  style={{ backgroundColor: CYAN }}
                >
                  {item.year}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/70">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <ScrollReveal as="header" className="mx-auto max-w-3xl text-center" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.pricingEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{pageData.pricingTitle}</h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal
              key={plan._id || plan.name}
              variant="fade-up"
              delay={i * 0.1}
              className="overflow-hidden border border-white/10 bg-[#0a3146]/30"
            >
              <div className="relative">
                <img src={plan.image} alt={plan.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="absolute left-0 top-0 bg-[#00d2ff] px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#000b1e] sm:py-4 sm:text-xs [writing-mode:horizontal-tb] sm:[writing-mode:vertical-rl]">
                  {plan.name}
                </div>
                <div className="absolute bottom-3 right-3 rounded-sm bg-[#0a3146] px-3 py-2 text-center">
                  <p className="text-4xl font-bold text-white">${plan.price}</p>
                  <p className="text-xs uppercase text-white/70">Monthly</p>
                </div>
              </div>

              <ul className="divide-y divide-white/10">
                {pricingFeatures.map((feature) => (
                  <li key={feature._id || feature.text} className="px-4 py-3 text-sm text-white/85">
                    {feature.text}
                  </li>
                ))}
              </ul>

              <div className="p-4">
                <button
                  type="button"
                  className="w-full border border-white/20 bg-[#00d2ff] px-4 py-2 text-sm font-bold uppercase text-[#000b1e] transition hover:bg-[#38ddff]"
                >
                  {pageData.planButtonLabel}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="relative border border-white/10 pb-16 md:pb-20">
          <div className="overflow-hidden">
            <img
              src={pageData.statsBannerImage}
              alt="Team high five"
              className="h-[280px] w-full object-cover sm:h-[320px] md:h-[360px]"
              loading="lazy"
            />
          </div>
          <ScrollReveal
            variant="zoom-out"
            duration={0.55}
            className="absolute bottom-0 left-1/2 w-[88%] -translate-x-1/2 translate-y-1/2 border border-white/15 bg-[#000b1e]/45 px-4 py-6 text-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150 sm:w-[82%] md:w-[76%]"
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat._id || stat.label} className="border-white/10 odd:border-r md:border-r md:last:border-r-0">
                  <p className="text-3xl font-bold text-[#00d2ff] sm:text-4xl lg:text-5xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-28 md:h-32" />
    </div>
  )
}
