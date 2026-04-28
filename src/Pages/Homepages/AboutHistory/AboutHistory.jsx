import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

const HIGHLIGHTS = [
  {
    id: '01',
    title: 'Advanced Innovative Agency',
    description:
      'We create thoughtful digital products and modern brand experiences with a strong focus on usability, visual clarity, and long-term value.',
  },
  {
    id: '02',
    title: 'Professional Problem Solutions',
    description:
      'Our team works closely with clients to solve practical business problems through scalable systems, streamlined workflows, and dependable support.',
  },
  {
    id: '03',
    title: 'Web Architect and Development',
    description:
      'From architecture planning to final delivery, we build secure and maintainable web solutions tailored to business growth and performance.',
  },
]

const STATS = [
  { value: '3k', label: 'Design Staff' },
  { value: '12k', label: 'Project Completed' },
]

export default function AboutHistory() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent" aria-labelledby="about-history-heading">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:grid-cols-[minmax(320px,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-14 lg:px-12 lg:py-16">
        <ScrollReveal variant="slide-right" duration={0.58} className="relative">
          <div className="overflow-hidden rounded-[26px] border border-white/10 shadow-[0_18px_60px_-22px_rgba(0,0,0,0.65)]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_42px_-22px_rgba(0,0,0,0.82)] sm:inset-x-6 sm:bottom-6">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-4 py-4 sm:px-5 sm:py-5 ${
                  index === 0
                    ? 'bg-[linear-gradient(135deg,rgba(7,42,62,0.96),rgba(17,71,98,0.93))]'
                    : 'bg-[linear-gradient(135deg,rgba(0,210,255,0.92),rgba(28,162,197,0.95))] text-[#02131d]'
                }`}
              >
                <p className="text-3xl font-black tracking-tight sm:text-[2rem]">{stat.value}</p>
                <p className={`mt-1 text-sm font-semibold ${index === 0 ? 'text-white/82' : 'text-[#042132]/88'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="max-w-2xl">
          <ScrollReveal variant="fade-up" duration={0.55}>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#7fe7ff] sm:text-sm">About Us</p>
            <h2
              id="about-history-heading"
              className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[3rem]"
            >
              Making the world advanced design work for you
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
              We are an experienced digital team delivering thoughtful design, practical engineering, and
              reliable support for brands that want to grow with confidence.
            </p>
          </ScrollReveal>

          <div className="mt-8 space-y-6 sm:mt-10">
            {HIGHLIGHTS.map((item, index) => (
              <ScrollReveal
                key={item.id}
                variant="fade-up"
                delay={index * 0.08}
                duration={0.52}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00d2ff]/35 bg-[#0b2940]/70 text-sm font-bold text-[#7fe7ff] shadow-[0_0_0_6px_rgba(0,210,255,0.08)]">
                    {item.id}
                  </span>
                  {index < HIGHLIGHTS.length - 1 ? (
                    <span className="mt-3 h-16 w-px bg-gradient-to-b from-[#00d2ff]/70 to-transparent" />
                  ) : null}
                </div>

                <div className="pt-1">
                  <h3 className="text-xl font-bold text-white sm:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-white/68 sm:text-base">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
