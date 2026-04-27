import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const HERO_STRIP_IMAGE =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80'

const CARD_DEV_IMAGE =
  'https://images.unsplash.com/photo-1498050100023-c117bdebc3b4?auto=format&fit=crop&w=900&q=80'

const CARD_BRAND_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80'

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
    question: '1. Why we are best company?',
    answer:
      'We are committed to providing our customers with exceptional service while offering our employees the best training. Our automation approach is structured, measurable, and scalable.',
    open: true,
  },
  {
    question: '2. How the template process works?',
    answer:
      'We start with discovery, map workflows, implement integrations, and iterate with monitoring and feedback loops.',
  },
  {
    question: '3. What should be listed on a business card?',
    answer:
      'Business name, your role, primary contact details, website, and a clear value proposition line are the essentials.',
  },
]

function IconCode({ className = 'h-12 w-12' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMegaphone({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 11v2a2 2 0 002 2h2l4 4V5L7 9H5a2 2 0 00-2 2z" strokeLinejoin="round" />
      <path d="M16 8.5a5 5 0 010 7M19 5a9 9 0 010 14" strokeLinecap="round" />
    </svg>
  )
}

export default function ProcessAutomationPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Process Automation</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/process-automation" className="transition-colors hover:text-[#00d2ff]">
                Process Automation
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
              Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-sm bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                Download
              </button>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#000b1e] text-[10px] font-bold text-white">
                OR
              </span>
              <button
                type="button"
                className="rounded-sm border border-white/90 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a3146] transition hover:bg-white/90"
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
                  className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white text-xs font-bold uppercase text-[#00d2ff] transition hover:bg-[#00d2ff] hover:text-[#000b1e]"
                >
                  {social}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </aside>

        <main>
          <ScrollReveal variant="fade-up" className="space-y-6">
            <div className="relative isolate h-[220px] overflow-hidden border border-white/10 sm:h-[260px] lg:h-[280px]">
              <img
                src={HERO_STRIP_IMAGE}
                alt="Business automation presentation"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/70 via-transparent to-[#000b1e]/30" />
              <p className="absolute right-4 top-4 text-2xl font-black uppercase tracking-[0.15em] text-white/95 sm:right-6 sm:text-4xl">
                Automation
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Process Automation</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Process automation is a long established fact that a reader will be distracted by the readable content
                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using content here.
              </p>
              <p className="mt-3 text-base leading-8 text-white/80">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words which do not look even slightly
                believable.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="group relative isolate min-h-[240px] overflow-hidden border border-white/10 sm:min-h-[280px]">
                <img
                  src={CARD_DEV_IMAGE}
                  alt="Web development"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#000b1e]/55" />
                <div className="relative z-[1] flex h-full min-h-[240px] flex-col items-center justify-center p-5 text-center sm:min-h-[280px] sm:p-6">
                  <IconCode className="text-white drop-shadow-md" />
                  <h3 className="mt-4 text-2xl font-bold text-[#00d2ff]">Web Development</h3>
                  <p className="mt-2 max-w-xs text-sm leading-7 text-white/90">
                    We focus on the best practices for IT solutions and services with reliable delivery.
                  </p>
                </div>
              </article>

              <article className="relative isolate flex min-h-[240px] flex-col overflow-hidden border border-white/10 sm:min-h-[280px]">
                <img
                  src={CARD_BRAND_IMAGE}
                  alt="Branding services"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#000b1e]/35" />
                <div className="relative z-[1] flex flex-1" />
                <div className="relative z-[2] flex items-center justify-between gap-3 border-t border-white/10 bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <IconMegaphone className="shrink-0 text-[#00d2ff]" />
                    <h3 className="text-lg font-bold text-[#0a3146]">Branding Services</h3>
                  </div>
                  <span className="text-[#0a3146]" aria-hidden>
                    →
                  </span>
                </div>
              </article>
            </div>

            <p className="text-base leading-8 text-white/80">
              If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary.
            </p>

            <div className="space-y-3 pt-2">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  open={faq.open}
                  className="group border border-white/10 bg-[#0a3146]/30 p-4 open:border-[#00d2ff]/35"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between gap-3 text-white group-open:text-[#00d2ff]">
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
