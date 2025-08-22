import { Edit2, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ClientDetailsData } from '@/types/Client';
import { useNavigate } from 'react-router';
import { useDetailClient } from '@/hooks/useDetailClient';
import Loading from '../Loading';

interface ClientDetailsTableProps {
  clientId: number;
  onEdit?: () => void;
  onAddSite?: () => void;
  showEditButton?: boolean;
  className?: string;
}

interface TableRow {
  key: keyof ClientDetailsData;
  label: string;
  isStatus?: boolean;
  formatter?: (value: any) => React.ReactNode;
}


const TABLE_ROWS: TableRow[] = [
  { key: 'nom_entreprise', label: 'Client' },
  { key: 'industrie', label: 'Industrie' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'status', label: 'État', isStatus: true },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'email', label: 'Email' },
  { key: 'created_at', label: "Date d'ajout" },
];

// Utility Components
const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <Badge variant="outline" >
    {status}
  </Badge>
);

const SiteBadge: React.FC<{ 
  nom: string
  onClick: ()=>void
}> = ({ nom, onClick }) => (
  <Badge variant="outline" onClick={onClick} className='cursor-pointer' >
    {nom}
  </Badge>
);

const TableRow: React.FC<{
  label: string;
  value: React.ReactNode;
  showEdit?: boolean;
  onEdit?: () => void;
  isFirst?: boolean;
}> = ({ label, value, showEdit, onEdit, isFirst = false }) => (
  <div className={`flex items-center py-2 px-4 border-b ${isFirst ? 'bg-accent' : 'bg-background'}`}>
    <div className="w-1/3 text-sm font-medium">
      {label}
    </div>
    <div className="flex-1 px-4">
      {value}
    </div>
    <div className="w-12 flex justify-end">
      {showEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
          aria-label="Edit client details"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  </div>
);



// Main Component
const ClientDetailsTable: React.FC<ClientDetailsTableProps> = ({ 
  clientId,
  onEdit, 
  onAddSite,
  showEditButton = true,
  className = ""
}) => {

  const navigate = useNavigate()
  const { isLoading, error, client } = useDetailClient(clientId)
  
  const openSite = (id: number) => navigate('site/'+id)
  
  const renderValue = (row: TableRow, value: any): React.ReactNode => {
    if (row.formatter) {
      return row.formatter(value);
    }
    
    if (row.isStatus) {
      return <StatusBadge status={value} />;
    }
    
    return <span className="text-sm">{value}</span>;
  };

  const renderSitesRow = () => (
    <div className="flex items-center py-2 px-6 border-b">
      <div className="w-1/3 text-sm font-medium">
        Site
      </div>
      <div className="flex-1 px-4">
        <div className="flex items-center gap-2 flex-wrap">
          {client && client.sites && client.sites.length > 0 ? (
            client.sites.map((site) => (
              <SiteBadge
                key={site.id}
                nom={site.nom}
                onClick={()=>openSite(site.id)}
              />
            ))
          ) : (
            <span className="text-sm text-muted-foreground italic">
              Aucun site ajouté
            </span>
          )}
        </div>
      </div>
      <div className="w-12 flex justify-end">
        {onAddSite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddSite}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Add new site"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  // Error State
  if (error) {
    return (
      <div className={`w-full bg-background rounded-sm overflow-hidden border ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erreur lors du chargement des détails du client. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <Loading/>
    );
  }

  // Success State - Render the table
  if (!client) {
    return (
      <div className={`w-full bg-background rounded-sm overflow-hidden border ${className}`}>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Aucun client trouvé avec cet identifiant.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`w-full bg-background rounded-sm overflow-hidden border ${className}`}>
      <div className="divide-y">
        {TABLE_ROWS.map((row, index) => (
          <TableRow
            key={row.key}
            label={row.label}
            value={renderValue(row, client[row.key])}
            showEdit={index === 0 && showEditButton && !!onEdit}
            onEdit={onEdit}
            isFirst={index === 0}
          />
        ))}
        {renderSitesRow()}
      </div>
    </div>
  );
};

export default ClientDetailsTable