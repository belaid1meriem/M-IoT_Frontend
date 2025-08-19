import { useEffect } from "react"
import AppRoutes from "./routes"
import { Toaster } from "@/components/ui/sonner"
import { useSSE } from "./hooks/useSSE"
function App() {
//  const { messages, error } = useSSE("http://rofieda.lvh.me:8000/api/captures/trajet-stream/")
//   useEffect(() => {
//     console.log('new message:', messages)
//   }, [messages])
  return (
    <>
      <AppRoutes />
      <Toaster/>
    </>
  )
}

export default App