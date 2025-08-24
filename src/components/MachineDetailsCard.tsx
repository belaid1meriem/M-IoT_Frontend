import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import MapCard from "./MapCard"
import type { Machine } from "@/hooks/dashboard/machine/useMachineDetails"

interface MachineDetailsCardProps {
  machine: Machine;
}

// Helper function to format status for display and badge variant
const getStatusDisplay = (status: string) => {
  const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    'active': { label: 'Actif', variant: 'default' },
    'maintenance': { label: 'En maintenance', variant: 'secondary' },
    'broken': { label: 'En panne', variant: 'destructive' },
    'inactive': { label: 'Inactif', variant: 'outline' }
  };
  
  return statusMap[status.toLowerCase()] || { label: status, variant: 'outline' };
};

// Helper function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
};

const MachineDetailsCard = ({ machine }: MachineDetailsCardProps) => {
  const statusDisplay = getStatusDisplay(machine.status);

  return (
    <Card className="gap-6 pb-3 h-full">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Détail d'objet</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-center gap-4 h-full">
        <div className="space-y-2 text-sm h-fit w-full">

          <div className="flex justify-between">
            <span className="font-medium">Numéro de série:</span>
            <span className="text-muted-foreground">{machine.identificateur}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Statut:</span>
            <Badge variant={statusDisplay.variant}>{statusDisplay.label}</Badge>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date d'installation:</span>
            <span className="text-muted-foreground">N/A</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date de dernier service:</span>
            <span className="text-muted-foreground">{formatDate(machine.date_dernier_serv)}</span>
          </div>

        </div>

        <MapCard position={{
          latitude: machine.position.latitude, 
          longitude: machine.position.longtitude
        }} />

      </CardContent>
    </Card>
  )
}

export default MachineDetailsCard