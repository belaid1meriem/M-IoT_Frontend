import { useDashboardParams } from "./useDashboardParams";
import { usePosition } from "./useSitePosition";
import { useTableData } from "./useTableData";

export function useDashboardSite(siteId: number) {
    // Use existing hooks
    const { message: dashboardCards, loading: cardsLoading, error: cardsError } = useDashboardParams(siteId);
    const { position, isLoading: positionLoading, error: positionError } = usePosition(siteId);
    const { data: tableData, isLoading: tableLoading, error: tableError } = useTableData(siteId);

    // Combined loading state - true if any hook is loading
    const isLoading = cardsLoading || positionLoading || tableLoading;

    // Combined error state - returns the first error found
    const error = cardsError || positionError || tableError;

    return {
        // Combined states
        isLoading,
        error,
        
        // Individual data
        dashboardCards,
        position,
        tableData
    }
}