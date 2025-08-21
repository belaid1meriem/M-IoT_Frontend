import { useState, useEffect } from 'react'
import useApiClient from './auth/useApiClient'

interface Objet {
  num_serie: string
  type: string
  date_install: string
}

interface UseObjetsReturn {
  objets: Objet[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useObjets = (siteId?: string | number): UseObjetsReturn => {
  const [objets, setObjets] = useState<Objet[]>([])
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
      
      const endpoint = siteId ? `/sites/${siteId}/objets` : '/objets'
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