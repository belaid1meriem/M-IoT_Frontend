import useApiClient from "./auth/useApiClient";
import { useState } from "react";

export interface Client {
  email: string;
  password: string;
  telephone: string;
  nom_entreprise: string;
  role: "client";
  adresse: string;
  latitude: 36.7538; 
  longitude: 3.0588; 
  industrie: string;
  nom_resp: string;
  prenom_resp: string;
  status: "active";
}

export function useAddClient () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const apiClient = useApiClient()

    const addClient = async (client: Client): Promise<void> =>{
        setIsLoading(true)
        setError(null)

        try {
            // const response = await apiClient.post('/tenants/add-client/', client)

        } catch (error) {
            setError('Email or nom entreprise already exists')
        } finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        error,
        addClient
    }
}