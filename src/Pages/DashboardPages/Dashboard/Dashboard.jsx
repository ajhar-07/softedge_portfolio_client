import { Link } from 'react-router-dom'
import useUserRole from '../../../Hooks/userRole.jsx'
import DashboardShell from '../DashboardShell.jsx'

const WEEKLY_ACTIVITY_BASE = [32, 44, 39, 55, 61, 67, 58]
const TRAFFIC_FLOW_BASE = [20, 28, 31, 37, 42, 48, 53, 60]

export default function Dashboard() {
  const { role, currentUser, users, usersLoading, usersError } = useUserRole()
  const totalUsers = users.length
  const adminUsers = users.filter((user) => user.role === 'admin').length
  const memberUsers = users.filter((user) => user.role === 'user').length
  const ringPercent = Math.min(100, Math.round((adminUsers / Math.max(totalUsers, 1)) * 100))
  const ringStroke = 2 * Math.PI * 44
  const ringOffset = ringStroke - (ringStroke * ringPercent) / 100
  const weeklyActivity = WEEKLY_ACTIVITY_BASE.map((value, index) =>
    Math.min(96, value + Math.min(totalUsers * 2, 24) - index),
  )
  const trafficFlow = TRAFFIC_FLOW_BASE.map((value) => Math.min(92, value + Math.min(adminUsers * 3, 18)))
  const taskProgress = [
    { label: 'User role sync', value: Math.min(100, 45 + adminUsers * 10) },
    { label: 'Profile completion', value: Math.min(100, 35 + totalUsers * 6) },
    { label: 'System readiness', value: Math.min(100, 52 + memberUsers * 8) },
  ]
  const recentUsers = users.slice(0, 5)

  return (
    <DashboardShell
      title="Welcome to the SoftEdge Admin Dashboard"
      subtitle="Screenshot er top stats section remove kora holo, ar ebar API user data based clean dashboard structure banano holo."
    >
      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,210,255,0.15),rgba(10,22,48,0.55),rgba(91,124,255,0.15))] p-6 shadow-[0_14px_45px_-22px_rgba(0,0,0,0.65)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ce9ff]">Control Center</p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Live business overview with smart chart widgets
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Ei main panel theke tumi daily operation, performance trend ar active admin state monitor korte parba.
              Design ta compact but data-focused rakha hoyeche.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#041027]/65 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Active Admin</p>
            <p className="mt-2 max-w-[220px] break-all text-sm font-semibold text-white/90">
              {currentUser?.email || 'No active user'}
            </p>
          </div>
        </div>
      </div>

      {usersError ? (
        <p className="mt-5 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {usersError.message}
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-[#000b1e]/42 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aefff]">Total users</p>
          <p className="mt-3 text-4xl font-black text-white">{usersLoading ? '...' : totalUsers}</p>
          <p className="mt-2 text-sm text-white/62">Live from `/api/users` endpoint</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[#000b1e]/42 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aefff]">Admin accounts</p>
          <p className="mt-3 text-4xl font-black text-white">{usersLoading ? '...' : adminUsers}</p>
          <p className="mt-2 text-sm text-white/62">Dashboard control users</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[#000b1e]/42 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aefff]">Member accounts</p>
          <p className="mt-3 text-4xl font-black text-white">{usersLoading ? '...' : memberUsers}</p>
          <p className="mt-2 text-sm text-white/62">Standard access users</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Weekly Activity</p>
              <p className="text-xs text-white/56">Last 7 days</p>
            </div>
            <div className="mt-6 flex h-52 items-end gap-3">
              {weeklyActivity.map((value, index) => (
                <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-[#0ea5e9] to-[#38bdf8] shadow-[0_10px_20px_-15px_rgba(14,165,233,0.9)]"
                    style={{ height: `${value}%` }}
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">D{index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Traffic Line</p>
              <p className="text-xs text-white/56">Growth trend</p>
            </div>
            <div className="mt-6 flex h-40 items-end gap-2">
              {trafficFlow.map((value, index) => (
                <div key={`${value}-${index}`} className="flex flex-1 items-end">
                  <div
                    className="w-full rounded-full bg-[linear-gradient(180deg,rgba(168,85,247,0.95),rgba(236,72,153,0.7))]"
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-white/55">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
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

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Collection Health</p>
                <div className="mt-4 flex items-center gap-4">
                  <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0">
                    <circle cx="60" cy="60" r="44" stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      stroke="#34d399"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={ringStroke}
                      strokeDashoffset={ringOffset}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div>
                    <p className="text-3xl font-black text-white">{ringPercent}%</p>
                    <p className="text-sm text-white/64">Admin ratio against total API users</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Recent users</p>
                <div className="mt-2 space-y-1.5">
                  {usersLoading ? (
                    <p className="text-sm text-white/70">Loading users...</p>
                  ) : recentUsers.length ? (
                    recentUsers.map((user) => (
                      <p key={user._id} className="truncate text-sm text-white/78">
                        {user.email}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-white/70">No users found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,210,255,0.14),rgba(91,124,255,0.1))] p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.5)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Task Progress</p>
            <div className="mt-4 space-y-4">
              {taskProgress.map((task) => (
                <div key={task.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-white/86">{task.label}</span>
                    <span className="text-white/62">{task.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#818cf8]"
                      style={{ width: `${task.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/dashboard/user-management"
              className="mt-6 flex items-center justify-between rounded-2xl border border-white/12 bg-[#000b1e]/36 px-4 py-4 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
            >
              <span>Open User Management</span>
              <span>→</span>
            </Link>
            <div className="mt-4 rounded-2xl border border-white/12 bg-[#000b1e]/36 px-4 py-4">
              <p className="text-sm font-semibold text-white">Ready for expansion</p>
              <p className="mt-2 text-sm leading-7 text-white/68">
                Future dashboard modules add korle same visual pattern e maintain korte parba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
