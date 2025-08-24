import { useEffect, useState } from "react";
import useApiClient from "../../auth/useApiClientSubDomain";
import { toast } from "sonner";

export type Machine = {
  status: string;
  identificateur: string;
  date_dernier_serv: string | null;
  position: {
    latitude: number,
    longtitude: number
  }
}

export function useMachineDetails (machineId: number) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const  apiClient = useApiClient()
    const [machine, setMachine] = useState<Machine|null>(null)

    const getMachine = async (): Promise<void> =>{
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/machine/machine-dashboard/'+machineId+'/')
            const data = (response.data as Machine)

            setMachine(data)

        } catch (error) {
            setError('An error occured please refresh the page or try again later.')
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getMachine()
    },[])

    useEffect(()=>{
        if(error) toast.error(error)
    },[error])


    return{
        isLoading,
        error,
        getMachine,
        machine
    }
}