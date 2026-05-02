import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

/** Same origin + Vite proxy when unset; otherwise full API origin (e.g. production). */
function getApiOrigin() {
  const raw = (import.meta.env.VITE_API_URL || '').trim()
  return raw.replace(/\/$/, '')
}

function eventProcessingPageUrl() {
  const origin = getApiOrigin()
  return origin ? `${origin}/api/event-processing-page` : '/api/event-processing-page'
}

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  leftImage:
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
  rightImage:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  heroTitle: 'Event Processing',
  sectionTitle: 'Event Processing',
  sectionDescription:
    'Event processing helps teams react instantly to system activities and user actions. We design robust event flows for real-time analytics, automation triggers, and reliable outcomes.',
  leftColumnText:
    'It is a long established fact that a reader will be distracted by the readable content of a page. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
  benefitsSectionTitle: 'Our work benefits',
  benefitsSectionDescription:
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
  benefitReadMoreLabel: 'Read more →',
  mainServicesTitle: 'Main Services',
  brochuresTitle: 'Brochures',
  brochuresDescription:
    'Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla.',
  brochuresPrimaryButton: 'Download',
  brochuresOrLabel: 'OR',
  brochuresSecondaryButton: 'Discover',
  followUsTitle: 'Follow Us',
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
    { text: 'The ability to turnaround consulting' },
    { text: 'Research beyond the business plan' },
    { text: 'Customer engagement matters' },
  ],
  benefits: [
    {
      title: 'Information Security',
      text: 'We focus on the best practices for IT solutions and services.',
      icon: '🛡️',
    },
    {
      title: 'Mobile Platforms',
      text: 'We focus on the best practices for IT solutions and services.',
      icon: '📱',
    },
    {
      title: 'Data Synchronization',
      text: 'We focus on the best practices for IT solutions and services.',
      icon: '🔄',
    },
    {
      title: 'Process Automation',
      text: 'We focus on the best practices for IT solutions and services.',
      icon: '⚙️',
    },
  ],
}

function mergeEventProcessingPayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || 'error' in data) {
    return null
  }
  return {
    ...fallbackPageData,
    ...data,
    serviceLinks:
      Array.isArray(data.serviceLinks) && data.serviceLinks.length > 0
        ? data.serviceLinks
        : fallbackPageData.serviceLinks,
    socials:
      Array.isArray(data.socials) && data.socials.length > 0 ? data.socials : fallbackPageData.socials,
    checklist:
      Array.isArray(data.checklist) && data.checklist.length > 0
        ? data.checklist
        : fallbackPageData.checklist,
    benefits:
      Array.isArray(data.benefits) && data.benefits.length > 0
        ? data.benefits
        : fallbackPageData.benefits,
  }
}

export default function EventProcessingPage() {
  const { pathname } = useLocation()
  const [pageData, setPageData] = useState(fallbackPageData)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(eventProcessingPageUrl())
        const data = await response.json()
        const merged = response.ok ? mergeEventProcessingPayload(data) : null
        if (merged) {
          setPageData(merged)
        } else {
          setPageData(fallbackPageData)
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/event-processing" className="transition-colors hover:text-[#00d2ff]">
                {pageData.heroTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:py-14">
        <aside className="space-y-5">
          <ScrollReveal variant="fade-up" className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h2 className="text-lg font-bold text-white">{pageData.mainServicesTitle}</h2>
            <ul className="mt-4 space-y-2">
              {pageData.serviceLinks.map((item) => {
                const isActive = pathname === item.to
                const rowKey = item._id || `${item.label}-${item.to}`
                return (
                  <li key={rowKey}>
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-sm bg-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                {pageData.brochuresPrimaryButton}
              </button>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#000b1e] text-[10px] font-bold text-white">
                {pageData.brochuresOrLabel}
              </span>
              <button
                type="button"
                className="rounded-sm border border-white/90 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a3146] transition hover:bg-white/90"
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
                  className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white text-xs font-bold uppercase text-[#00d2ff] transition hover:bg-[#00d2ff] hover:text-[#000b1e]"
                >
                  {social.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </aside>

        <main>
          <ScrollReveal variant="fade-up" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{pageData.sectionTitle}</h2>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionDescription}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-4">
                <img
                  src={pageData.leftImage}
                  alt="Team discussing event workflows"
                  className="h-[210px] w-full border border-white/10 object-cover sm:h-[240px]"
                  loading="lazy"
                />
                <p className="text-base leading-8 text-white/80">{pageData.leftColumnText}</p>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 text-sm font-semibold text-white/90">
                  {pageData.checklist.map((item) => {
                    const lineKey = item._id || item.text
                    return (
                      <li key={lineKey} className="flex items-center gap-2">
                        <span className="text-[#00d2ff]">✓</span>
                        {item.text}
                      </li>
                    )
                  })}
                </ul>
                <img
                  src={pageData.rightImage}
                  alt="Colleagues reviewing operational data"
                  className="h-[210px] w-full border border-white/10 object-cover sm:h-[240px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{pageData.benefitsSectionTitle}</h3>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.benefitsSectionDescription}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pageData.benefits.map((benefit, index) => (
                <article
                  key={benefit._id || benefit.title}
                  className="flex gap-4 border border-white/10 bg-[#000b1e]/35 p-4"
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#00d2ff]/50 bg-white/5 text-xl">
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#00d2ff]/80"
                      style={{
                        animation: `waterDrop 3.2s cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 0.4}s infinite`,
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#00d2ff]/60"
                      style={{
                        animation: `waterDrop 3.2s cubic-bezier(0.2, 0.7, 0.2, 1) ${0.9 + index * 0.4}s infinite`,
                      }}
                    />
                    <span className="relative z-[1]" aria-hidden>
                      {benefit.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{benefit.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-white/75">{benefit.text}</p>
                    <button type="button" className="mt-2 text-sm font-semibold text-[#00d2ff]">
                      {pageData.benefitReadMoreLabel}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </main>
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
