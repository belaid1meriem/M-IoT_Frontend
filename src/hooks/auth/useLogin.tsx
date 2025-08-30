import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export function useLogin () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const authContext = useAuth()
    const navigate = useNavigate()

    const login = async (email: string, password: string): Promise<void> =>{
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await apiClient.post('/user/token/', {email, password})
            console.log(response.data)

            authContext.setAccessToken(response.data.access)
            localStorage.setItem('clientId',response.data.client_id)
            localStorage.setItem('adminId',response.data.admin_id)
            localStorage.setItem('siteId',response.data.siteId || 1)
            localStorage.setItem('role',response.data.role)
            localStorage.setItem('subdomain', response.data.subdomain)

            setSuccess('Logged in successfully')

            if(response.data.role === 'Admin'){
                navigate('/admin/clients')
            }
            if(response.data.role === 'Client'){
                navigate('/client/'+1)
            }

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