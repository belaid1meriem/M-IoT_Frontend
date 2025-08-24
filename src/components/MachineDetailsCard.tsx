import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import MapCard from "./MapCard"

const MachineDetailsCard = () => {
  return (
    <Card className="gap-6 pb-3 h-full">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Détail d’objet</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-center gap-4 h-full">
        <div className="space-y-2 text-sm h-fit w-full">

          <div className="flex justify-between">
            <span className="font-medium">Numéro de série:</span>
            <span className="text-muted-foreground">IOT-007</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Statut:</span>
            <Badge variant="outline">Active</Badge>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date d’installation:</span>
            <span className="text-muted-foreground">03-04-2024</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date de dernier service:</span>
            <span className="text-muted-foreground">03-04-2024</span>
          </div>

        </div>

        <MapCard position={{latitude:36.76, longitude:3.05}} />

      </CardContent>
    </Card>
  )
}

export default MachineDetailsCard
