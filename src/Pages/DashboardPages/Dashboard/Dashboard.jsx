import { Link } from 'react-router-dom'
import useUserRole from '../../../Hooks/userRole.jsx'
import DashboardShell from '../DashboardShell.jsx'

const DASHBOARD_STATS = [
  { label: 'Today Patients', value: '12', helper: 'Dashboard modules', accent: 'from-[#00d2ff] to-[#43B7E8]' },
  { label: 'Investigations', value: '08', helper: 'Active sections', accent: 'from-[#a855f7] to-[#ec4899]' },
  { label: 'Paid Amount', value: '05', helper: 'Live controls', accent: 'from-[#10b981] to-[#34d399]' },
  { label: 'Due Amount', value: '03', helper: 'Pending pages', accent: 'from-[#f59e0b] to-[#f97316]' },
]

const CONTROL_SECTIONS = [
  {
    title: 'Frontend Control Hub',
    description:
      'Tomar public website er important sections ekhane organize thakbe, jekhane porobortite page-level control tools boshano jabe.',
  },
  {
    title: 'DashboardPages Expansion',
    description:
      'Ei folder er modde joto notun admin page create korbe, shobgula ei dashboard shell er shathe linked thakbe.',
  },
  {
    title: 'Navigation Driven Structure',
    description:
      'Sidebar option gulo `Navbar` er adole rakha hoyeche, jate public frontend ar admin dashboard er moddhe clear mapping thake.',
  },
]

export default function Dashboard() {
  const { role, currentUser } = useUserRole()

  return (
    <DashboardShell
      title="Welcome to the SoftEdge Admin Dashboard"
      subtitle="Screenshot-inspired dashboard layout use kora holo, kintu tomar existing cyan-blue design language maintain kore. Ei main page theke future DashboardPages gulo manage, link, ar expand korte parba."
    >
      <div className="grid gap-5 lg:grid-cols-4">
        {DASHBOARD_STATS.map((item) => (
          <div
            key={item.label}
            className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(10,49,70,0.18))] p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className={`h-1 w-full rounded-full bg-gradient-to-r ${item.accent}`} />
            <div className="mt-6 flex items-start justify-between gap-3">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.accent} text-lg font-black text-white`}>
                {item.value}
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/52">{item.label}</p>
                <p className="mt-4 text-4xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-sm text-white/62">{item.helper}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Main Workspace</p>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
            Frontend control korar primary dashboard area
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-white/74">
            Eikhane theke tumi main website er section, content flow, dashboard pages structure ar
            admin operations centralize korte parba. Sidebar gulo `Navbar` er option structure follow
            kore banano, tai public page ar dashboard er moddhe connection clear thakbe.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CONTROL_SECTIONS.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00d2ff,#5b7cff)] text-sm font-black text-[#000b1e]">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{section.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Current Status</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Role</p>
                <p className="mt-2 text-base font-bold text-white">{role || 'loading'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Active Admin</p>
                <p className="mt-2 break-all text-sm text-white/76">{currentUser?.email || 'No active user'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,210,255,0.14),rgba(91,124,255,0.1))] p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.5)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Quick Access</p>
            <Link
              to="/dashboard/user-management"
              className="mt-4 flex items-center justify-between rounded-2xl border border-white/12 bg-[#000b1e]/36 px-4 py-4 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
            >
              <span>Open User Management</span>
              <span>→</span>
            </Link>
            <div className="mt-4 rounded-2xl border border-white/12 bg-[#000b1e]/36 px-4 py-4">
              <p className="text-sm font-semibold text-white">Future DashboardPages</p>
              <p className="mt-2 text-sm leading-7 text-white/68">
                Porobortite new dashboard page create korle same shell ar sidebar navigation er shathe
                connected thakbe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
