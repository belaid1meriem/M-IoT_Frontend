import { useState, useEffect } from 'react'
import useApiClient from './auth/useApiClient'
import type { ObjetGET } from '@/types/Objet'

interface UseObjetsReturn {
  objets: ObjetGET[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useObjets = (siteId: number, clientId: number): UseObjetsReturn => {
  const [objets, setObjets] = useState<ObjetGET[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiClient = useApiClient()

  const fetchObjets = async () => {
    if (!siteId) {
      setObjets([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const endpoint = '/captures/list-tag-rfid/?client_id='+clientId+'&site_id='+siteId
      const response = await apiClient.get(endpoint)
      
      setObjets(response.data)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchObjets()
  }, [siteId])

  return {
    objets,
    isLoading,
    error,
    refetch: fetchObjets
  }
}