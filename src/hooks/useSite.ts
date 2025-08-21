import { useState, useEffect } from 'react'
import type { Site } from '@/types/Site'
import useApiClient from './auth/useApiClient'

interface UseSiteReturn {
  site: Site | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useSite = (siteId: number, clientId:number): UseSiteReturn => {
  const [site, setSite] = useState<Site | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiClient = useApiClient()

  const fetchSite = async () => {
    if (!siteId) {
      setSite(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.get(`/site/sites/?client_id=${clientId}&site_id=${siteId}`)
      
      setSite(response.data[0])
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (siteId) {
      fetchSite()
    }
  }, [siteId])

  return {
    site,
    isLoading,
    error,
    refetch: fetchSite
  }
}