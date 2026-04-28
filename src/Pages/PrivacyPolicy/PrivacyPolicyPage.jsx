import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80'

const POLICY_SECTIONS = [
  {
    title: 'Introduction',
    paragraphs: [
      'SoftEdge Technology Limited is committed to protecting the privacy of our clients, partners, and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with our website or services.',
      'By using our platform, you agree to the practices described in this policy. We encourage you to read this page carefully so you understand what information we process and why we process it.',
    ],
  },
  {
    title: 'Use of user information.',
    paragraphs: [
      'We use the information we collect to respond to inquiries, deliver requested services, improve user experience, maintain platform security, and communicate important service-related updates.',
    ],
    bullets: [
      'Provide support and respond to business inquiries',
      'Improve website performance and user experience',
      'Maintain service quality, security, and compliance',
    ],
    footer:
      'We only use personal information for legitimate business purposes and process it in a way that is relevant, limited, and appropriate for the services we provide.',
  },
  {
    title: 'Disclosure of user information.',
    paragraphs: [
      'We do not sell or rent your personal information. Information may be shared only when necessary with trusted service providers, legal authorities, or internal teams that help us operate our business, and always under appropriate confidentiality and security obligations.',
    ],
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#00d2ff]" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.2 17 19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/78 via-[#000b1e]/48 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d2ff]/70 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/privacy-policy" className="transition-colors hover:text-[#00d2ff]">
                Privacy Policy
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute left-[8%] top-10 h-36 w-36 rounded-full bg-[#00d2ff]/12 blur-3xl" />
          <div className="absolute bottom-16 right-[10%] h-44 w-44 rounded-full bg-[#0a3146]/45 blur-3xl" />
        </div>
        <ScrollReveal
          variant="fade-up"
          duration={0.55}
          className="overflow-hidden rounded-[26px] border border-white/10 bg-[#000b1e]/55 text-white shadow-[0_20px_80px_-28px_rgba(0,0,0,0.78),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-2xl backdrop-saturate-150"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00d2ff] via-[#11425b] to-[#00d2ff]" />
          <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:gap-10 lg:px-14 lg:py-14">
            <div className="space-y-10 sm:space-y-12">
              {POLICY_SECTIONS.map((section, index) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.85)] sm:px-7 sm:py-7"
                >
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-[2.1rem]">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-5 text-base leading-8 text-white/72 sm:text-[17px]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-6 space-y-3 text-base text-white/80 sm:text-[17px]">
                      {section.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#071a2d]/65 px-4 py-3"
                        >
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.footer ? (
                    <p className="mt-6 text-base leading-8 text-white/72 sm:text-[17px]">
                      {section.footer}
                    </p>
                  ) : null}

                  {index < POLICY_SECTIONS.length - 1 ? (
                    <div className="mt-10 border-t border-white/10" />
                  ) : null}
                </article>
              ))}
            </div>

            <aside className="space-y-5 lg:pt-1">
              <div className="rounded-2xl border border-[#00d2ff]/20 bg-[linear-gradient(180deg,rgba(0,210,255,0.14),rgba(0,11,30,0.32))] p-6 shadow-[0_16px_50px_-24px_rgba(0,210,255,0.45)]">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Privacy First</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Your data deserves clarity and protection.</h3>
                <p className="mt-4 text-base leading-8 text-white/75">
                  We keep our privacy practices transparent, secure, and aligned with the trust our clients
                  place in us.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#071a2d]/80 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Highlights</p>
                <div className="mt-5 space-y-4">
                  {[
                    'Clear handling of personal and business information',
                    'Restricted sharing with trusted parties only',
                    'Security-focused storage and operational safeguards',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#00d2ff]" />
                      <p className="text-sm leading-7 text-white/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Need help?</p>
                <p className="mt-4 text-base leading-8 text-white/75">
                  For privacy-related questions, you can connect with our team and request more information
                  about data handling, updates, or policy clarification.
                </p>
              </div>
            </aside>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
