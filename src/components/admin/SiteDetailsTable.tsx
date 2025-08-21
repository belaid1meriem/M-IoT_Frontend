import { Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Site } from '@/types/Site'
import CapteursTable from './CapteursTable'
import Loading from '../Loading'
import { useSite } from '@/hooks/useSite'
import { useCaptures } from '@/hooks/useCaptures'

interface SiteDetailsTableProps {
  siteId: number
  clientId: number
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

const SiteDetailsTable: React.FC<SiteDetailsTableProps> = ({
  siteId,
  clientId,
  site: propSite,
  onEdit,
  showEditButton = true,
  className = '',
}) => {
  
  // Use hook to fetch site data if siteId is provided and no site prop
  const { site: fetchedSite, isLoading: siteLoading, error: siteError } = useSite(siteId, clientId)
  
  // Fetch captures for this site
  const { captures, isLoading: capturesLoading, error: capturesError } = useCaptures(siteId, clientId)
  
  const siteData = propSite || fetchedSite

  if (siteLoading) {
    return <Loading />
  }

  if (siteError) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <p>Erreur lors du chargement du site: {siteError}</p>
      </div>
    )
  }

  if (!siteData) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        <p>Aucune donnée de site disponible</p>
      </div>
    )
  }

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
        <CapteursTable 
          captures={captures}
          isLoading={capturesLoading}
          error={capturesError}
        />
      </div>
    </div>
  )
}

export default SiteDetailsTable