import { useEffect, useState } from "react";
import useApiClient from "./auth/useApiClient";
import type { ClientDetailsData } from "@/types/Client";
import { toast } from "sonner";

export function useDetailClient ({id}:{id: number}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const  apiClient = useApiClient()
    const [client, setClient] = useState<ClientDetailsData|null>(null)

    const getClient = async (id: number): Promise<void> =>{
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/tenants/clients/'+id+'/')
            const data = (response.data as ClientDetailsData)

            setClient(data)

        } catch (error) {
            setError('An error occured please refresh the page or try again later.')
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getClient(id)
    },[])

    useEffect(()=>{
        if(error) toast.error(error)
    },[error])


    return{
        isLoading,
        error,
        getClient,
        client
    }
}