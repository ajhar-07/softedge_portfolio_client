import useUserRole from '../../../Hooks/userRole.jsx'
import DashboardShell from '../DashboardShell.jsx'

export default function UserManagement() {
  const {
    users,
    usersLoading,
    usersError,
    changeUserRole,
    removeUser,
    isChangingRole,
    isRemovingUser,
    currentUser,
  } = useUserRole()

  const handleRoleChange = async (userId, role) => {
    await changeUserRole(userId, role)
  }

  const handleRemoveUser = async (userId) => {
    await removeUser(userId)
  }

  return (
    <DashboardShell
      title="User Management"
      subtitle="Ei dashboard page theke admin user list dekhte, role update korte, ar user remove korte parbe. Future dashboard pages o eirokom same sidebar shell er moddhe thakbe."
    >
      <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
        {usersError ? (
          <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {usersError.message}
          </p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-white/55">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-white/70">
                    Loading users...
                  </td>
                </tr>
              ) : users.length ? (
                users.map((user) => {
                  const isCurrentUser = currentUser?.email === user.email

                  return (
                    <tr key={user._id} className="rounded-2xl bg-[#0a3146]/32">
                      <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-white">
                        {user.name || 'Unnamed user'}
                      </td>
                      <td className="px-4 py-4 text-sm text-white/80">{user.email}</td>
                      <td className="px-4 py-4">
                        <select
                          value={user.role}
                          disabled={isChangingRole}
                          onChange={(event) => handleRoleChange(user._id, event.target.value)}
                          className="rounded-lg border border-white/10 bg-[#000b1e]/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00d2ff]/60"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="rounded-r-2xl px-4 py-4">
                        <button
                          type="button"
                          disabled={isCurrentUser || isRemovingUser}
                          onClick={() => handleRemoveUser(user._id)}
                          className="rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isCurrentUser ? 'Current user' : 'Remove'}
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-white/70">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  )
}
