import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

function getApiOrigin() {
  const raw = (import.meta.env.VITE_API_URL || '').trim()
  return raw.replace(/\/$/, '')
}

function contentManagementPageUrl() {
  const origin = getApiOrigin()
  return origin ? `${origin}/api/content-management-page` : '/api/content-management-page'
}

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  mainImage:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=80',
  heroTitle: 'Content Management',
  sectionTitle: 'Content Management',
  sectionDescription:
    'Content management gives your team a single place to plan, publish, and optimize digital experiences. We focus on structured workflows, reusable assets, and scalable governance.',
  sectionSecondaryDescription:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
  benefitsSectionTitle: 'Our work benefits',
  benefitsSectionDescription:
    'There are many variations of passages available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
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
  gallery: [
    { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80' },
    { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80' },
  ],
  checklist: [
    { text: 'Marketing options and rates' },
    { text: 'Research beyond the business plan' },
    { text: 'The ability to turnaround consulting' },
    { text: 'Customer engagement matters' },
  ],
}

function mergeContentManagementPayload(data) {
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
    gallery:
      Array.isArray(data.gallery) && data.gallery.length > 0 ? data.gallery : fallbackPageData.gallery,
    checklist:
      Array.isArray(data.checklist) && data.checklist.length > 0
        ? data.checklist
        : fallbackPageData.checklist,
  }
}

export default function ContentManagementPage() {
  const { pathname } = useLocation()
  const [pageData, setPageData] = useState(fallbackPageData)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(contentManagementPageUrl())
        const data = await response.json()
        const merged = response.ok ? mergeContentManagementPayload(data) : null
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
              <Link to="/content-management" className="transition-colors hover:text-[#00d2ff]">
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
            <img
              src={pageData.mainImage}
              alt="Content management dashboard"
              className="h-[250px] w-full border border-white/10 object-cover sm:h-[300px] lg:h-[340px]"
              loading="lazy"
            />

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{pageData.sectionTitle}</h2>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionDescription}</p>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionSecondaryDescription}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {pageData.gallery.map((item, i) => {
                const src = item.url
                const key = item._id || src || i
                return (
                  <img
                    key={key}
                    src={src}
                    alt={`Content management gallery ${i + 1}`}
                    className="h-28 w-full border border-white/10 object-cover"
                    loading="lazy"
                  />
                )
              })}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{pageData.benefitsSectionTitle}</h3>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.benefitsSectionDescription}</p>
            </div>

            <div className="grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2">
              {pageData.checklist.map((item) => {
                const lineKey = item._id || item.text
                return (
                  <p key={lineKey} className="flex items-center gap-2">
                    <span className="text-[#00d2ff]">✓</span>
                    {item.text}
                  </p>
                )
              })}
            </div>
          </ScrollReveal>
        </main>
      </section>
    </div>
  )
}
