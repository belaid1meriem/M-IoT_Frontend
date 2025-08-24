import { useEffect, useState } from "react";
import useApiClient from "../../auth/useApiClientSubDomain";
import { toast } from "sonner";
import type { EspaceDeStockage } from "@/components/DashboardTable";

interface SourceData {
  id: number;
  identificateur: string;
  status: string;
  date_dernier_serv: string | null;
}

function parseEquipmentData(sourceData: SourceData): EspaceDeStockage {
  // Status mapping
  const statusMap: Record<string, 'Actif' | 'En maintenance' | 'En panne'> = {
    'active': 'Actif',
    'maintenance': 'En maintenance',
    'broken': 'En panne',
    'inactive': 'En panne'
  };

  return {
    id: sourceData.id,
    objet: `Equipment ${sourceData.id}`, // Default object name since not in source
    numeroSerie: sourceData.identificateur,
    statut: statusMap[sourceData.status] || 'En panne', // Default to 'En panne' if unknown status
    dateInstallation: new Date().toISOString().split('T')[0], // Default to today since not in source
    dateDernierService: sourceData.date_dernier_serv || 'N/A' // Use provided date or 'N/A' if null
  };
}

export function useTableData(siteId: number) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const apiClient = useApiClient()
    const [data, setData] = useState<EspaceDeStockage[]>([])

    const getTableData = async (): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/machine/machine-detail/?site_id=' + siteId )
            const responseData = (response.data as SourceData[])

            setData(responseData.map(parseEquipmentData))

        } catch (error) {
            setError('An error occurred please refresh the page or try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTableData()
    }, [])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    return {
        isLoading,
        error,
        getTableData,
        data
    }
}