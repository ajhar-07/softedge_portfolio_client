import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PAGE_PATH = '/educational-institute-management'

const fallbackPageData = {
  heroImage:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80',
  heroStripImage:
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
  heroTitle: 'Educational Institute Management Software',
  sectionTitle: 'One platform for your entire campus',
  sectionDescription:
    'SoftEdge Educational Institute Management Software (EIMS) brings admissions, academics, finance, HR, examinations, library, transport, and communication into a single secure system. Reduce paperwork, improve transparency for guardians, and give teachers and administrators accurate data in real time.',
  sectionDescriptionBottom:
    'Whether you run a school, college, coaching centre, or multi-branch group, modules can be phased in to match your budget and maturity—from core student information and fee collection to advanced analytics and mobile apps for parents and staff.',
  finalDescription:
    'We implement role-based access, audit trails, backups, and optional cloud or on-premise deployment. Our team helps you migrate legacy spreadsheets, train users, and integrate payment gateways, SMS, and biometric devices where required.',
  stripLabel: 'EIMS',
  mainServicesTitle: 'Main Services',
  brochuresTitle: 'Brochures',
  brochuresDescription:
    'Download a concise overview of modules, deployment options, and typical rollout timelines for educational institutes.',
  brochuresPrimaryButton: 'Download',
  brochuresOrLabel: 'OR',
  brochuresSecondaryButton: 'Discover',
  followUsTitle: 'Follow Us',
  serviceLinks: [
    { label: 'Educational Institute Management', to: PAGE_PATH },
    { label: 'Our Services', to: '/services' },
    { label: 'Information Security', to: '/information-security' },
    { label: 'Mobile Platform', to: '/mobile-platform' },
    { label: 'Data Synchronization', to: '/data-synchronization' },
    { label: 'Process Automation', to: '/process-automation' },
    { label: 'Event Processing', to: '/event-processing' },
    { label: 'Content Management', to: '/content-management' },
  ],
  socials: [{ label: 'f' }, { label: 't' }, { label: 'i' }, { label: 'in' }],
  cards: [
    {
      title: 'Student lifecycle & academics',
      description:
        'Admissions, class sections, attendance, timetable, homework, grade-books, report cards, and certificates—aligned to your board or curriculum.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80',
      icon: 'book',
      variant: 'overlay',
    },
    {
      title: 'Finance & operations',
      description: '',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      icon: 'chart',
      variant: 'footer',
    },
  ],
  featureBullets: [
    { _id: 'fb-1', text: 'Guardian portal & SMS/email alerts for fees, attendance, and results' },
    { _id: 'fb-2', text: 'Online admission forms, merit lists, and seat planning' },
    { _id: 'fb-3', text: 'Exam seating, invigilation, marks entry, and tabulation with moderation rules' },
    { _id: 'fb-4', text: 'Library catalog, issue/return, and overdue reminders' },
    { _id: 'fb-5', text: 'Hostel, transport routes, vehicle and driver roster' },
    { _id: 'fb-6', text: 'Staff payroll, leave, and substitute teacher scheduling' },
  ],
  faqs: [
    {
      question: '1. Can we start with only fees and attendance?',
      answer:
        'Yes. Most institutes begin with student records, fee collection, and attendance, then add examinations, library, and transport in later phases.',
      open: true,
    },
    {
      question: '2. Do you support multiple branches under one group?',
      answer:
        'The system supports central reporting with per-branch configuration, shared master data, and consolidated fee and payroll views where permitted.',
      open: false,
    },
    {
      question: '3. Is data hosted in Bangladesh or internationally?',
      answer:
        'Deployment can be on your servers, a Bangladesh cloud region where available, or a provider you approve. We document residency, backup, and DR expectations in the statement of work.',
      open: false,
    },
    {
      question: '4. How do you handle training and go-live?',
      answer:
        'We provide train-the-trainer sessions, quick-reference guides, sandbox practice, and a cutover checklist so finance and academics teams are confident before launch.',
      open: false,
    },
  ],
}

function normalizeFeatureBulletsFromApi(items) {
  if (!Array.isArray(items) || !items.length) return fallbackPageData.featureBullets
  return items.map((b) =>
    typeof b === 'string' ? { _id: b, text: b } : { _id: b._id || b.text, text: b.text || '' },
  )
}

function IconBook({ className = 'h-12 w-12' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChart({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function EducationalInstituteManagementPage() {
  const { pathname } = useLocation()
  const [pageData, setPageData] = useState(fallbackPageData)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/educational-institute-management-page`)
        const data = await response.json()
        if (response.ok && data) {
          setPageData({
            ...fallbackPageData,
            ...data,
            serviceLinks: data.serviceLinks?.length ? data.serviceLinks : fallbackPageData.serviceLinks,
            socials: data.socials?.length ? data.socials : fallbackPageData.socials,
            cards: data.cards?.length ? data.cards : fallbackPageData.cards,
            featureBullets: normalizeFeatureBulletsFromApi(data.featureBullets),
            faqs: data.faqs?.length ? data.faqs : fallbackPageData.faqs,
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
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <span className="text-white/90">Educational Institute Management</span>
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
              <Link
                to="/services"
                className="rounded-sm border border-white/90 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0a3146] transition hover:bg-white/90"
              >
                {pageData.brochuresSecondaryButton}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.12} className="border border-white/10 bg-[#0a3146]/70 p-5">
            <h3 className="text-lg font-bold text-white">{pageData.followUsTitle}</h3>
            <div className="mt-4 flex gap-2">
              {pageData.socials.map((social) => (
                <button
                  key={social.label}
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
            <div className="relative isolate h-[220px] overflow-hidden border border-white/10 sm:h-[260px] lg:h-[280px]">
              <img
                src={pageData.heroStripImage}
                alt="Students learning in a classroom setting"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000b1e]/70 via-transparent to-[#000b1e]/30" />
              <p className="absolute right-4 top-4 text-2xl font-black uppercase tracking-[0.15em] text-white/95 sm:right-6 sm:text-4xl">
                {pageData.stripLabel}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{pageData.sectionTitle}</h2>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionDescription}</p>
              <p className="mt-3 text-base leading-8 text-white/80">{pageData.sectionDescriptionBottom}</p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {pageData.featureBullets.map((item) => (
                <li
                  key={item._id || item.text}
                  className="flex gap-3 border border-white/10 bg-[#0a3146]/40 px-4 py-3 text-sm leading-relaxed text-white/85"
                >
                  <span className="mt-0.5 shrink-0 font-bold text-[#00d2ff]" aria-hidden>
                    ✓
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-5 sm:grid-cols-2">
              {pageData.cards.map((card) =>
                card.variant === 'footer' ? (
                  <article
                    key={card._id || card.title}
                    className="relative isolate flex min-h-[240px] flex-col overflow-hidden border border-white/10 sm:min-h-[280px]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#000b1e]/35" />
                    <div className="relative z-[1] flex flex-1" />
                    <div className="relative z-[2] flex items-center justify-between gap-3 border-t border-white/10 bg-white px-4 py-3">
                      <div className="flex items-center gap-3">
                        {card.icon === 'book' ? (
                          <IconBook className="h-6 w-6 shrink-0 text-[#00d2ff]" />
                        ) : (
                          <IconChart className="shrink-0 text-[#00d2ff]" />
                        )}
                        <h3 className="text-lg font-bold text-[#0a3146]">{card.title}</h3>
                      </div>
                      <span className="text-[#0a3146]" aria-hidden>
                        →
                      </span>
                    </div>
                  </article>
                ) : (
                  <article
                    key={card._id || card.title}
                    className="group relative isolate min-h-[240px] overflow-hidden border border-white/10 sm:min-h-[280px]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#000b1e]/55" />
                    <div className="relative z-[1] flex h-full min-h-[240px] flex-col items-center justify-center p-5 text-center sm:min-h-[280px] sm:p-6">
                      {card.icon === 'chart' ? (
                        <IconChart className="h-12 w-12 text-white drop-shadow-md" />
                      ) : (
                        <IconBook className="text-white drop-shadow-md" />
                      )}
                      <h3 className="mt-4 text-2xl font-bold text-[#00d2ff]">{card.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-7 text-white/90">{card.description}</p>
                    </div>
                  </article>
                ),
              )}
            </div>

            <p className="text-base leading-8 text-white/80">{pageData.finalDescription}</p>

            <div className="flex flex-wrap gap-3 border border-white/10 bg-[#0a3146]/30 px-4 py-4 sm:px-5">
              <Link
                to="/services"
                className="rounded-sm bg-[#00d2ff] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
              >
                Talk to us
              </Link>
              <Link
                to="/how-we-work"
                className="rounded-sm border border-white/30 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff]"
              >
                How we work
              </Link>
            </div>

            <div className="space-y-3 pt-2">
              {pageData.faqs.map((faq) => (
                <details
                  key={faq._id || faq.question}
                  open={Boolean(faq.open)}
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
