import { DataTable } from '../../table/DataTable';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, History } from 'lucide-react';
import type { Column } from '@/types/Table';
import type { Trajet } from '@/types/Trajet';
import { useNavigate } from 'react-router';

const getStateColor = (etat: string) => {
  switch (etat) {
    case 'recu':
    case 'reçu':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'stocke':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    case 'en_transit':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    case 'perdu':
    default:
      return 'bg-red-100 text-red-800 hover:bg-red-100';
  }
};

const getStateText = (etat: string) => {
  switch (etat) {
    case 'recu':
    case 'reçu':
      return 'Reçu';
    case 'stocke':
      return 'Stocké';
    case 'en_transit':
      return 'En transit';
    case 'perdu':
      return 'Perdu';
    default:
      return 'Inconnu';
  }
};

interface TrackingTableProps {
  trajets: Trajet[];
  onSearch?: (query: string) => void;
  onExporter?: () => void;
  onFiltrer?: () => void;
  onRowClick?: (trajet: Trajet, index: number) => void;
  searchKey?: keyof Trajet;
  title?: string;
  showHeader?: boolean;
  paginated?: boolean;
  rowsPerPage?: number;
}

const TrackingTable = ({
  trajets,
  onSearch,
  onExporter,
  onFiltrer,
  searchKey = 'objet_nom',
  title = "",
  showHeader = true,
  paginated = true,
  rowsPerPage = 10
}: TrackingTableProps) => {

  const columns: Column<Trajet>[] = [
    {
      header: 'Trajet',
      accessor: 'nom_trajet',
      render: (row) => (
        <div className="font-medium">
          {row.nom_trajet}
        </div>
      )
    },
    {
      header: 'Produit',
      accessor: 'objet_nom',
      render: (row) => (
        <div>
          {row.objet_nom}
        </div>
      )
    },
    {
      header: 'Capteur',
      accessor: 'capteur_num_serie',
      render: (row) => (
        <div className="font-mono text-sm">
          {row.capteur_num_serie}
        </div>
      )
    },
    {
      header: 'Localisation',
      accessor: 'localisation_actuelle',
      render: (row) => (
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          {row.localisation_actuelle}
        </div>
      )
    },
    {
      header: 'Dernière mise à jour',
      accessor: 'derniere_mise_a_jour',
      render: (row) => (
        <div className="text-sm">
          <div>{row.derniere_mise_a_jour}</div>
          <div className="text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {row.heure_derniere_mise_a_jour}
          </div>
        </div>
      )
    },
    {
      header: 'État',
      accessor: 'etat_objet',
      render: (row) => (
        <Badge variant="secondary" className={getStateColor(row.etat_objet)}>
          {getStateText(row.etat_objet)}
        </Badge>
      )
    },
    {
      header: 'Historique',
      accessor: 'historique' as keyof Trajet,
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onHistoryClick) {
              onHistoryClick(row);
            } else {
              console.log('History clicked for:', row.nom_trajet);
            }
          }}
          className="p-2 rounded-md transition-colors duration-200 flex items-center justify-center cursor-pointer"
          title="Voir l'historique"
        >
          <History className="w-4 h-4 text-muted-foreground" />
        </button>
      )
    }
  ];

  const navigate = useNavigate()

  const onHistoryClick = (trajet: Trajet) =>{
    navigate('history/'+trajet.id)
  }

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      console.log('Search:', query);
    }
  };

  const handleExporter = () => {
    if (onExporter) {
      onExporter();
    } else {
      console.log('Exporter clicked');
    }
  };

  const handleFiltrer = () => {
    if (onFiltrer) {
      onFiltrer();
    } else {
      console.log('Filtrer clicked');
    }
  };

  return (
      <DataTable
        data={trajets}
        columns={columns}
        searchKey={searchKey}
        title={title}
        onSearch={handleSearch}
        onPrimaryAction={handleExporter}
        onSecondaryAction={handleFiltrer}
        primaryActionText="Exporter"
        secondaryActionText="Filtrer"
        hasActions={{
          hasPrimaryAction: true,
          hasSecondaryAction: true
        }}
        showHeader={showHeader}
        paginated={paginated}
        rowsPerPage={rowsPerPage}
        clickableRows={false}
        scrollable={true}
      />
  );
};

export default TrackingTable;