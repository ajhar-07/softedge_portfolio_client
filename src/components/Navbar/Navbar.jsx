import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/Authcontext/AuthContext'
import useUserRole from '../../Hooks/userRole.jsx'
import logoSvgUrl from '../../assets/brand/logo-softedge.svg?url'

function ChevronDown({ className = 'h-3 w-3' }) {
  return (
    <svg
      className={`shrink-0 opacity-90 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpRight({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TwoLineMenuIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 8H20" />
      <path d="M4 16H14" />
    </svg>
  )
}

const navLinkClass =
  'inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-white transition hover:text-white/90'

// Match glass navbar: same blur, border, shadow as the bar (DaisyUI needs dropdown-content on <ul>)
const dropdownMenuClass =
  'dropdown-content menu z-[1100] mt-1 max-h-[min(72vh,22rem)] min-w-[12rem] max-w-[min(18rem,calc(100vw-1.25rem))] overflow-y-auto overflow-x-hidden rounded-xl border border-white/15 bg-[#000b1e]/45 p-2 text-sm shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150'

/** Single column + viewport width clamp so panels never spill off-screen */
const layeredMegaShellClass =
  'dropdown-content z-[1100] mt-1 max-h-[min(78vh,32rem)] w-[min(24rem,calc(100vw-1.25rem))] max-w-[calc(100vw-1.25rem)] overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-white/15 bg-[linear-gradient(165deg,rgba(0,11,30,0.72)_0%,rgba(4,17,31,0.88)_100%)] p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150 sm:p-4'

const megaLinkClass =
  'block max-w-full rounded-lg px-2.5 py-2 text-left transition hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43B7E8]/50'

/** Existing product pages — kept at top of Services menu */
const LEGACY_SERVICE_LINKS = [
  { to: '/services', label: 'Our Services' },
  { to: '/information-security', label: 'Our Information Security' },
  { to: '/mobile-platform', label: 'Mobile Platform' },
  { to: '/data-synchronization', label: 'Data Synchronization' },
  { to: '/process-automation', label: 'Process Automation' },
  { to: '/event-processing', label: 'Event Processing' },
  { to: '/content-management', label: 'Content Management' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
]

/**
 * Full service catalog (SiftEdge brief). `to` points at the closest live page for now.
 */
const SERVICE_MEGA_SECTIONS = [
  {
    id: 'software',
    title: 'Software & IT Solutions',
    diamond: true,
    featured: false,
    items: [
      { label: 'Educational Institute Management Software', to: '/educational-institute-management' },
      {
        label: 'ERP Software',
        description: 'Enterprise Resource Planning — all-in-one',
        to: '/erp-software',
      },
      {
        label: 'Hospital Management Software',
        description: 'Diagnostic software: OPD + IPD + Billing',
        to: '/hospital-management-software',
      },
      {
        label: 'Pharmacy Management Software',
        description: 'POS with medicine-specific features',
        to: '/pharmacy-management-software',
      },
      {
        label: 'Restaurant Management Software',
        description: 'POS + order system',
        to: '/restaurant-management-software',
      },
      { label: 'Inventory Management Software', description: 'POS + billing', to: '/inventory-management-software' },
      {
        label: 'Municipality / Union Management',
        description: 'Service Point suite',
        to: '/services',
      },
      {
        label: 'Payment Gateways & digital wallets',
        description: 'Microfinance software',
        to: '/services',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web & Digital Services',
    diamond: true,
    featured: false,
    items: [
      { label: 'Website design & development', description: 'Corporate + dynamic sites', to: '/services' },
      { label: 'Landing page design', description: 'Marketing-focused', to: '/services' },
      { label: 'E-commerce & news portal', to: '/services' },
      { label: 'Domain, hosting & server management', to: '/services' },
      { label: 'Website maintenance & support packages', to: '/services' },
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing Services',
    diamond: false,
    featured: false,
    items: [
      { label: 'Facebook & Google Ads management', to: '/services' },
      { label: 'SEO (search engine optimization)', to: '/services' },
      { label: 'Social media management', description: 'Page handling', to: '/services' },
      { label: 'Content writing & branding', to: '/services' },
    ],
  },
  {
    id: 'cyber',
    title: 'Cyber Security (advanced)',
    diamond: true,
    featured: false,
    items: [
      { label: 'Website security audit', to: '/information-security' },
      { label: 'Penetration testing', description: 'Ethical hacking', to: '/information-security' },
      { label: 'Data backup & disaster recovery', to: '/information-security' },
      { label: 'Cloud security setup', description: 'AWS / Google Cloud', to: '/information-security' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & smart tech',
    diamond: false,
    featured: false,
    items: [
      { label: 'IoT smart office / smart home', to: '/process-automation' },
      { label: 'Interactive smart board / ICT lab', to: '/process-automation' },
      {
        label: 'Biometric access control',
        description: 'Door lock, gate, face recognition, cloud-managed',
        to: '/process-automation',
      },
      { label: 'CCTV surveillance & monitoring', to: '/process-automation' },
    ],
  },
  {
    id: 'egov',
    title: 'E-Governance & public service',
    diamond: false,
    featured: true,
    items: [
      {
        label: 'Service Point (municipality / union)',
        description:
          'Digital citizen services, tax & billing, social safety net, village court, admin & finance',
        to: '/services',
      },
    ],
  },
  {
    id: 'growth',
    title: 'Business growth services',
    diamond: false,
    featured: false,
    items: [
      { label: 'Custom software development', description: 'Client requirement–based', to: '/services' },
      { label: 'SaaS platform development', to: '/services' },
      { label: 'Startup IT consulting & system setup', to: '/services' },
      { label: 'Digital transformation consultancy', to: '/services' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & intelligent automation',
    diamond: false,
    featured: false,
    items: [
      {
        label: 'Conversational AI & agentic chatbots',
        description: 'Support agents, multilingual, sales recovery',
        to: '/event-processing',
      },
      {
        label: 'AI-powered analytics & decisions',
        description: 'Inventory, finance, customer behaviour',
        to: '/event-processing',
      },
      {
        label: 'Robotic process automation (RPA)',
        description: 'Data entry, HR & payroll, smart attendance',
        to: '/process-automation',
      },
      {
        label: 'Generative AI for marketing',
        description: 'Auto-content, personalised campaigns',
        to: '/content-management',
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & support',
    diamond: false,
    featured: false,
    items: [
      { label: 'IT training', description: 'Software use, office automation', to: '/services' },
      { label: 'Internship program', description: 'Student-focused', to: '/services' },
      { label: '24/7 technical support & AMC', description: 'Annual maintenance contract', to: '/services' },
    ],
  },
]

/** Split catalogue across top nav (not only under “Services”) */
const SERVICE_NAV_LAYERS = [
  {
    id: 'software',
    navLabel: 'Software & digital',
    sectionIds: ['software', 'web', 'marketing'],
  },
  {
    id: 'secure',
    navLabel: 'Security, automation & AI',
    sectionIds: ['cyber', 'automation', 'ai'],
  },
  {
    id: 'sector',
    navLabel: 'Public sector & growth',
    sectionIds: ['egov', 'growth', 'training'],
  },
]

function getServiceSectionsByIds(ids) {
  return ids.map((id) => SERVICE_MEGA_SECTIONS.find((s) => s.id === id)).filter(Boolean)
}

function MegaServiceLink({ to, label, description, onNavigate }) {
  return (
    <Link to={to} className={megaLinkClass} onClick={onNavigate}>
      <span className="break-words text-[13px] font-medium leading-snug text-white/92">{label}</span>
      {description ? (
        <span className="mt-0.5 block break-words text-[11px] leading-relaxed text-white/48">
          {description}
        </span>
      ) : null}
    </Link>
  )
}

function ServiceSectionHeading({ title, diamond }) {
  return (
    <p className="mb-2.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#43B7E8]">
      {diamond ? <span className="shrink-0 text-[#43B7E8]/90" aria-hidden>◆</span> : null}
      <span className="min-w-0 break-words">{title}</span>
    </p>
  )
}

function MegaSectionsGrid({ sections, shellClassName, onLinkNavigate }) {
  return (
    <div tabIndex={-1} className={shellClassName}>
      <div className="grid min-w-0 grid-cols-1 gap-y-5">
        {sections.map((section) => (
          <div
            key={section.id}
            className={
              section.featured
                ? 'min-w-0 rounded-xl border border-white/20 bg-neutral-950/80 p-3 ring-1 ring-white/[0.07]'
                : 'min-w-0'
            }
          >
            <ServiceSectionHeading title={section.title} diamond={section.diamond} />
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <MegaServiceLink
                  key={`${section.id}-${item.label}`}
                  to={item.to}
                  label={item.label}
                  description={item.description}
                  onNavigate={onLinkNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { role } = useUserRole()
  const [mobileOpen, setMobileOpen] = useState(false)
  /** Mobile: which catalogue layer is expanded — 'services' = legacy pages only */
  const [mobilePanel, setMobilePanel] = useState(null)
  const [logoSrc, setLogoSrc] = useState(logoSvgUrl)
  const [scrolled, setScrolled] = useState(false)

  const isAdmin = role === 'admin'

  const handleLogout = async () => {
    await logout()
    setMobileOpen(false)
  }

  useEffect(() => {
    const png = `${import.meta.env.BASE_URL}logo-softedge.png`
    const probe = new Image()
    probe.onload = () => setLogoSrc(png)
    probe.onerror = () => {}
    probe.src = png
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) setMobilePanel(null)
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full overflow-x-visible overflow-y-visible text-white">
      <div
        className={`w-full overflow-x-visible overflow-y-visible transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/8 bg-[linear-gradient(90deg,rgba(4,17,31,0.86)_0%,rgba(9,38,56,0.78)_50%,rgba(4,17,31,0.86)_100%)] shadow-[0_12px_34px_-22px_rgba(0,0,0,0.75)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-0'
        }`}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-[1440px] items-center justify-between gap-3 overflow-x-visible overflow-y-visible px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 lg:px-7">
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43B7E8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="SoftEdge Technology Limited — Home"
          >
            <img
              src={logoSrc}
              alt=""
              width={190}
              height={48}
              className="h-8 w-auto max-h-9 object-contain object-left sm:h-9 sm:max-h-10"
              decoding="async"
              onError={() => setLogoSrc(logoSvgUrl)}
            />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 overflow-x-visible overflow-y-visible lg:flex xl:gap-x-6"
            aria-label="Main"
          >
          <div className="dropdown dropdown-bottom dropdown-hover">
            <button type="button" tabIndex={0} className={navLinkClass}>
              Services
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={`${dropdownMenuClass} min-w-[14rem]`}>
              <li className="px-1 pb-1">
                <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                  Product pages
                </p>
              </li>
              {LEGACY_SERVICE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="whitespace-normal text-left text-white/90 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {SERVICE_NAV_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              className={`dropdown dropdown-bottom dropdown-hover ${idx >= 1 ? 'dropdown-end' : ''}`}
            >
              <button type="button" tabIndex={0} className={navLinkClass}>
                {layer.navLabel}
                <ChevronDown />
              </button>
              <MegaSectionsGrid
                sections={getServiceSectionsByIds(layer.sectionIds)}
                shellClassName={layeredMegaShellClass}
              />
            </div>
          ))}

          <div className="dropdown dropdown-bottom dropdown-hover dropdown-end">
            <button type="button" tabIndex={0} className={navLinkClass}>
              About
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={dropdownMenuClass}>
              <li>
                <Link to="/about" className="whitespace-normal text-left text-white/90 hover:bg-white/10">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="whitespace-normal text-left text-white/90 hover:bg-white/10">
                  How We Work
                </Link>
              </li>
              <li>
                <Link to="/faq" className="whitespace-normal text-left text-white/90 hover:bg-white/10">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="whitespace-normal text-left text-white/90 hover:bg-white/10">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {isAdmin ? (
            <Link to="/dashboard" className={`${navLinkClass} no-underline`}>
              Dashboard
            </Link>
          ) : null}
          <Link to="/blogs" className={`${navLinkClass} no-underline`}>
            Blog
          </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="group hidden items-center gap-2 rounded-lg bg-[#00d2ff] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:inline-flex"
              >
                Logout
                <ArrowUpRight className="btn-brand-icon h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden rounded-lg border border-white/15 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff] sm:inline-flex"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group hidden items-center gap-2 rounded-lg bg-[#00d2ff] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:inline-flex"
                >
                  Register
                  <ArrowUpRight className="btn-brand-icon h-3.5 w-3.5" />
                </Link>
              </>
            )}

            <button
              type="button"
              className="inline-flex rounded-md p-2 text-white transition-all duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <TwoLineMenuIcon />
            </button>
          </div>
        </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-[linear-gradient(180deg,rgba(4,17,31,0.94)_0%,rgba(7,29,43,0.92)_100%)] px-4 py-3.5 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            <button
              type="button"
              className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-white/95"
              aria-expanded={mobilePanel === 'services'}
              onClick={() => setMobilePanel((p) => (p === 'services' ? null : 'services'))}
            >
              Services
              <ChevronDown
                className={`h-3 w-3 shrink-0 transition-transform ${mobilePanel === 'services' ? 'rotate-180' : ''}`}
              />
            </button>
            {mobilePanel === 'services' ? (
              <div className="mb-2 border-l-2 border-[#43B7E8]/35 pl-3">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">Product pages</p>
                <div className="flex flex-col gap-0.5">
                  {LEGACY_SERVICE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-md py-1.5 text-sm text-white/88 hover:bg-white/5"
                      onClick={() => {
                        setMobileOpen(false)
                        setMobilePanel(null)
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {SERVICE_NAV_LAYERS.map((layer) => (
              <div key={`m-${layer.id}`} className="border-b border-white/[0.06] pb-1 last:border-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-white/95"
                  aria-expanded={mobilePanel === layer.id}
                  onClick={() => setMobilePanel((p) => (p === layer.id ? null : layer.id))}
                >
                  {layer.navLabel}
                  <ChevronDown
                    className={`h-3 w-3 shrink-0 transition-transform ${mobilePanel === layer.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobilePanel === layer.id ? (
                  <div className="mb-2 space-y-3 border-l-2 border-[#43B7E8]/25 pl-3">
                    {getServiceSectionsByIds(layer.sectionIds).map((section) => (
                      <div
                        key={section.id}
                        className={
                          section.featured
                            ? 'rounded-lg border border-white/15 bg-neutral-950/75 p-2.5'
                            : ''
                        }
                      >
                        <ServiceSectionHeading title={section.title} diamond={section.diamond} />
                        <div className="flex flex-col gap-0.5">
                          {section.items.map((item) => (
                            <MegaServiceLink
                              key={`m-${section.id}-${item.label}`}
                              to={item.to}
                              label={item.label}
                              description={item.description}
                              onNavigate={() => {
                                setMobileOpen(false)
                                setMobilePanel(null)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <Link
              to="/about"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              About
              <ChevronDown />
            </Link>
            <Link
              to="/how-we-work"
              className="py-2 text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              How We Work
            </Link>
            <Link
              to="/faq"
              className="py-2 text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/our-team"
              className="py-2 text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Our Team
            </Link>
            {isAdmin ? (
              <Link
                to="/dashboard"
                className="py-2 text-sm font-medium text-white/95"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            ) : null}
            <Link
              to="/blogs"
              className="py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-4 py-2 text-left text-sm font-semibold text-[#00d2ff]"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 text-sm font-medium text-white/95"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 text-sm font-medium text-[#00d2ff]"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
      </div>
    </header>
  )
}
