import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80',
  missionVideo: 'https://cdn.pixabay.com/video/2020/10/26/53358-473305101_large.mp4',
  heroTitle: 'Services',
  sectionLabel: 'Our Services',
  sectionTitle: 'We Provide The Best Services',
  missionTitle: 'Mission is to Growth Your Business & More',
  services: [],
}

const FALLBACK_SERVICES = [
  {
    title: 'Information Security',
    description: 'We focus on the best practices for IT solutions and services.',
    icon: '🛡️',
  },
  {
    title: 'Mobile Platforms',
    description: 'We focus on the best practices for IT solutions and services.',
    icon: '📱',
  },
  {
    title: 'Data Synchronization',
    description: 'We focus on the best practices for IT solutions and services.',
    icon: '🔄',
  },
]

export default function ServicesPage() {
  const [pageData, setPageData] = useState({
    ...DEFAULT_PAGE_DATA,
    services: FALLBACK_SERVICES,
  })

  useEffect(() => {
    let ignore = false

    const loadServicesPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services-page`)
        if (!response.ok) {
          throw new Error('Failed to fetch services page data')
        }

        const data = await response.json()

        if (!ignore) {
          setPageData({
            heroImage: data.heroImage || DEFAULT_PAGE_DATA.heroImage,
            missionVideo: data.missionVideo || DEFAULT_PAGE_DATA.missionVideo,
            heroTitle: data.heroTitle || DEFAULT_PAGE_DATA.heroTitle,
            sectionLabel: data.sectionLabel || DEFAULT_PAGE_DATA.sectionLabel,
            sectionTitle: data.sectionTitle || DEFAULT_PAGE_DATA.sectionTitle,
            missionTitle: data.missionTitle || DEFAULT_PAGE_DATA.missionTitle,
            services: data.services?.length ? data.services : FALLBACK_SERVICES,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadServicesPage()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${pageData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/45 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/services" className="transition-colors hover:text-[#00d2ff]">
                Services
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <ScrollReveal as="header" className="mx-auto max-w-3xl text-center" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">
            {pageData.sectionLabel}
          </p>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{pageData.sectionTitle}</h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageData.services.map((service, i) => (
            <ScrollReveal
              key={service._id || service.title}
              variant="fade-up"
              delay={i * 0.08}
              className="group rounded-2xl border border-white/10 bg-[#000b1e]/40 p-6 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#00d2ff]/50 bg-white/5 text-2xl shadow-[0_0_0_6px_rgba(0,210,255,0.12)]">
                <span
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#00d2ff]/80"
                  style={{ animation: 'waterDrop 3.2s cubic-bezier(0.2, 0.7, 0.2, 1) infinite' }}
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#00d2ff]/65"
                  style={{ animation: 'waterDrop 3.2s cubic-bezier(0.2, 0.7, 0.2, 1) 1.1s infinite' }}
                />
                <span className="relative z-[1]" aria-hidden>
                  {service.icon}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-base leading-7 text-white/75">{service.description}</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-[#00d2ff]"
              >
                Read more
                <span aria-hidden>→</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <ScrollReveal
          variant="zoom-out"
          duration={0.55}
          className="relative isolate overflow-hidden rounded-sm border border-white/10"
        >
          <video
            className="h-[300px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Mission background video"
          >
            <source src={pageData.missionVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#001225]/60" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {pageData.missionTitle}
              </h2>
              <button
                type="button"
                className="mt-8 rounded-sm bg-[#00d2ff] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <style>
        {`
          @keyframes waterDrop {
            0% {
              transform: scale(0.8);
              opacity: 0.9;
            }
            65% {
              transform: scale(1.55);
              opacity: 0;
            }
            100% {
              transform: scale(1.55);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}
