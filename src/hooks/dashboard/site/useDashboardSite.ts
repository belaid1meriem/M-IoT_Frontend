import type { DashboardCardProps } from "@/components/DashboardCard";
import { useChart } from "./useChart";
import { useDashboardParams } from "./useDashboardParams";
import { usePosition } from "./useSitePosition";
import { useTableData } from "./useTableData";
import { AirVent, Droplets, ThermometerSun } from "lucide-react"



const dashboardCardsDummy: DashboardCardProps[] = [
  {
    Icon: ThermometerSun,
    paramName: "Température",
    value: "25",
    unit: "°C",
    maxValue: "20",
    lastUpdated: "02-10-2024 à 11:01"
  },
  {
    Icon: Droplets,
    paramName: "Humidité",
    value: "60",
    unit: "%",
    maxValue: "80",
    lastUpdated: "02-10-2024 à 11:01"
  },
  {
    Icon: AirVent,
    paramName: "CO₂",
    value: "420",
    unit: "ppm",
    maxValue: "1000",
    lastUpdated: "02-10-2024 à 11:01"
  }
]

export function useDashboardSite(siteId: number) {
    // Use existing hooks
    const { message: dashboardCards, loading: cardsLoading, error: cardsError } = useDashboardParams(siteId);
    const { position, isLoading: positionLoading, error: positionError } = usePosition(siteId);
    const { data: tableData, isLoading: tableLoading, error: tableError } = useTableData(siteId);
    const { message: chartData, loading: chartLoading, error: chartError } = useChart(siteId);

    // Combined loading state - true if any hook is loading
    const isLoading = cardsLoading || positionLoading || tableLoading || chartLoading;

    // Combined error state - returns the first error found
    const error = cardsError || positionError || tableError || chartError;

    return {
        // Combined states
        isLoading,
        error,
        
        // Individual data
        dashboardCards: dashboardCards.length ? dashboardCards : dashboardCardsDummy,
        position,
        tableData,
        chartData
    }
}