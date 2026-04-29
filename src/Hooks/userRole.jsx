import { useContext, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../Context/Authcontext/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Request failed')
  }

  return data
}

export function getUsers() {
  return apiRequest('/api/users')
}

export function getRoleByEmail(email) {
  return apiRequest(`/api/users/role?email=${encodeURIComponent(email)}`)
}

export function updateUserRole(userId, role) {
  return apiRequest(`/api/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}

export function deleteUser(userId) {
  return apiRequest(`/api/users/${userId}`, {
    method: 'DELETE',
  })
}

export function useUserRole() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const roleQuery = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: Boolean(user?.email),
    queryFn: () => getRoleByEmail(user.email),
    staleTime: 30_000,
  })

  const usersQuery = useQuery({
    queryKey: ['dashboard-users'],
    queryFn: getUsers,
    enabled: roleQuery.data?.role === 'admin',
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard-users'] }),
        queryClient.invalidateQueries({ queryKey: ['user-role'] }),
      ])
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard-users'] }),
        queryClient.invalidateQueries({ queryKey: ['user-role'] }),
      ])
    },
  })

  return useMemo(
    () => ({
      role: roleQuery.data?.role || null,
      roleLoading: authLoading || roleQuery.isLoading,
      roleError: roleQuery.error,
      refreshRole: roleQuery.refetch,
      users: usersQuery.data?.users || [],
      usersLoading: usersQuery.isLoading,
      usersError: usersQuery.error,
      refreshUsers: usersQuery.refetch,
      changeUserRole: (userId, role) => updateRoleMutation.mutateAsync({ userId, role }),
      removeUser: (userId) => deleteUserMutation.mutateAsync(userId),
      isChangingRole: updateRoleMutation.isPending,
      isRemovingUser: deleteUserMutation.isPending,
      currentUser: user,
    }),
    [
      authLoading,
      deleteUserMutation.isPending,
      roleQuery.data?.role,
      roleQuery.error,
      roleQuery.isLoading,
      roleQuery.refetch,
      updateRoleMutation.isPending,
      user,
      usersQuery.data?.users,
      usersQuery.error,
      usersQuery.isLoading,
      usersQuery.refetch,
    ],
  )
}

export default useUserRole
