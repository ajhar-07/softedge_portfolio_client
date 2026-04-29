import { Link, NavLink } from 'react-router-dom'
import useUserRole from '../../Hooks/userRole.jsx'
import { dashboardPageLinks, dashboardSidebarGroups } from './dashboardNav.js'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L20 20" strokeLinecap="round" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 4a4 4 0 0 0-4 4v2.3c0 .7-.2 1.4-.5 2L6 15h12l-1.5-2.7a4 4 0 0 1-.5-2V8a4 4 0 0 0-4-4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  )
}

export default function DashboardShell({ title, subtitle, children }) {
  const { role, currentUser } = useUserRole()
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Admin user'

  return (
    <div className="w-full bg-transparent text-white">
      <section className="mx-auto w-full max-w-[1500px] px-3 pb-8 pt-24 sm:px-4 lg:px-6">
        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[28px] border border-white/10 bg-[#000b1e]/58 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-2xl backdrop-saturate-150">
            <div className="border-b border-white/10 px-5 py-6">
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-2xl font-bold text-white">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00d2ff,#5b7cff)] text-base font-black text-[#000b1e]">
                  S
                </span>
                <span>SoftEdge Admin</span>
              </Link>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Navbar-inspired sidebar diye dashboard pages control korar main workspace.
              </p>
            </div>

            <div className="max-h-[calc(100dvh-13rem)] space-y-6 overflow-y-auto px-4 py-5">
              <div>
                <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00d2ff]">
                  Dashboard Pages
                </p>
                <div className="space-y-2">
                  {dashboardPageLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'border-[#00d2ff]/25 bg-[linear-gradient(135deg,rgba(0,210,255,0.24),rgba(91,124,255,0.18))] text-white'
                            : 'border-white/8 bg-white/[0.03] text-white/78 hover:border-[#00d2ff]/22 hover:bg-[#0a3146]/34 hover:text-white'
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      <span className="text-xs opacity-70">→</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {dashboardSidebarGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/38">
                    {group.title}
                  </p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <Link
                        key={`${group.title}-${item.label}`}
                        to={item.to}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/74 transition hover:border-[#00d2ff]/20 hover:bg-[#0a3146]/34 hover:text-white"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs opacity-60">›</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/52 px-4 py-4 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.62)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/55">
                  <SearchIcon />
                  <span className="text-sm">Search dashboard pages, controls or modules...</span>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-[#00d2ff]/20 hover:text-white"
                    aria-label="Notifications"
                  >
                    <BellIcon />
                  </button>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00d2ff,#5b7cff)] text-sm font-black text-[#000b1e]">
                      {displayName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{displayName}</p>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#00d2ff]">
                        {role || 'loading'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#000b1e]/52 p-4 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl backdrop-saturate-150 sm:p-5 lg:p-6">
              <div className="rounded-[26px] bg-[linear-gradient(135deg,rgba(0,210,255,0.22),rgba(91,124,255,0.16))] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:px-7 sm:py-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Control Center</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
                  {title}
                </h1>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-white/78 sm:text-base">
                  {subtitle}
                </p>
              </div>

              <div className="mt-5">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
