import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

function SearchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L20 20" strokeLinecap="round" />
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
  'dropdown-content menu z-[1000] mt-1 min-w-[12rem] rounded-xl border border-white/15 bg-[#000b1e]/45 p-2 text-sm shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoSrc, setLogoSrc] = useState(logoSvgUrl)

  useEffect(() => {
    const png = `${import.meta.env.BASE_URL}logo-softedge.png`
    const probe = new Image()
    probe.onload = () => setLogoSrc(png)
    probe.onerror = () => {}
    probe.src = png
  }, [])

  return (
    <header className="sticky top-0 z-50 mb-3 px-3 pt-3 text-white sm:mb-4 sm:px-4 md:px-6 md:pt-4">
      <div className="mx-auto max-w-[1440px] overflow-visible rounded-2xl border border-white/15 bg-[#000b1e]/45 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150 md:rounded-[1.35rem]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 overflow-visible px-4 py-3 md:px-6 lg:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43B7E8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="SoftEdge Technology Limited — Home"
        >
          <img
            src={logoSrc}
            alt=""
            width={220}
            height={48}
            className="h-9 w-auto max-h-10 sm:h-10 sm:max-h-11 object-contain object-left"
            decoding="async"
            onError={() => setLogoSrc(logoSvgUrl)}
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-6 overflow-visible lg:flex xl:gap-8"
          aria-label="Main"
        >
          <div className="dropdown dropdown-bottom dropdown-hover dropdown-center">
            <button type="button" tabIndex={0} className={navLinkClass}>
              Services
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={dropdownMenuClass}>
              <li>
                <a className="text-white/90 hover:bg-white/10">Overview</a>
              </li>
              <li>
                <Link to="/services" className="text-white/90 hover:bg-white/10">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/information-security" className="text-white/90 hover:bg-white/10">
                  Our Information Security
                </Link>
              </li>
              <li>
                <Link to="/mobile-platform" className="text-white/90 hover:bg-white/10">
                  Mobile Platform
                </Link>
              </li>
              <li>
                <Link to="/data-synchronization" className="text-white/90 hover:bg-white/10">
                  Data Synchronization
                </Link>
              </li>
              <li>
                <Link to="/process-automation" className="text-white/90 hover:bg-white/10">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link to="/event-processing" className="text-white/90 hover:bg-white/10">
                  Event Processing
                </Link>
              </li>
              <li>
                <Link to="/content-management" className="text-white/90 hover:bg-white/10">
                  Content Management
                </Link>
              </li>
              <li>
                <a className="text-white/90 hover:bg-white/10">Consulting</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom dropdown-hover dropdown-center">
            <button type="button" tabIndex={0} className={navLinkClass}>
              Industries
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={dropdownMenuClass}>
              <li>
                <a className="text-white/90 hover:bg-white/10">FinTech</a>
              </li>
              <li>
                <a className="text-white/90 hover:bg-white/10">Healthcare</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom dropdown-hover dropdown-center">
            <button type="button" tabIndex={0} className={navLinkClass}>
              Technologies
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={dropdownMenuClass}>
              <li>
                <a className="text-white/90 hover:bg-white/10">Cloud</a>
              </li>
              <li>
                <a className="text-white/90 hover:bg-white/10">AI / ML</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom dropdown-hover dropdown-center">
            <button type="button" tabIndex={0} className={navLinkClass}>
              About
              <ChevronDown />
            </button>
            <ul tabIndex={-1} className={dropdownMenuClass}>
              <li>
                <Link to="/about" className="text-white/90 hover:bg-white/10">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="text-white/90 hover:bg-white/10">
                  How We Work
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/90 hover:bg-white/10">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="text-white/90 hover:bg-white/10">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/" className={`${navLinkClass} no-underline`}>
            Case Study
          </Link>
          <Link to="/" className={`${navLinkClass} no-underline`}>
            Blog
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="group btn-brand inline-flex items-center gap-2 rounded-lg bg-[#00d2ff] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-4 md:text-xs"
          >
            Let&apos;s talk
            <ArrowUpRight className="btn-brand-icon h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>

          <button
            type="button"
            className="rounded p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            className="rounded p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <TwoLineMenuIcon />
          </button>

          <button
            type="button"
            className="hidden rounded p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:inline-flex"
            aria-label="More"
          >
            <TwoLineMenuIcon />
          </button>
        </div>
        </div>

      {mobileOpen ? (
        <div className="rounded-b-2xl border-t border-white/10 bg-[#000b1e]/35 px-4 py-4 backdrop-blur-md md:rounded-b-[1.35rem] lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            <Link
              to="/services"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Our Services
              <ChevronDown />
            </Link>
            <Link
              to="/information-security"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Our Information Security
              <ChevronDown />
            </Link>
            <Link
              to="/mobile-platform"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Mobile Platform
              <ChevronDown />
            </Link>
            <Link
              to="/data-synchronization"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Data Synchronization
              <ChevronDown />
            </Link>
            <Link
              to="/process-automation"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Process Automation
              <ChevronDown />
            </Link>
            <Link
              to="/event-processing"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Event Processing
              <ChevronDown />
            </Link>
            <Link
              to="/content-management"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Content Management
              <ChevronDown />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Industries
              <ChevronDown />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-between py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Technologies
              <ChevronDown />
            </Link>
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
            <Link
              to="/"
              className="py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Case Study
            </Link>
            <Link
              to="/"
              className="py-2 text-sm font-medium text-white/95"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>
      ) : null}
      </div>
    </header>
  )
}
