import { useEffect } from "react"
import { useResetPassword } from "./hooks/auth/useResetPassword"
import AppRoutes from "./routes"
import { Toaster } from "@/components/ui/sonner"
function App() {
  const { resetPassword } = useResetPassword()
  useEffect(() => {
    (async () => {
      await resetPassword('mm_belaid@esi.dz')
    })()
  }, [])
  return (
    <>
      <AppRoutes />
      <Toaster/>
    </>
  )
}

export default App