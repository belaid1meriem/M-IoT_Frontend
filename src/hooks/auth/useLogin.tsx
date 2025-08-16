import apiClient from "@/api/apiClient";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function useLogin () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const authContext = useAuth()

    const login = async (email: string, password: string): Promise<void> =>{
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await apiClient.post('/user/token/', {email, password})

            authContext.setAccessToken(response.data.access)

            setSuccess('Logged in successfully')

        } catch (error) {
            setError('Email or password is invalid')
        } finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        error,
        success,
        login
    }
}