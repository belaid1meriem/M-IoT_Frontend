import { useEffect, useState } from "react";
import useApiClient from "./auth/useApiClient";
import type { Client } from "@/types/Client";
import { toast } from "sonner";

export function useClients () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const  apiClient = useApiClient()
    const [clients, setClients] = useState<Client[]>([])

    const getClients = async (): Promise<void> =>{
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/tenants/clients/')
            const data = (response.data as Client[])

            setClients(data)

        } catch (error) {
            setError('An error occured please refresh the page or try again later.')
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getClients()
    },[])

    useEffect(()=>{
        if(error) toast.error(error)
    },[error])


    return{
        isLoading,
        error,
        getClients,
        clients
    }
}