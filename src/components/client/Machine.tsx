import DashboardCard, { type DashboardCardProps } from "../DashboardCard"
import Titles from "../Titles"
import { AirVent, Droplets, ThermometerSun } from "lucide-react"
import { ChartAreaGradient } from "../ui/chart-area-gradient";
import MachineDetailsCard from "../MachineDetailsCard";
import { useParams } from "react-router";
import MachineTable from "../MachineTable";
import useDashboardMachine from "@/hooks/dashboard/machine/useDashboardMachine";

const dashboardCards: DashboardCardProps[] = [
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
  },
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
];

const dashboardCards2: DashboardCardProps[] = [
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
  }
];

const Machine = () => {
  const { machineId } = useParams();
  const machineID = machineId ? parseInt(machineId) : null;

  const { 
    machine, 
    lastValues, 
    isLoading, 
    error 
  } = useDashboardMachine(machineID as number);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <Titles title={'Tableau de bord/ '+machineId }/>
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-muted-foreground">Chargement des données de la machine...</div>
          </div>
        </div>
      </>
    )
  }

  // Handle error state
  if (error) {
    return (
      <>
        <Titles title={'Tableau de bord/ '+machineId }/>
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-red-500 text-lg">⚠️ Erreur</div>
            <div className="text-red-500 max-w-md">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Actualiser la page
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Titles title={'Tableau de bord/ '+machineId }/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="row-span-2 md:col-span-2 col-span-1">
          {machine && <MachineDetailsCard machine={machine} />}
        </div>
        
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}

        <div className="lg:col-span-3 md:col-span-2 col-span-1 grid grid-cols-1 max-sm:grid-rows-2 md:grid-cols-3 gap-4">
          <div className="row-span-2 md:col-span-2 col-span-1">
            <ChartAreaGradient/>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            {dashboardCards2.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 md:col-span-2 col-span-1">
          {lastValues && <MachineTable data={lastValues} />}
        </div>
      </div>
    </>
  );
};

export default Machine;