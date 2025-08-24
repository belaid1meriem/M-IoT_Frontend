import { useEffect, useState } from "react";
import useApiClient from "../../auth/useApiClientSubDomain";
import { toast } from "sonner";

export type Position = {
    latitude: number;
    longitude: number;
}

export function usePosition (siteId: number) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const  apiClient = useApiClient()
    const [position, setPosition] = useState<Position>({latitude: 36.75, longitude: 3.06})

    const getposition = async (): Promise<void> =>{
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/site/site-position/'+siteId+'/')
            const data = (response.data as Position)

            setPosition(data)

        } catch (error) {
            setError('An error occured please refresh the page or try again later.')
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getposition()
    },[])

    useEffect(()=>{
        if(error) toast.error(error)
    },[error])


    return{
        isLoading,
        error,
        getposition,
        position
    }
}