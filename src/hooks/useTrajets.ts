import type { Trajet } from "@/types/Trajet"
import { useSSE } from "./useSSE"

export const useTrajets = ()=>{
    const { message, error } = useSSE<Trajet>('/captures/trajet-stream/')
    return {
        message,
        error
    }
}