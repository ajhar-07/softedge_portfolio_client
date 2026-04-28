import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

const CYAN = '#00d2ff'
const NAVY = '#0a3146'

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Crafting Digital Experiences',
    title: 'Experience the best IT technology agency!',
    subtitle:
      'We are driving protection and digital transformation for organizations with dependable service, strategic execution, and years of proven experience.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Scalable Digital Solutions',
    title: 'Build secure systems with confidence.',
    subtitle:
      'From planning to launch, we create secure, modern, and scalable platforms that help teams move faster and deliver better outcomes.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Trusted Technology Partner',
    title: 'Grow with a team that understands your vision.',
    subtitle:
      'We combine strong engineering, thoughtful design, and responsive support to help your business adapt, innovate, and scale.',
  },
]

function ArrowIcon({ direction = 'left' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M14.5 5 7.5 12l7 7' : 'M9.5 5 16.5 12l-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const current = slides[active]
  const goPrev = () => setActive((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setActive((i) => (i + 1) % slides.length)

  return (
    <ScrollReveal
      as="section"
      className="relative w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      variant="zoom-out"
      duration={0.68}
      amount={0.1}
    >
      <div className="relative w-full overflow-hidden bg-[#000b1e]">
        <div className="absolute inset-y-0 left-0 z-20 hidden items-center pl-4 md:flex lg:pl-6">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/90 text-[#0a3146] shadow-lg transition hover:scale-105 hover:bg-white active:scale-95"
            aria-label="Previous slide"
          >
            <ArrowIcon direction="left" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 hidden items-center pr-4 md:flex lg:pr-6">
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/90 text-[#0a3146] shadow-lg transition hover:scale-105 hover:bg-white active:scale-95"
            aria-label="Next slide"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === active ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
            }`}
            aria-hidden={index !== active}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,26,40,0.92)_0%,rgba(7,31,48,0.8)_32%,rgba(7,31,48,0.44)_56%,rgba(255,255,255,0.1)_100%)]"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(255,255,255,0.46),transparent_28%),radial-gradient(circle_at_18%_30%,rgba(0,210,255,0.12),transparent_28%)]"
                aria-hidden
              />
            </div>

            <div className="relative z-10 flex min-h-[480px] items-center px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[640px] lg:px-12 xl:px-14">
              <div className="w-full max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#79e8ff] sm:text-sm">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[4.5rem]">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
                  {slide.subtitle}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    to="/about"
                    className="inline-flex min-w-[170px] items-center justify-center rounded-md bg-[#00d2ff] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[#00111d] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    style={{ outlineColor: CYAN }}
                  >
                    Discover More
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center text-sm font-bold uppercase tracking-[0.08em] text-white underline decoration-white/55 underline-offset-4 transition hover:text-[#79e8ff] hover:decoration-[#79e8ff]"
                  >
                    Get A Quote
                  </Link>
                </div>

                <nav
                  className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold tracking-wide sm:mt-12"
                  aria-label="Slide pagination"
                >
                  {slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] ${
                        i === active
                          ? 'w-10 bg-[#00d2ff]'
                          : 'w-2.5 bg-white/35 hover:bg-white/65'
                      }`}
                      aria-current={i === active ? 'true' : undefined}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </nav>

                <div className="mt-8 flex items-center gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/90 text-[#0a3146] shadow-lg transition active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/90 text-[#0a3146] shadow-lg transition active:scale-95"
                    aria-label="Next slide"
                  >
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        </div>
      </div>

      {/* Screen-reader live region for current slide */}
      <p className="sr-only" aria-live="polite">
        Slide {active + 1} of {slides.length}: {current.title}
      </p>
    </ScrollReveal>
  )
}
