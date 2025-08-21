import { useEffect, useState } from "react"

const domain = 'http://'+localStorage.getItem('subdomain')+':8000/api'
 
export function useSSE<T = any>(url: string, defaultValue: T, getMessage: (event: any)=>T ) {
  const [message, setMessage] = useState<T>(defaultValue)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    const eventSource = new EventSource(domain+url)

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data)
        setMessage(getMessage(parsed))
        setLoading(false)
      } catch {
        console.warn("Non-JSON message:", event.data)
      }
    }

    eventSource.onopen = () => {
      console.log("SSE connection opened")
    }

    eventSource.onerror = (err) => {
      console.error("SSE error:", err)
      setError("Connection lost or failed")
      setLoading(false)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [url])

  return { message, error, loading }
}