import { useEffect, useRef, useState } from 'react'

import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

const CYAN = '#00d2ff'
const NAVY = '#000b1e'

/** end = numeric target; suffix "k" → "15k", "+" → "78+" */
const STATS = [
  { end: 15, suffix: 'k', label: 'Customers' },
  { end: 78, suffix: '+', label: 'Branches' },
  { end: 3, suffix: 'k', label: 'Employees' },
  { end: 8, suffix: '+', label: 'Countries' },
]

function formatStatDisplay(n, suffix) {
  if (suffix === 'k') return `${n}k`
  return `${n}+`
}

function AnimatedStatValue({ end, suffix, delayMs }) {
  const [n, setN] = useState(0)
  const containerRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setN(end)
      return
    }

    const durationMs = 1650
    const startWall = performance.now() + delayMs
    let cancelled = false
    let rafId = 0

    const easeOutCubic = (t) => 1 - (1 - t) ** 3

    const tick = (now) => {
      if (cancelled) return
      if (now < startWall) {
        rafId = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startWall
      const t = Math.min(1, elapsed / durationMs)
      setN(Math.round(easeOutCubic(t) * end))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [active, end, delayMs])

  return (
    <span ref={containerRef} className="tabular-nums" style={{ color: CYAN }}>
      {formatStatDisplay(n, suffix)}
    </span>
  )
}

const DESKTOP_CARD_VARIANTS = ['fade-up', 'slide-right', 'slide-left', 'zoom-out']

const TIMELINE = [
  {
    year: '2000',
    title: 'Company founded',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description:
      "We're committed to providing customers exceptional service offering employees the best training.",
  },
  {
    year: '2005',
    title: 'Hiring more staff',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    description:
      "We're committed to providing customers exceptional service offering employees the best training.",
  },
  {
    year: '2007',
    title: 'Opened new branches',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad4ab?auto=format&fit=crop&w=800&q=80',
    description:
      "We're committed to providing customers exceptional service offering employees the best training.",
  },
  {
    year: '2012',
    title: 'International expansion',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description:
      "We're committed to providing customers exceptional service offering employees the best training.",
  },
]

function TimelineRibbon({ className = '' }) {
  return (
    <svg
      className={className}
      width="22"
      height="32"
      viewBox="0 0 22 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M11 0L21 6V26L11 32L1 26V6L11 0Z"
        fill={CYAN}
        fillOpacity="0.95"
      />
      <path d="M11 4L17 8V24L11 28L5 24V8L11 4Z" fill={NAVY} fillOpacity="0.35" />
    </svg>
  )
}

export default function OurHistory() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent" aria-labelledby="our-history-heading">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-12 sm:px-6 md:px-10 md:pb-8 md:pt-14 lg:px-12 lg:pb-10 lg:pt-16">
        <ScrollReveal as="header" variant="blur-in" duration={0.65} className="mx-auto max-w-3xl text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] sm:text-sm"
            style={{ color: CYAN }}
          >
            Our history
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/25" />
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full ring-2 ring-white/20"
              style={{ backgroundColor: CYAN }}
              aria-hidden
            />
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/25" />
          </div>
          <h2
            id="our-history-heading"
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.25rem]"
          >
            How We Started
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal line + ribbons + cards */}
        <div className="mt-14 hidden lg:block">
          <div className="grid grid-cols-4 gap-6 border-t border-white/25">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="relative flex flex-col items-center">
                <div className="z-10 -mt-[1px] flex -translate-y-1/2 flex-col items-center">
                  <div
                    className="h-6 w-px bg-gradient-to-b from-[#00d2ff] to-[#00d2ff]/35"
                    aria-hidden
                  />
                  <TimelineRibbon className="drop-shadow-[0_4px_14px_rgba(0,210,255,0.4)]" />
                </div>
                <ScrollReveal
                  as="article"
                  variant={DESKTOP_CARD_VARIANTS[i % DESKTOP_CARD_VARIANTS.length]}
                  delay={i * 0.11}
                  duration={0.55}
                  className="mt-2 w-full overflow-hidden rounded-lg border border-white/[0.08] bg-transparent shadow-lg backdrop-blur-md"
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                      <div
                        className="absolute left-1/2 top-3 -translate-x-1/2 px-4 py-1.5 text-sm font-bold text-[#000b1e] shadow-md"
                        style={{ backgroundColor: CYAN }}
                      >
                        {item.year}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold leading-snug text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/65">{item.description}</p>
                    </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="mt-12 space-y-10 lg:hidden">
          {TIMELINE.map((item, index) => (
            <ScrollReveal
              key={item.year}
              as="article"
              variant="fade-up"
              delay={index * 0.1}
              duration={0.52}
              className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-transparent backdrop-blur-md"
            >
              <div
                className="absolute bottom-0 left-[11px] top-12 w-px bg-gradient-to-b from-[#00d2ff]/70 via-white/12 to-transparent"
                aria-hidden
              />
              <div className="absolute left-0 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-[#00d2ff]/45 bg-transparent text-[#00d2ff] shadow-[0_0_20px_rgba(0,210,255,0.15)] backdrop-blur-sm">
                <span className="text-[11px] font-bold">{index + 1}</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06]">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute left-4 top-3 px-3 py-1 text-xs font-bold text-[#000b1e]"
                  style={{ backgroundColor: CYAN }}
                >
                  {item.year}
                </div>
              </div>
              <div className="p-5 pl-6">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
