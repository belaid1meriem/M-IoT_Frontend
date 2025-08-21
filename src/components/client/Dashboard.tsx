import DashboardCard, { type DashboardCardProps } from "../DashboardCard"
import Titles from "../Titles"
import { AirVent, Droplets, ThermometerSun } from "lucide-react"
import { ChartAreaGradient } from "../ui/chart-area-gradient";
import MapCard from "../MapCard";
import DashboardTable from "../DashboardTable";

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
  }
];

const Dashboard = () => {
  return (
    <>
      <Titles title="Tableau de bord" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}


        <div className="lg:col-span-3 md:col-span-2 col-span-1 grid grid-cols-1 max-sm:grid-rows-2 md:grid-cols-2 gap-4">
          <MapCard/>
          <ChartAreaGradient/>
        </div>

        <div className="lg:col-span-3 md:col-span-2 col-span-1">
          <DashboardTable/>
        </div>
        

      </div>

    </>
  );
};

export default Dashboard;
