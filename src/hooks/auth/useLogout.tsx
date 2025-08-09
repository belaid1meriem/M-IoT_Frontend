import { useNavigate } from "react-router"; 
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useLogout () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()
    const { setAccessToken, setRefreshToken } = useAuth()

    const logout = async (): Promise<void> =>{
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            setAccessToken(null)
            setRefreshToken(null)

            setSuccess('Logged out successfully')
            toast.success('Logged out successfully')
            navigate('/auth/login')

        } catch (error) {
            setError('An error occured, please try again!')
        } finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        error,
        success,
        logout
    }
}