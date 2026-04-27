import { Link } from 'react-router-dom'

import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

const CYAN = '#00d2ff'
const NAVY = '#000b1e'

const FEATURES = [
  '30 Analytics Campaign',
  'Branded Reports',
  '700 Keywords',
  '100 Social Account',
  'Phone & Email Support',
]

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 59,
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 99,
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
  },
]

const CARD_VARIANTS = ['fade-up', 'slide-left', 'slide-right']

export default function PricingPlans() {
  return (
    <section
      className="relative w-full bg-transparent px-4 pt-3 pb-10 sm:px-6 sm:pt-4 sm:pb-12 md:px-10 md:pt-6 md:pb-14 lg:px-12 lg:pt-8 lg:pb-16"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto max-w-3xl text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] sm:text-sm"
            style={{ color: CYAN }}
          >
            Pricing table
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/25" />
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full ring-2 ring-white/20"
              style={{ backgroundColor: CYAN }}
              aria-hidden
            />
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/25" />
          </div>
          <h2
            id="pricing-heading"
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.15rem]"
          >
            Our Pricing Plans
          </h2>
        </header>

        <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, i) => (
            <ScrollReveal
              key={plan.id}
              variant={CARD_VARIANTS[i % CARD_VARIANTS.length]}
              delay={i * 0.12}
              duration={0.55}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#000b1e]/35 shadow-[0_16px_48px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                <img
                  src={plan.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div
                  className="absolute left-0 top-0 z-10 bg-[#00d2ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#000b1e] shadow-md [writing-mode:horizontal-tb] sm:px-0 sm:py-6 sm:pl-2.5 sm:pr-3 sm:text-xs sm:[writing-mode:vertical-rl]"
                >
                  {plan.name}
                </div>
                <div
                  className="absolute bottom-3 right-3 z-10 min-w-[5.5rem] rounded-md border border-white/15 px-4 py-3 text-center shadow-lg"
                  style={{ backgroundColor: NAVY }}
                >
                  <p className="text-2xl font-bold leading-none text-white sm:text-[1.65rem]">
                    ${plan.price}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/75">
                    Monthly
                  </p>
                </div>
              </div>

              <ul className="flex flex-1 flex-col divide-y divide-white/10 px-1 py-2">
                {FEATURES.map((line) => (
                  <li
                    key={line}
                    className="px-4 py-3.5 text-center text-sm leading-snug text-white/85 sm:py-4 sm:text-[0.9375rem]"
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 px-5 pb-6 pt-5">
                <Link
                  to="/"
                  className="btn-brand flex w-full items-center justify-center rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-black shadow-[0_8px_24px_-8px_rgba(0,210,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000b1e]"
                  style={{ backgroundColor: CYAN }}
                >
                  Start Now
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
