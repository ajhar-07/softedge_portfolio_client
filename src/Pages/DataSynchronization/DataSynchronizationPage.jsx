import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80'

const MAIN_IMAGE =
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80'

const SERVICE_LINKS = [
  { label: 'Information Security', to: '/information-security' },
  { label: 'Mobile Platforms', to: '/mobile-platform' },
  { label: 'Data Synchronization', to: '/data-synchronization' },
  { label: 'Process Automation', to: '/process-automation' },
  { label: 'Event Processing', to: '/event-processing' },
  { label: 'Content Management', to: '/content-management' },
]

function IconCube({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeLinejoin="round" />
      <path d="M12 22V12M3 7l9 5 9-5M12 12L21 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSliders({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M9 7h6M15 17h6M7 3h2" strokeLinecap="round" />
    </svg>
  )
}

export default function DataSynchronizationPage() {
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
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Data Synchronization</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/data-synchronization" className="transition-colors hover:text-[#00d2ff]">
                Data Synchronization
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-14">
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
            <div>
              <h2 className="text-4xl font-bold text-white">Data Synchronization</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Data synchronization keeps your systems aligned in real time. We focus on reliable pipelines, conflict
                resolution, and secure transfers so your teams always work from a single source of truth.
              </p>
            </div>

            <img
              src={MAIN_IMAGE}
              alt="Team collaborating on data and workflows"
              className="h-[320px] w-full border border-white/10 object-cover sm:h-[360px]"
              loading="lazy"
            />

            <p className="text-base leading-8 text-white/80">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which do not look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <article className="border border-white/10 bg-[#000b1e]/35 p-5">
                <IconCube className="mb-3 h-10 w-10 text-[#00d2ff]" />
                <h3 className="text-xl font-bold text-white">Processes Optimization</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Streamline how data moves between apps and databases with monitoring, retries, and clear ownership.
                </p>
              </article>
              <article className="border border-white/10 bg-[#000b1e]/35 p-5">
                <IconSliders className="mb-3 h-10 w-10 text-[#00d2ff]" />
                <h3 className="text-xl font-bold text-white">Standards Compliance</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Align synchronization policies with industry expectations and your internal security requirements.
                </p>
              </article>
            </div>

            <blockquote className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a3146]/90 px-6 py-8 sm:px-10">
              <span
                className="pointer-events-none absolute left-4 top-2 font-serif text-7xl leading-none text-white/10 sm:left-6 sm:text-8xl"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative z-[1] text-base leading-8 text-white/95 sm:text-lg">
                It&apos;s the perfect solution for our business. Thanks guys, keep up the good work! It&apos;s really
                wonderful. It&apos;s the perfect solution for our business.
              </p>
              <footer className="relative z-[1] mt-4 text-sm italic text-[#00d2ff]">— William Blake</footer>
            </blockquote>

            <p className="text-base leading-8 text-white/80">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
            </p>
          </ScrollReveal>
        </main>
      </section>
    </div>
  )
}
