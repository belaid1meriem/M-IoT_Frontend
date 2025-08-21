import DashboardCard, { type DashboardCardProps } from "../DashboardCard"
import Titles from "../Titles"
import { AirVent, Droplets, ThermometerSun } from "lucide-react"
import { ChartAreaGradient } from "../ui/chart-area-gradient";
import MapCard from "../MapCard";
import DashboardTable from "../DashboardTable";
import MachineDetailsCard from "../MachineDetailsCard";
import { useParams } from "react-router";
import MachineTable from "../MachineTable";

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
  return (
    <>
      <Titles title={'Tableau de bord/ '+machineId }/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="row-span-2 md:col-span-2 col-span-1">
          <MachineDetailsCard />
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
          <MachineTable/>
        </div>
        

      </div>

    </>
  );
};

export default Machine;
