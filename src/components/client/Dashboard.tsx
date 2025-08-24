import DashboardCard from "../DashboardCard"
import Titles from "../Titles"

import { ChartAreaGradient } from "../ui/chart-area-gradient";
import MapCard from "../MapCard";
import DashboardTable from "../DashboardTable";
import { useParams } from "react-router";
import { useDashboardSite } from "@/hooks/dashboard/site/useDashboardSite";

const Dashboard = () => {
  const { siteId } = useParams()
  const siteID = siteId ? parseInt(siteId) : null;

  const { 
    dashboardCards, 
    position, 
    tableData,
    chartData, 
    isLoading, 
    error 
  } = useDashboardSite(siteID as number);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <Titles title="Tableau de bord" />
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-muted-foreground">Chargement du tableau de bord...</div>
          </div>
        </div>
      </>
    )
  }

  // Handle error state
  if (error) {
    return (
      <>
        <Titles title="Tableau de bord" />
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
      <Titles title="Tableau de bord" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}

        <div className="lg:col-span-3 md:col-span-2 col-span-1 grid grid-cols-1 max-sm:grid-rows-2 md:grid-cols-2 gap-4">
          {position && <MapCard position={position}/>}
          <ChartAreaGradient chartData={chartData}/>
        </div>

        <div className="lg:col-span-3 md:col-span-2 col-span-1">
          <DashboardTable data={tableData}/>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;