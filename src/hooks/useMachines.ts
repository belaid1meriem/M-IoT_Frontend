import { useState, useEffect } from 'react'
import type { MachineGET } from '@/types/Machine'
import useApiClient from './auth/useApiClient'

interface UseMachinesReturn {
  machines: MachineGET[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useMachines = (clientId: number, siteId: number): UseMachinesReturn => {
  const [machines, setMachines] = useState<MachineGET[]>([])
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
      
      const endpoint = '/machine/machines/?client_id='+ clientId+'&site_id='+siteId
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