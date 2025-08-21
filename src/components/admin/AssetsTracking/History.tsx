import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTrajetHistory  } from '@/hooks/useTrajetHistory';
import TrajectoryMap from './TrajectoryMap';
import { useParams } from 'react-router';
import HistoryCard from './HistoryCard';
import Loading from '@/components/Loading';

const Historique = () => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const { trajetId } = useParams()
  const { trajetData, loading, error, refetch } = useTrajetHistory(parseInt(trajetId ? trajetId : '1'));

  const handlePointSelect = (pointId: string) => {
    setSelectedPoint(selectedPoint === pointId ? null : pointId);
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-lg">
        <p>Erreur lors du chargement de l'historique: {error}</p>
        <Button variant="outline" onClick={refetch} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!trajetData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 h-full relative">
        <div className=" col-span-1">
          <TrajectoryMap 
            trajetData={trajetData}
            selectedPoint={selectedPoint}
            onPointClick={handlePointSelect}
            title="Carte du trajet"
            height="h-full"
            showPath={true}
            pathColor="#3E224A"
            zoom={7}
          />
        </div>
        <HistoryCard trajetData={trajetData}/>
    </div>
  );
};

export default Historique;