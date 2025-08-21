import useApiClient from "./useApiClient";
import { useState } from "react";

export function useChangePassword () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const apiClient = useApiClient()

    const changePassword = async (oldPassword: string, newPassword: string): Promise<void> =>{
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await apiClient.put('/user/change-password/', {
                old_password: oldPassword,
                new_password: newPassword
            })

            setSuccess('Password changed successfully')

        } catch (error) {
            setError('The old password is wrong')
        } finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        error,
        success,
        changePassword
    }
}