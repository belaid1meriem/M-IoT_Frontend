import { Badge } from '@/components/ui/badge'

type StatusBadgeProps = {
  statut: string
}


export const StatusBadge = ({ statut }: StatusBadgeProps) => {
  const getStatusVariant = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'default' // Green variant
      case 'En maintenance':
        return 'secondary' // Orange variant 
      case 'En panne':
        return 'destructive' // Red variant
      default:
        return 'outline'
    }
  }

  const getStatusStyles = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-100'
      case 'En maintenance':
        return 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-100'
      case 'En panne':
        return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-100'
      default:
        return ''
    }
  }

  return (
    <Badge 
      variant={getStatusVariant(statut)}
      className={getStatusStyles(statut)}
    >
      {statut}
    </Badge>
  )
}