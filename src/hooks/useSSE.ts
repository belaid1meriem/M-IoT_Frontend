import { useEffect, useState } from "react"

const domain = 'http://'+localStorage.getItem('subdomain')+':8000/api'

export function useSSE<T = any>(url: string, defaultValue: T) {
  const [message, setMessage] = useState<T>(defaultValue)
  const [error, setError] = useState<string | null>(null)
  // useEffect(() => {
  //   const eventSource = new EventSource(domain+url)

  //   eventSource.onmessage = (event) => {
  //     try {
  //       console.log(event.data)
  //       const parsed = JSON.parse(event.data)
  //       setMessage(parsed) 
  //     } catch {
  //       console.warn("Non-JSON message:", event.data)
  //     }
  //   }

  //   eventSource.onerror = (err) => {
  //     console.error("SSE error:", err)
  //     setError("Connection lost or failed")
  //     eventSource.close()
  //   }

  //   return () => {
  //     eventSource.close()
  //   }
  // }, [url])

  return { message, error }
}
