import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const MAIN_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=80'

const GALLERY = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
]

const SERVICE_LINKS = [
  { label: 'Information Security', to: '/information-security' },
  { label: 'Mobile Platforms', to: '/mobile-platform' },
  { label: 'Data Synchronization', to: '/data-synchronization' },
  { label: 'Process Automation', to: '/process-automation' },
  { label: 'Event Processing', to: '/event-processing' },
  { label: 'Content Management', to: '/content-management' },
]

export default function ContentManagementPage() {
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
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Content Management</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/content-management" className="transition-colors hover:text-[#00d2ff]">
                Content Management
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
            <img
              src={MAIN_IMAGE}
              alt="Content management dashboard"
              className="h-[300px] w-full border border-white/10 object-cover sm:h-[340px]"
              loading="lazy"
            />

            <div>
              <h2 className="text-4xl font-bold text-white">Content Management</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Content management gives your team a single place to plan, publish, and optimize digital experiences.
                We focus on structured workflows, reusable assets, and scalable governance.
              </p>
              <p className="mt-3 text-base leading-8 text-white/80">
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {GALLERY.map((image, i) => (
                <img
                  key={image}
                  src={image}
                  alt={`Content management gallery ${i + 1}`}
                  className="h-28 w-full border border-white/10 object-cover"
                  loading="lazy"
                />
              ))}
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">Our work benefits</h3>
              <p className="mt-3 text-base leading-8 text-white/80">
                There are many variations of passages available, but the majority have suffered alteration in some
                form, by injected humour, or randomised words which do not look even slightly believable.
              </p>
            </div>

            <div className="grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2">
              {[
                'Marketing options and rates',
                'Research beyond the business plan',
                'The ability to turnaround consulting',
                'Customer engagement matters',
              ].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <span className="text-[#00d2ff]">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </main>
      </section>
    </div>
  )
}
