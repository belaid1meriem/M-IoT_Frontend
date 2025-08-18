import { Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Site } from '@/types/Site'
import { useNavigate } from 'react-router'
import CapteursTable from './CapteursTable' // reuse the one we built

interface SiteDetailsTableProps {
  site?: Site
  onEdit?: () => void
  showEditButton?: boolean
  className?: string
}

const StatusBadge: React.FC<{ status: boolean }> = ({ status }) => (
  <Badge variant="outline">{status ? 'Activé' : 'Désactivé'}</Badge>
)

const TableRow: React.FC<{
  label: string
  value: React.ReactNode
  showEdit?: boolean
  onEdit?: () => void
  isFirst?: boolean
}> = ({ label, value, showEdit, onEdit, isFirst = false }) => (
  <div
    className={`flex items-center py-2 px-4 border-b ${
      isFirst ? 'bg-accent' : 'bg-background'
    }`}
  >
    <div className="w-1/3 text-sm font-medium">{label}</div>
    <div className="flex-1 px-4">{value}</div>
    <div className="w-12 flex justify-end">
      {showEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
          aria-label="Edit site details"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  </div>
)

// Mock site with captures (for demo)
const DEFAULT_SITE: Site = {
  nom: 'Site Hydra',
  adresse: 'Hydra, Alger',
  latitude: 36.7529,
  longitude: 3.042,
  asset_tracking: true,
  captures: [
    {
      num_serie: 'CAP-001',
      date_install: '2025-08-09',
      parametres: [
        { nom: 'Température', unite: '°C', valeur_max: 100 },
        { nom: 'Pression', unite: 'bar', valeur_max: 10 },
      ],
    },
    {
      num_serie: 'CAP-002',
      date_install: '2025-07-15',
      parametres: [
        { nom: 'Humidité', unite: '%', valeur_max: 90 },
        { nom: 'CO2', unite: 'ppm', valeur_max: 2000 },
      ],
    },
  ],
}

const SiteDetailsTable: React.FC<SiteDetailsTableProps> = ({
  site,
  onEdit,
  showEditButton = true,
  className = '',
}) => {
  const navigate = useNavigate()
  const siteData = site || DEFAULT_SITE

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* --- Site details card --- */}
      <div className="w-full bg-background rounded-sm overflow-hidden border">
        <div className="divide-y">
          <TableRow
            label="Nom"
            value={<span className="text-sm">{siteData.nom}</span>}
            showEdit={showEditButton && !!onEdit}
            onEdit={onEdit}
            isFirst
          />
          <TableRow
            label="Adresse"
            value={<span className="text-sm">{siteData.adresse}</span>}
          />
          <TableRow
            label="Latitude"
            value={<span className="text-sm">{siteData.latitude}</span>}
          />
          <TableRow
            label="Longitude"
            value={<span className="text-sm">{siteData.longitude}</span>}
          />
          <TableRow
            label="Asset Tracking"
            value={<StatusBadge status={siteData.asset_tracking} />}
          />
        </div>
      </div>

      {/* --- Captures Table --- */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Capteurs</h3>
        <CapteursTable />
      </div>
    </div>
  )
}

export default SiteDetailsTable
