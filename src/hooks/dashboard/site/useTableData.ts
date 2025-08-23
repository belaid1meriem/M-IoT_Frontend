import { useEffect, useState } from "react";
import useApiClient from "../../auth/useApiClientSubDomain";
import { toast } from "sonner";
import type { EspaceDeStockage } from "@/components/DashboardTable";


export function useTableData(siteId: number) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const apiClient = useApiClient()
    const [data, setData] = useState<EspaceDeStockage[]>([])

    const getTableData = async (): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiClient.get('/machine/machine-detail/' + siteId + '/')
            const responseData = (response.data as EspaceDeStockage[])

            setData([])

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