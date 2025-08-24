import {
  Thermometer,
  Sun,
  Droplets,
  Activity,   // for vibration
  Battery,
  Gauge,      // for pressure
  Zap,        // for amperage
} from "lucide-react";

export const SENSOR_OPTIONS = [
  { label: "Température", value: "temperateur", icon: Thermometer },
  { label: "Luminosité", value: "luminosite", icon: Sun },
  { label: "Humidité", value: "humidite", icon: Droplets },
  { label: "Vibration", value: "vibration", icon: Activity },
  { label: "Voltage", value: "voltage", icon: Battery },
  { label: "Pression", value: "pression", icon: Gauge },
  { label: "Ampérage", value: "amperage", icon: Zap },
];
