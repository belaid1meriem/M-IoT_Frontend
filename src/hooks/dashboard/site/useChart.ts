import { useSSE } from "../../useSSE"

export const useChart = (siteId: number)=>{
    const { message, error, loading } = useSSE('/site/graph-sites/?site_id='+siteId, [], (event)=>event)
    return {
        message,
        error,
        loading
    }
}
