import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const fallbackPageData = {
  heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  topImageLeft: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
  topImageRight: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80',
  heroTitle: 'Mobile Platforms',
  sectionTitle: 'Mobile Platforms',
  sectionDescription:
    'Mobile platform strategy provides strong foundations for secure apps, strong UX, and scalable backend integrations. We build products that stay reliable across device versions and high traffic.',
  bottomDescription:
    'There are many variations of passages available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
  mainServicesTitle: 'Main Services',
  brochuresTitle: 'Brochures',
  brochuresDescription: 'Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla.',
  brochuresPrimaryButton: 'Download',
  brochuresSecondaryButton: 'Discover',
  followUsTitle: 'Follow Us',
  teamTitle: 'Our Team',
  serviceLinks: [
    { label: 'Information Security', to: '/information-security' },
    { label: 'Mobile Platforms', to: '/mobile-platform' },
    { label: 'Data Synchronization', to: '/data-synchronization' },
    { label: 'Process Automation', to: '/process-automation' },
    { label: 'Event Processing', to: '/event-processing' },
    { label: 'Content Management', to: '/content-management' },
  ],
  socials: [{ label: 'f' }, { label: 't' }, { label: 'i' }, { label: 'in' }],
  checklist: [
    { text: 'Marketing options and rates' },
    { text: 'Research beyond the business plan' },
    { text: 'The ability to turnaround consulting' },
    { text: 'Customer engagement matters' },
  ],
  team: [
    {
      name: 'Hamish French',
      role: 'Computer Scientist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Zara Matheson',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Dylan Bonney',
      role: 'Process Analyst',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    },
  ],
  skills: [
    { label: 'Consulting', value: 65 },
    { label: 'Development', value: 80 },
    { label: 'Management', value: 55 },
  ],
}

export default function MobilerPlatformPage() {
  const { pathname } = useLocation()
  const [pageData, setPageData] = useState(fallbackPageData)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/mobile-platform-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData({
            ...fallbackPageData,
            ...data,
            serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
            socials: data.socials?.length ? data.socials : fallbackPageData.socials,
            checklist: data.checklist?.length ? data.checklist : fallbackPageData.checklist,
            team: data.team?.length ? data.team : fallbackPageData.team,
            skills: data.skills?.length ? data.skills : fallbackPageData.skills,
          })
        }
      } catch (_error) {
        setPageData(fallbackPageData)
      }
    }

    loadPage()
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/80 via-[#000b1e]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{pageData.heroTitle}</h1>
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
            <h2 className="text-lg font-bold text-white">{pageData.mainServicesTitle}</h2>
            <ul className="mt-4 space-y-2">
              {pageData.serviceLinks.map((item) => {
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
            <h3 className="text-lg font-bold text-white">{pageData.brochuresTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-white/80">{pageData.brochuresDescription}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-sm bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                {pageData.brochuresPrimaryButton}
              </button>
              <button
                type="button"
                className="rounded-sm border border-white/20 bg-[#1f475e] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#285f7e]"
              >
                {pageData.brochuresSecondaryButton}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.12} className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h3 className="text-lg font-bold text-white">{pageData.followUsTitle}</h3>
            <div className="mt-4 flex gap-2">
              {pageData.socials.map((social) => (
                <button
                  key={social._id || social.label}
                  type="button"
                  className="h-8 w-8 bg-white/90 text-xs font-bold uppercase text-[#0a3146] transition hover:bg-[#00d2ff]"
                >
                  {social.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </aside>

        <main>
          <ScrollReveal variant="fade-up" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <img
                src={pageData.topImageLeft}
                alt="Mobile platform planning"
                className="h-[200px] w-full border border-white/10 object-cover sm:h-[230px]"
                loading="lazy"
              />
              <img
                src={pageData.topImageRight}
                alt="Mobile device solution"
                className="h-[200px] w-full border border-white/10 object-cover sm:h-[230px]"
                loading="lazy"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{pageData.sectionTitle}</h2>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionDescription}</p>
            </div>

            <div className="grid gap-2 text-sm font-semibold text-white/90 sm:grid-cols-2">
              {pageData.checklist.map((item) => (
                <p key={item._id || item.text} className="flex items-center gap-2">
                  <span className="text-[#00d2ff]">✓</span>
                  {item.text}
                </p>
              ))}
            </div>

            <p className="text-base leading-8 text-white/80">{pageData.bottomDescription}</p>

            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.teamTitle}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {pageData.team.map((member) => (
                  <article key={member._id || member.name} className="border border-white/10 bg-[#000b1e]/35 p-3 text-center">
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
              {pageData.skills.map((skill, index) => (
                <div key={skill._id || skill.label}>
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
