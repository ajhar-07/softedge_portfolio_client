import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CYAN = '#00d2ff'
const NAVY = '#0a3146'
const PINK = '#00d2ff'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  workProcessEyebrow: 'Work Process',
  workProcessTitle: 'Our Working Process',
  processSteps: [
    {
      _id: 'default-step-1',
      stepId: '01',
      title: 'Design',
      description: 'We focus on best practices for IT solutions and services.',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-step-2',
      stepId: '02',
      title: 'Testing',
      description: 'We validate every detail to ensure quality delivery.',
      image:
        'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
    },
    {
      _id: 'default-step-3',
      stepId: '03',
      title: 'Go-Live',
      description: 'We launch with confidence and provide reliable support.',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    },
  ],
  whyChooseUsImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  whyChooseUsEyebrow: 'Why Choose Us',
  whyChooseUsTitle: 'We are building a sustainable future',
  whyChooseUsDescription:
    'Tremendous involvement with power departure, land master current, liaisoning and working with state. An ideal mix of worldwide experience and skill to additional our attention on innovation.',
  whyChooseUsServices: [
    { _id: 'default-svc-1', label: 'Web Development' },
    { _id: 'default-svc-2', label: 'Branding Services' },
    { _id: 'default-svc-3', label: 'Digital Marketing' },
  ],
  reviews: [
    {
      _id: 'default-rev-1',
      name: 'Gemma Krischock',
      role: 'Web Designer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      text: 'IT solution is the most valuable business resource we have ever purchased. It really saves time and effort for our team.',
    },
    {
      _id: 'default-rev-2',
      name: 'Liam Foster',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      text: 'Their team delivered exactly what we needed. From planning to launch, every step was smooth and highly professional.',
    },
    {
      _id: 'default-rev-3',
      name: 'Avery Collins',
      role: 'Operations Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
      text: 'We reduced repetitive work and improved delivery speed after implementing their solution. Outstanding support and communication.',
    },
  ],
  stats: [
    { _id: 'default-stat-1', end: 15, suffix: 'k', label: 'Customers' },
    { _id: 'default-stat-2', end: 78, suffix: '+', label: 'Branches' },
    { _id: 'default-stat-3', end: 3, suffix: 'k', label: 'Employees' },
    { _id: 'default-stat-4', end: 8, suffix: '+', label: 'Countries' },
  ],
  aboutEyebrow: 'About Us',
  aboutTitle: "We're Delivering The Best Customer Experience",
  missionTitle: 'Our Mission',
  missionText:
    "Our Mission is to be the industry's top-rated provider issuer enterprise targeting satisfying the most to our clients.",
  visionTitle: 'Our Vision',
  visionText:
    'Our Vision is to be a top Web Design company in the IT sector and progress in our current position in the market.',
  aboutMainImage:
    'https://images.unsplash.com/photo-1527219525722-f9767a7f2884?auto=format&fit=crop&w=1400&q=80',
  aboutOverlayImage:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
  teamEyebrow: 'Our Team',
  teamTitle: 'Our Motivated Team',
  team: [
    {
      _id: 'default-member-1',
      name: 'Hamish French',
      role: 'Computer Scientist',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      facebookUrl: '',
      linkedinUrl: '',
      githubUrl: '',
    },
    {
      _id: 'default-member-2',
      name: 'Zara Matheson',
      role: 'CEO',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      facebookUrl: '',
      linkedinUrl: '',
      githubUrl: '',
    },
    {
      _id: 'default-member-3',
      name: 'Dylan Bonney',
      role: 'Process Analyst',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      facebookUrl: '',
      linkedinUrl: '',
      githubUrl: '',
    },
    {
      _id: 'default-member-4',
      name: 'Skye Finney',
      role: 'Web Developer',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
      facebookUrl: '',
      linkedinUrl: '',
      githubUrl: '',
    },
  ],
}

function normalizeSocialHref(url) {
  const u = typeof url === 'string' ? url.trim() : ''
  if (!u) return null
  if (/^https?:\/\//i.test(u)) return u
  if (u.startsWith('//')) return `https:${u}`
  return `https://${u.replace(/^\/+/, '')}`
}

function mergeAboutPageData(data) {
  const d = DEFAULT_PAGE_DATA
  return {
    heroImage: data.heroImage || d.heroImage,
    workProcessEyebrow: data.workProcessEyebrow || d.workProcessEyebrow,
    workProcessTitle: data.workProcessTitle || d.workProcessTitle,
    processSteps: data.processSteps?.length ? data.processSteps : d.processSteps,
    whyChooseUsImage: data.whyChooseUsImage || d.whyChooseUsImage,
    whyChooseUsEyebrow: data.whyChooseUsEyebrow || d.whyChooseUsEyebrow,
    whyChooseUsTitle: data.whyChooseUsTitle || d.whyChooseUsTitle,
    whyChooseUsDescription: data.whyChooseUsDescription || d.whyChooseUsDescription,
    whyChooseUsServices: data.whyChooseUsServices?.length ? data.whyChooseUsServices : d.whyChooseUsServices,
    reviews: data.reviews?.length ? data.reviews : d.reviews,
    stats: data.stats?.length ? data.stats : d.stats,
    aboutEyebrow: data.aboutEyebrow || d.aboutEyebrow,
    aboutTitle: data.aboutTitle || d.aboutTitle,
    missionTitle: data.missionTitle || d.missionTitle,
    missionText: data.missionText || d.missionText,
    visionTitle: data.visionTitle || d.visionTitle,
    visionText: data.visionText || d.visionText,
    aboutMainImage: data.aboutMainImage || d.aboutMainImage,
    aboutOverlayImage: data.aboutOverlayImage || d.aboutOverlayImage,
    teamEyebrow: data.teamEyebrow || d.teamEyebrow,
    teamTitle: data.teamTitle || d.teamTitle,
    team: data.team?.length ? data.team : d.team,
  }
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.7-.1-1.4-.2-2.1-.2-2.1 0-3.5 1.3-3.5 3.7v2.1H8.5V14h2.3v7h2.7Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M6.2 8.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM4.8 19h2.8V9.6H4.8V19Zm4.5 0h2.7v-4.7c0-1.2.2-2.4 1.7-2.4 1.4 0 1.4 1.3 1.4 2.5V19H18v-5.2c0-2.6-.6-4.6-3.6-4.6-1.4 0-2.3.8-2.7 1.5h-.1V9.6H9.3c0 .7 0 9.4 0 9.4Z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1A10 10 0 0 1 12 7.5a10 10 0 0 1 2.7.4c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.7 1.1 2.8 0 4-2.5 4.8-4.9 5.1.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export default function AboutPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)
  const [activeReview, setActiveReview] = useState(0)
  const [statValues, setStatValues] = useState(() => DEFAULT_PAGE_DATA.stats.map(() => 0))

  const reviews = pageData.reviews || []
  const stats = pageData.stats || []
  const processSteps = pageData.processSteps || []
  const team = pageData.team || []
  const whyChooseUsServices = pageData.whyChooseUsServices || []

  const currentReview = reviews[activeReview] ?? reviews[0] ?? { name: '', role: '', image: '', text: '' }

  useEffect(() => {
    let ignore = false

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about-page`)
        if (!response.ok) throw new Error('Failed to fetch about page')
        const data = await response.json()
        if (!ignore) {
          setPageData(mergeAboutPageData(data))
        }
      } catch {
        if (!ignore) {
          setPageData(DEFAULT_PAGE_DATA)
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const n = reviews.length
    if (n === 0) return
    setActiveReview((i) => (i >= n ? 0 : i))
  }, [reviews.length])

  useEffect(() => {
    const len = reviews.length
    if (len < 2) return undefined
    const id = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % len)
    }, 4500)
    return () => clearInterval(id)
  }, [reviews.length])

  useEffect(() => {
    if (!stats.length) {
      setStatValues([])
      return undefined
    }

    setStatValues(stats.map(() => 0))
    const durationMs = 1800
    const start = performance.now()
    let rafId = 0

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - progress) ** 3
      setStatValues(stats.map((stat) => Math.round(stat.end * eased)))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [stats])

  const showPrevReview = () => {
    if (!reviews.length) return
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const showNextReview = () => {
    if (!reviews.length) return
    setActiveReview((prev) => (prev + 1) % reviews.length)
  }

  return (
    <div className="w-full bg-transparent text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d2ff]/70 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/about" className="transition-colors hover:text-[#00d2ff]">
                About Us
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <ScrollReveal as="header" className="mx-auto max-w-3xl text-center" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00d2ff]">{pageData.workProcessEyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{pageData.workProcessTitle}</h2>
        </ScrollReveal>

        <div className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-[72px] hidden border-t border-dashed border-white/25 md:block" />
          {processSteps.map((step, i) => (
            <ScrollReveal
              key={step._id || step.stepId || i}
              variant="fade-up"
              delay={i * 0.1}
              className="relative rounded-xl border border-white/10 bg-[#0b2b3b]/35 p-5 text-center backdrop-blur-sm"
            >
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border border-white/20">
                <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
                <span
                  className="absolute bottom-1 right-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: i % 2 === 0 ? PINK : NAVY }}
                >
                  {step.stepId}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-white/70">{step.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid w-full overflow-hidden lg:grid-cols-2">
        <div className="min-h-[320px]">
          <img
            src={pageData.whyChooseUsImage}
            alt="Team collaboration"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative bg-[#0d4260] px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
          <ScrollReveal variant="slide-left" duration={0.58} className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.whyChooseUsEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {pageData.whyChooseUsTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/80">{pageData.whyChooseUsDescription}</p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {whyChooseUsServices.map((item) => (
                <div
                  key={item._id || item.label}
                  className="rounded-lg border border-white/15 bg-[#0a3146]/35 p-4"
                >
                  <p className="text-lg font-semibold leading-snug text-white">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {reviews.length > 0 ? (
        <section className="relative overflow-hidden bg-[#0a3146] px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(0,210,255,0.3),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,210,255,0.22),transparent_35%)]" />
          </div>
          <ScrollReveal className="relative mx-auto max-w-4xl text-center" variant="fade-up" duration={0.55}>
            <div className="mb-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={showPrevReview}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-white/20"
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                type="button"
                onClick={showNextReview}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-white/20"
                aria-label="Next review"
              >
                →
              </button>
            </div>
            <img
              src={currentReview.image}
              alt={currentReview.name}
              className="mx-auto h-14 w-14 rounded-full border-2 border-white/30 object-cover"
              loading="lazy"
            />
            <p className="mt-5 text-xl leading-relaxed text-white/95 sm:text-2xl lg:text-3xl">
              {currentReview.text}
            </p>
            <p className="mt-5 text-xl font-bold text-[#00d2ff] sm:text-2xl">{currentReview.name}</p>
            <p className="text-base text-white/80">{currentReview.role}</p>
            <div className="mt-5 flex items-center justify-center gap-2">
              {reviews.map((item, i) => (
                <button
                  key={item._id || `${item.name}-${i}`}
                  type="button"
                  onClick={() => setActiveReview(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === activeReview ? 'w-8 bg-[#00d2ff]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      {stats.length > 0 ? (
        <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            variant="zoom-out"
            duration={0.5}
            className="mx-auto w-full max-w-6xl rounded-sm border border-white/15 bg-[#000b1e]/45 px-4 py-8 text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150 sm:px-8"
          >
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat._id || stat.label}
                  className="border-[#0a3146]/15 odd:border-r md:border-r md:last:border-r-0"
                >
                  <p className="text-3xl font-bold text-[#00d2ff] sm:text-4xl lg:text-5xl">
                    {statValues[index] ?? 0}
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-white/75">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
        <ScrollReveal variant="slide-right" duration={0.58}>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00d2ff]">{pageData.aboutEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {pageData.aboutTitle}
          </h2>

          <div className="mt-8 space-y-7">
            <article className="flex items-start gap-4">
              <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00d2ff] text-2xl font-bold text-[#000b1e]">
                •
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.missionTitle}</h3>
                <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{pageData.missionText}</p>
              </div>
            </article>

            <article className="flex items-start gap-4">
              <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00d2ff] text-2xl font-bold text-[#000b1e]">
                ◇
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{pageData.visionTitle}</h3>
                <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{pageData.visionText}</p>
              </div>
            </article>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="slide-left" duration={0.58} className="relative min-h-[340px]">
          <img
            src={pageData.aboutMainImage}
            alt="Discussion at office"
            className="h-full w-full rounded-sm border border-white/10 object-cover"
            loading="lazy"
          />
          <div className="absolute -right-3 bottom-8 w-[46%] border-4 border-[#00d2ff]/40 bg-[#0a3146] p-2 sm:-right-4 sm:w-[44%]">
            <img
              src={pageData.aboutOverlayImage}
              alt="Design planning"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <ScrollReveal as="header" className="mx-auto max-w-3xl text-center" variant="fade-up" duration={0.55}>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00d2ff]">{pageData.teamEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{pageData.teamTitle}</h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <ScrollReveal
              key={member._id || member.name}
              variant="fade-up"
              delay={index * 0.1}
              className="group overflow-hidden rounded-sm border border-white/10 bg-[#0a3146]/35 p-3"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#000b1e]/85 via-[#000b1e]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-4 flex min-h-[2.25rem] items-center justify-center gap-2">
                    {(() => {
                      const fb = normalizeSocialHref(member.facebookUrl)
                      const li = normalizeSocialHref(member.linkedinUrl)
                      const gh = normalizeSocialHref(member.githubUrl)
                      const linkClass =
                        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:scale-105'

                      return (
                        <>
                          {fb ? (
                            <a
                              href={fb}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} Facebook`}
                              className={`${linkClass} hover:bg-[#1877f2]`}
                            >
                              <FacebookIcon />
                            </a>
                          ) : null}
                          {li ? (
                            <a
                              href={li}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} LinkedIn`}
                              className={`${linkClass} hover:bg-[#0a66c2]`}
                            >
                              <LinkedInIcon />
                            </a>
                          ) : null}
                          {gh ? (
                            <a
                              href={gh}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} GitHub`}
                              className={`${linkClass} hover:bg-[#24292f]`}
                            >
                              <GithubIcon />
                            </a>
                          ) : null}
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
              <div className="p-3 text-center">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="mt-1 text-base text-white/70">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
