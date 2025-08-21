import type { Trajet } from "@/types/Trajet"
import { useSSE } from "./useSSE"

export const useTrajets = ()=>{
    const { message, error, loading } = useSSE<Trajet[]>('/captures/trajet-stream-all/', [], (event)=>event.trajets)
 
    return {
        message,
        error,
        loading
    }
}