import useApiClient from "./useApiClient";
import { useState } from "react";

export function useResetPassword () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const apiClient = useApiClient()

    const resetPassword = async (email: string): Promise<void> =>{
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await apiClient.post('/user/password-reset/', {email})

            setSuccess('Use the link sent to your email to reset your password')

        } catch (error) {
            setError('Email is invalid')
        } finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        error,
        success,
        resetPassword
    }
}