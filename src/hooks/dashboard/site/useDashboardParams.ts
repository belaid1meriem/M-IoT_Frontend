import { SENSOR_OPTIONS } from "@/constants/sensor-options";
import { useSSE } from "../../useSSE"
import type { DashboardCardProps } from "@/components/DashboardCard";
import { Gauge } from "lucide-react";

export interface Param {
  nom: string;
  unite: string;
  valeur_max: number;
  valeur_courante: number;
  date_heure: string;
}

export const useDashboardParams = (siteId: number)=>{
    const { message, error, loading } = useSSE<Param[]>('/captures/sse/realtime-parametre/?site_id='+siteId, [], (event)=>event)
    return {
        message: message.map(mapParamToDashboardCard) as DashboardCardProps[],
        error,
        loading
    }
}

export function mapParamToDashboardCard(param: Param): DashboardCardProps {
  const sensor = SENSOR_OPTIONS.find(s => s.value === param.nom);

  return {
    Icon: sensor?.icon ?? Gauge, // fallback
    paramName: sensor?.label ?? param.nom,
    value: param.valeur_courante.toString(),
    unit: param.unite,
    maxValue: param.valeur_max.toString(),
    lastUpdated: new Date(param.date_heure).toLocaleString(),
  };
}