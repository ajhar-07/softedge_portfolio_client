import { useEffect, useState } from 'react'
import { ScrollReveal } from '../ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_FOOTER_DATA = {
  aboutTitle: 'About Company',
  aboutDescription: 'We have 14+ years experience. Helping you overcome technology challenges.',
  contactsTitle: 'Contacts',
  addressLabel: 'Adress:',
  addressValue: '4211 Webster Street Rahway, NJ 07065.',
  emailLabel: 'Email:',
  emailValue: 'info@yourdomain.com',
  phoneLabel: 'Phone:',
  phoneValue: '(+44) 123 456 789',
  newsletterTitle: 'Newsletter',
  newsletterDescription: 'Subscribe to our newsletter to receive updates on the latest news!',
  newsletterPlaceholder: 'Subscribe with us',
  copyrightPrefix: '© Developed by',
  companyName: 'SoftEdge Technology LTD.',
  socialLinks: [
    { _id: 'social-1', label: 'f', href: '#', ariaLabel: 'Facebook social link' },
    { _id: 'social-2', label: 'x', href: '#', ariaLabel: 'X social link' },
    { _id: 'social-3', label: 'yt', href: '#', ariaLabel: 'YouTube social link' },
    { _id: 'social-4', label: 'in', href: '#', ariaLabel: 'LinkedIn social link' },
  ],
}

export default function Footer() {
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER_DATA)
  const safeFooterData = {
    ...DEFAULT_FOOTER_DATA,
    ...footerData,
    aboutTitle: footerData.aboutTitle || DEFAULT_FOOTER_DATA.aboutTitle,
    aboutDescription: footerData.aboutDescription || DEFAULT_FOOTER_DATA.aboutDescription,
    contactsTitle: footerData.contactsTitle || DEFAULT_FOOTER_DATA.contactsTitle,
    addressLabel: footerData.addressLabel || DEFAULT_FOOTER_DATA.addressLabel,
    addressValue: footerData.addressValue || DEFAULT_FOOTER_DATA.addressValue,
    emailLabel: footerData.emailLabel || DEFAULT_FOOTER_DATA.emailLabel,
    emailValue: footerData.emailValue || DEFAULT_FOOTER_DATA.emailValue,
    phoneLabel: footerData.phoneLabel || DEFAULT_FOOTER_DATA.phoneLabel,
    phoneValue: footerData.phoneValue || DEFAULT_FOOTER_DATA.phoneValue,
    newsletterTitle: footerData.newsletterTitle || DEFAULT_FOOTER_DATA.newsletterTitle,
    newsletterDescription: footerData.newsletterDescription || DEFAULT_FOOTER_DATA.newsletterDescription,
    newsletterPlaceholder: footerData.newsletterPlaceholder || DEFAULT_FOOTER_DATA.newsletterPlaceholder,
    copyrightPrefix: footerData.copyrightPrefix || DEFAULT_FOOTER_DATA.copyrightPrefix,
    companyName: footerData.companyName || DEFAULT_FOOTER_DATA.companyName,
    socialLinks: Array.isArray(footerData.socialLinks) && footerData.socialLinks.length
      ? footerData.socialLinks
      : DEFAULT_FOOTER_DATA.socialLinks,
  }

  useEffect(() => {
    let isMounted = true
    async function loadFooter() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/footer-content`)
        if (!response.ok) throw new Error('Request failed')
        const data = await response.json()
        if (!isMounted) return
        setFooterData({ ...DEFAULT_FOOTER_DATA, ...data })
      } catch (error) {
        if (isMounted) setFooterData(DEFAULT_FOOTER_DATA)
      }
    }
    loadFooter()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#082b3d_0%,#062234_100%)] text-white/85">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d2ff]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,210,255,0.1),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(91,124,255,0.12),transparent_30%)]" />

      <ScrollReveal
        as="div"
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 lg:px-8 lg:py-12"
        variant="fade-up"
        duration={0.55}
        amount={0.2}
      >
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_10px_35px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{safeFooterData.aboutTitle}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/80 sm:text-[15px] sm:leading-8">
            {safeFooterData.aboutDescription}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {(safeFooterData.socialLinks || []).map((item) => (
              <a
                key={item._id || item.label}
                href={item.href || '#'}
                aria-label={item.ariaLabel || `${item.label} social link`}
                className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/12 bg-[#1f4358]/60 px-2 text-xs font-semibold uppercase text-white transition-colors duration-200 hover:border-[#00d2ff]/55 hover:bg-[#00d2ff]/20"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_10px_35px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{safeFooterData.contactsTitle}</h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-7 text-white/85 sm:space-y-3 sm:text-[15px] sm:leading-8">
            <li className="rounded-lg border border-white/10 bg-[#0f3951]/45 px-3 py-2">
              <span className="font-bold text-white">{safeFooterData.addressLabel}</span>{' '}
              <span className="break-words">{safeFooterData.addressValue}</span>
            </li>
            <li className="rounded-lg border border-white/10 bg-[#0f3951]/45 px-3 py-2">
              <span className="font-bold text-white">{safeFooterData.emailLabel}</span>{' '}
              <span className="break-all">{safeFooterData.emailValue}</span>
            </li>
            <li className="rounded-lg border border-white/10 bg-[#0f3951]/45 px-3 py-2">
              <span className="font-bold text-white">{safeFooterData.phoneLabel}</span>{' '}
              <span>{safeFooterData.phoneValue}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_10px_35px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{safeFooterData.newsletterTitle}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/80 sm:text-[15px] sm:leading-8">
            {safeFooterData.newsletterDescription}
          </p>

          <form className="mt-6">
            <label htmlFor="footer-newsletter" className="sr-only">
              Newsletter email
            </label>
            <div className="flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#3b5b71]/75 sm:h-12 sm:flex-row sm:items-center">
              <input
                id="footer-newsletter"
                type="email"
                placeholder={safeFooterData.newsletterPlaceholder}
                className="h-11 w-full bg-transparent px-4 text-sm text-white placeholder:text-white/70 focus:outline-none sm:h-full"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center border-t border-white/10 px-4 text-[#dceaf3] transition-colors duration-200 hover:bg-[#00d2ff]/20 hover:text-[#00d2ff] sm:h-full sm:border-l sm:border-t-0"
                aria-label="Submit newsletter form"
              >
                ➤
              </button>
            </div>
          </form>
        </section>
      </ScrollReveal>

      <ScrollReveal as="aside" variant="fade-up" duration={0.5} amount={0.2}>
        <div className="border-t border-white/10 bg-[#072638]/95">
          <div className="mx-auto w-full max-w-7xl px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm text-white/80 sm:text-base">{safeFooterData.copyrightPrefix}</p>
            {safeFooterData.companyName ? (
              <p className="mt-1 text-sm font-semibold text-[#00d2ff] sm:text-base">{safeFooterData.companyName}</p>
            ) : null}
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
