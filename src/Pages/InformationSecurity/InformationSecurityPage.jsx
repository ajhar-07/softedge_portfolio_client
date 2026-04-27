import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const MAIN_IMAGE =
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80'

const SERVICE_LINKS = [
  { label: 'Information Security', to: '/information-security' },
  { label: 'Mobile Platforms', to: '/mobile-platform' },
  { label: 'Data Synchronization', to: '/data-synchronization' },
  { label: 'Process Automation', to: '/process-automation' },
  { label: 'Event Processing', to: '/event-processing' },
  { label: 'Content Management', to: '/content-management' },
]

const FAQS = [
  {
    question: 'Why we are best company?',
    answer:
      'We are committed to providing our customers with exceptional service while offering our employees the best training. Our process is structured, measurable, and security-first.',
    open: true,
  },
  {
    question: 'How the template process works?',
    answer:
      'We start with discovery, continue with architecture and implementation, and then monitor outcomes with regular optimization cycles.',
  },
  {
    question: 'What should be listed on a business card?',
    answer:
      'Business name, your role, primary contact details, website, and a clear value proposition line are the essentials.',
  },
]

export default function InformationSecurityPage() {
  const { pathname } = useLocation()

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/80 via-[#000b1e]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Information Security</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/information-security" className="transition-colors hover:text-[#00d2ff]">
                Information Security
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-14">
        <aside className="space-y-5">
          <ScrollReveal variant="fade-up" className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h2 className="text-lg font-bold text-white">Main Services</h2>
            <ul className="mt-4 space-y-2">
              {SERVICE_LINKS.map((item) => {
                const isActive = pathname === item.to
                return (
                  <li key={`${item.label}-${item.to}`}>
                    <Link
                      to={item.to}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-[#00d2ff] text-[#000b1e]'
                          : 'bg-[#2d5e79]/80 text-white/90 hover:bg-[#00d2ff]/20 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.08} className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h3 className="text-lg font-bold text-white">Brochures</h3>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-sm bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                Download
              </button>
              <button
                type="button"
                className="rounded-sm border border-white/20 bg-[#1f475e] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#285f7e]"
              >
                Discover
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.12} className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="mt-4 flex gap-2">
              {['f', 't', 'i', 'in'].map((social) => (
                <button
                  key={social}
                  type="button"
                  className="h-8 w-8 bg-white/90 text-xs font-bold uppercase text-[#0a3146] transition hover:bg-[#00d2ff]"
                >
                  {social}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </aside>

        <main>
          <ScrollReveal variant="fade-up" className="space-y-6">
            <img
              src={MAIN_IMAGE}
              alt="Information security services"
              className="h-[260px] w-full border border-white/10 object-cover sm:h-[320px] lg:h-[360px]"
              loading="lazy"
            />

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Information Security</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Information security is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more
                or-less normal distribution of letters, as opposed to using content here.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="border border-white/10 bg-[#000b1e]/35 p-4">
                <h3 className="text-2xl font-bold text-[#00d2ff]">Strategy</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  We focus on the best practices for IT solutions and services with secure planning.
                </p>
              </article>
              <article className="border border-white/10 bg-[#000b1e]/35 p-4">
                <h3 className="text-2xl font-bold text-[#00d2ff]">Restructuring</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  We focus on the best practices for IT solutions and services through modern frameworks.
                </p>
              </article>
            </div>

            <p className="text-base leading-8 text-white/80">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words which do not look even slightly
              believable.
            </p>

            <div className="space-y-3 pt-2">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  open={faq.open}
                  className="group border border-white/10 bg-[#0a3146]/30 p-4 open:border-[#00d2ff]/35"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-white marker:content-none">
                    <div className="flex items-center justify-between gap-3">
                      <span>{faq.question}</span>
                      <span className="text-xl text-[#00d2ff] group-open:hidden">+</span>
                      <span className="hidden text-xl text-[#00d2ff] group-open:inline">−</span>
                    </div>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-white/80">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </main>
      </section>
    </div>
  )
}
