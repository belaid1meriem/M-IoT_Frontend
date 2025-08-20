import { useTrajets } from '@/hooks/useTrajets'
import Titles from '../../Titles'
import TrackingMap from './TrackingMap';
import TrackingTable from './TrackingTable';

const Localisation = () => {
  const { message: trajets, error } = useTrajets();

  const handlePlanifierTrajet = () => {
    console.log('Planifier un trajet clicked');
    // Add your logic here
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Add your search logic here
  };

  const handleExporter = () => {
    console.log('Exporter clicked');
    // Add your export logic here
  };

  const handleFiltrer = () => {
    console.log('Filtrer clicked');
    // Add your filter logic here
  };

  const handleRowClick = (trajet: any, index: number) => {
    console.log('Row clicked:', trajet, index);
    // Add your row click logic here (e.g., navigate to details page)
  };

  return (
    <div className="">
      <Titles title='Assets Tracking / Localisation' />
      
      {/* Error Display */}
      {error && (
        <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-lg">
          Erreur lors du chargement des données: {error}
        </div>
      )}

      {/* Map Section */}
      <TrackingMap 
        trajets={trajets || []}
        onPlanifierTrajet={handlePlanifierTrajet}
        height="h-96"
      />

      {/* Table Section */}
      <TrackingTable 
        trajets={trajets || []}
        onSearch={handleSearch}
        onExporter={handleExporter}
        onFiltrer={handleFiltrer}
        onRowClick={handleRowClick}
        searchKey="objet_nom"
        showHeader={true}
        paginated={true}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Localisation;