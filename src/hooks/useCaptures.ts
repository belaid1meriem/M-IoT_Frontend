import { useState, useEffect } from 'react'
import type { Capture } from '@/types/Site'
import useApiClient from './auth/useApiClient'

interface UseCapturesReturn {
  captures: Capture[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useCaptures = (siteId: number, clientId: number): UseCapturesReturn => {
  const [captures, setCaptures] = useState<Capture[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiClient = useApiClient()

  const fetchCapturesSite = async () => {
    if (!siteId) {
      setCaptures([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const endpoint =`site/captures-site/${siteId}/?client_id=${clientId}`
      const response = await apiClient.get(endpoint)
      
      setCaptures(response.data.captures)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCapturesSite()
  }, [siteId])

  return {
    captures,
    isLoading,
    error,
    refetch: fetchCapturesSite
  }
}