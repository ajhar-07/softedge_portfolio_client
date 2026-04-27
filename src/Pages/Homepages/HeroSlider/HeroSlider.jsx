import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

const CYAN = '#00d2ff'

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    title: 'Build Your Digital Ideas With Us.',
    subtitle:
      "We're committed to providing customers exceptional service offering employees the best training.",
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80',
    title: 'Engineering That Scales With Your Vision.',
    subtitle:
      'From strategy to launch, we partner with teams to ship reliable products and memorable experiences.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    title: 'Innovation Rooted in Collaboration.',
    subtitle:
      'Clear communication, agile delivery, and long-term support—built around your business goals.',
  },
]

export default function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const current = slides[active]

  return (
    <ScrollReveal
      as="section"
      className="relative w-full overflow-hidden bg-transparent"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      variant="zoom-out"
      duration={0.68}
      amount={0.1}
    >
      <div className="relative min-h-[min(86vh,680px)] sm:min-h-[min(90vh,720px)] lg:min-h-[560px]">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`absolute inset-0 grid transition-opacity duration-700 ease-out lg:grid-cols-12 ${
              index === active ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
            }`}
            aria-hidden={index !== active}
          >
            <div className="relative h-[min(40vh,320px)] min-h-[200px] overflow-hidden rounded-2xl border border-white/10 sm:h-[min(46vh,360px)] sm:min-h-[220px] lg:col-span-7 lg:h-auto lg:min-h-[500px]">
              <img
                src={slide.image}
                alt=""
                className="h-full w-full rounded-2xl object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#00d2ff]/28 via-transparent to-transparent"
                aria-hidden
              />
            </div>

            <div
              className="flex flex-col justify-center bg-transparent px-4 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:px-12 lg:py-16"
            >
              <div className="mx-auto w-full max-w-xl lg:mx-0">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem] xl:text-[2.65rem]">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                  {slide.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/about"
                    className="btn-brand inline-flex items-center justify-center rounded px-7 py-3 text-sm font-semibold uppercase tracking-wide text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    style={{ backgroundColor: CYAN, outlineColor: CYAN }}
                  >
                    Get Started
                  </Link>
                </div>

                <nav
                  className="mt-10 flex flex-wrap items-center gap-1 text-sm font-semibold tracking-wide sm:text-base"
                  aria-label="Slide pagination"
                >
                  {slides.map((slide, i) => (
                    <span key={slide.id} className="inline-flex items-center">
                      {i > 0 ? (
                        <span className="mx-1 text-[#00d2ff]/45" aria-hidden>
                          -
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className={`min-w-[2rem] rounded px-1 py-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] hover:scale-110 active:scale-95 ${
                          i === active
                            ? 'text-white'
                            : 'text-[#00d2ff]/80 hover:text-[#00d2ff]'
                        }`}
                        aria-current={i === active ? 'true' : undefined}
                        aria-label={`Slide ${i + 1}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Screen-reader live region for current slide */}
      <p className="sr-only" aria-live="polite">
        Slide {active + 1} of {slides.length}: {current.title}
      </p>
    </ScrollReveal>
  )
}
