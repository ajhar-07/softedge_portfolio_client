import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../Context/Authcontext/AuthContext'
import useUserRole from '../Hooks/userRole.jsx'

function RouteLoader() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center px-4 py-12 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#000b1e]/45 px-6 py-5 text-sm font-medium shadow-xl backdrop-blur-xl">
        Loading protected content...
      </div>
    </div>
  )
}

export default function PrivateRoutes({ requireAdmin = false }) {
  const location = useLocation()
  const { user, loading } = useContext(AuthContext)
  const { role, roleLoading } = useUserRole()

  if (loading || (requireAdmin && roleLoading)) {
    return <RouteLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
