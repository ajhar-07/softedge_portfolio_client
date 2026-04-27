import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const FAQ_ITEMS = [
  {
    q: 'How long does it take to deliver a website project?',
    a: 'Typical business websites take 2-6 weeks depending on complexity, content readiness, and revision rounds.',
  },
  {
    q: 'Do you provide support after project delivery?',
    a: 'Yes. We provide post-launch maintenance, bug fixes, and optional monthly support plans.',
  },
  {
    q: 'Can I request custom features for my business workflow?',
    a: 'Absolutely. We build custom modules and integrations tailored to your team and business operations.',
  },
  {
    q: 'Will my website be mobile friendly and SEO optimized?',
    a: 'Yes, all pages are built responsive-first with clean structure and on-page SEO best practices.',
  },
  {
    q: 'Do you redesign existing websites?',
    a: 'Yes, we can modernize your existing site, improve performance, and align it with your current brand.',
  },
]

export default function FAQpage() {
  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/45 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">FAQ</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/faq" className="transition-colors hover:text-[#00d2ff]">
                FAQ
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-14">
        <ScrollReveal className="lg:col-span-4" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Support Center</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-base leading-8 text-white/75">
            Find quick answers to common questions about our services, timelines, and support process.
          </p>

          <div className="mt-7 rounded-xl border border-white/10 bg-[#000b1e]/40 p-5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.18em] text-[#00d2ff]">Need more help?</p>
            <p className="mt-2 text-white/80">Email us at support@softedge.com or call (+44) 123 456 789.</p>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <ScrollReveal
                key={item.q}
                variant="fade-up"
                delay={i * 0.06}
                className="collapse collapse-plus rounded-xl border border-white/10 bg-[#0a3146]/35"
              >
                <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                <div className="collapse-title text-lg font-semibold text-white">{item.q}</div>
                <div className="collapse-content text-base leading-7 text-white/75">{item.a}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
