import { useSSE } from "../../useSSE"
import type { SensorData } from "@/components/MachineTable";

export const useLastValues = (machineId: number)=>{
    const { message, error, loading } = useSSE<SensorData[]>('/machine/machine/last-values/'+machineId+'/', [], (event)=>event)
    return {
        message: message,
        error,
        loading
    }
}