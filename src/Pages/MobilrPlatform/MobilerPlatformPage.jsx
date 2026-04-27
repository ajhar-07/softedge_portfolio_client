import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const TOP_IMAGE_LEFT =
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80'
const TOP_IMAGE_RIGHT =
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80'

const SERVICE_LINKS = [
  { label: 'Information Security', to: '/information-security' },
  { label: 'Mobile Platforms', to: '/mobile-platform' },
  { label: 'Data Synchronization', to: '/data-synchronization' },
  { label: 'Process Automation', to: '/process-automation' },
  { label: 'Event Processing', to: '/event-processing' },
  { label: 'Content Management', to: '/content-management' },
]

const TEAM = [
  {
    name: 'Hamish French',
    role: 'Computer Scientist',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Zara Matheson',
    role: 'CEO',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Dylan Bonney',
    role: 'Process Analyst',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
]

const SKILLS = [
  { label: 'Consulting', value: 65 },
  { label: 'Development', value: 80 },
  { label: 'Management', value: 55 },
]

export default function MobilerPlatformPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Mobile Platforms</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/mobile-platform" className="transition-colors hover:text-[#00d2ff]">
                Mobile Platforms
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
            <div className="grid gap-4 sm:grid-cols-2">
              <img
                src={TOP_IMAGE_LEFT}
                alt="Mobile platform planning"
                className="h-[200px] w-full border border-white/10 object-cover sm:h-[230px]"
                loading="lazy"
              />
              <img
                src={TOP_IMAGE_RIGHT}
                alt="Mobile device solution"
                className="h-[200px] w-full border border-white/10 object-cover sm:h-[230px]"
                loading="lazy"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Mobile Platforms</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Mobile platform strategy provides strong foundations for secure apps, strong UX, and scalable backend
                integrations. We build products that stay reliable across device versions and high traffic.
              </p>
            </div>

            <div className="grid gap-2 text-sm font-semibold text-white/90 sm:grid-cols-2">
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

            <p className="text-base leading-8 text-white/80">
              There are many variations of passages available, but the majority have suffered alteration in some form,
              by injected humour, or randomised words which do not look even slightly believable.
            </p>

            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Our Team</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {TEAM.map((member) => (
                  <article key={member.name} className="border border-white/10 bg-[#000b1e]/35 p-3 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                    <h4 className="mt-3 text-lg font-bold text-white">{member.name}</h4>
                    <p className="text-sm text-white/70">{member.role}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {SKILLS.map((skill, index) => (
                <div key={skill.label}>
                  <div className="mb-1 flex items-center justify-between text-sm font-semibold text-white/85">
                    <span>{skill.label}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/15">
                    <div
                      className="h-full bg-[#00d2ff]"
                      style={{
                        width: `${skill.value}%`,
                        transformOrigin: 'left',
                        animation: `skillGrow 1.4s ease-out ${index * 0.25}s both`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </main>
      </section>

      <style>
        {`
          @keyframes skillGrow {
            0% {
              transform: scaleX(0);
              opacity: 0.35;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}
