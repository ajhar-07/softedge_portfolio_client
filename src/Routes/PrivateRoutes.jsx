import { Navigate, Outlet, useLocation } from 'react-router-dom'

/**
 * এখানে আপনার আসল অথ সোর্স (JWT, session, TanStack Query, context) বসান।
 * true হলে child রাউটগুলো দেখাবে, না হলে /login এ পাঠাবে।
 */
export function getIsAuthenticated() {
  return Boolean(localStorage.getItem('auth_token'))
}

export default function PrivateRoutes() {
  const location = useLocation()

  if (!getIsAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
