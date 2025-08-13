import { Edit2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Types
interface ClientDetailsData {
  client: string;
  industrie: string;
  description: string;
  adresse: string;
  etat: string;
  telephone: string;
  email: string;
  dateAjout: string;
  sites: string[];
}

interface ClientDetailsTableProps {
  data?: ClientDetailsData;
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

// Constants
const DEFAULT_CLIENT_DATA: ClientDetailsData = {
  client: 'Sonatrac',
  industrie: 'industrie',
  description: 'XXXXXXXXXXXXXX',
  adresse: 'hydra, alger centre',
  etat: 'Actif',
  telephone: '0566775689',
  email: 'Sonatrac@gmail.com',
  dateAjout: '05/05/2025',
  sites: ['Site 1', 'Site 1']
};

const TABLE_ROWS: TableRow[] = [
  { key: 'client', label: 'Client' },
  { key: 'industrie', label: 'Industrie' },
  { key: 'description', label: 'Description' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'etat', label: 'État', isStatus: true },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'email', label: 'Email' },
  { key: 'dateAjout', label: "Date d'ajout" },
];

// Utility Components
const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <Badge variant="outline" >
    {status}
  </Badge>
);

const SiteBadge: React.FC<{ 
  site: string; 
}> = ({ site }) => (
  <Badge variant="outline" >
    {site}
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
  data, 
  onEdit, 
  onAddSite,
  showEditButton = true,
  className = ""
}) => {
  const clientData = data || DEFAULT_CLIENT_DATA;

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
          {clientData.sites.length > 0 ? (
            clientData.sites.map((site, index) => (
              <SiteBadge
                key={`${site}-${index}`}
                site={site}
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

  return (
    <div className={`w-full bg-background rounded-sm overflow-hidden border ${className}`}>
      <div className="divide-y">
        {TABLE_ROWS.map((row, index) => (
          <TableRow
            key={row.key}
            label={row.label}
            value={renderValue(row, clientData[row.key])}
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