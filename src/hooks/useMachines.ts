import { useState, useEffect } from 'react'
import type { Machine } from '@/types/Machine'
import useApiClient from './auth/useApiClient'

interface UseMachinesReturn {
  machines: Machine[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useMachines = (siteId?: string | number): UseMachinesReturn => {
  const [machines, setMachines] = useState<Machine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiClient = useApiClient()

  const fetchMachines = async () => {
    if (!siteId) {
      setMachines([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const endpoint = siteId ? `/sites/${siteId}/machines` : '/machines'
      const response = await apiClient.get(endpoint)
      
      setMachines(response.data)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMachines()
  }, [siteId])

  return {
    machines,
    isLoading,
    error,
    refetch: fetchMachines
  }
}