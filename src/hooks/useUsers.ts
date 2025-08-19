import { useState, useEffect } from 'react'
import type { User } from '@/types/User'
import useApiClient from './auth/useApiClient'

interface UseUsersReturn {
  users: User[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useUsers = (siteId:number, clientId: number): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiClient = useApiClient()

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const endpoint =`/clientUsers/list-clientuser/?client_id=${clientId}&site_id=${siteId}`
      const response = await apiClient.get(endpoint)
      
      setUsers(response.data)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [siteId])

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers
  }
}
