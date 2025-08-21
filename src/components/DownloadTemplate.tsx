import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Download,
} from "lucide-react"
const DownloadTemplate = () => {
    const downloadTemplate = () => {
        const content = JSON.stringify([
        {
            nom: "Dupont",
            prenom: "Jean",
            email: "jean.dupont@example.com",
            role: "Opérateur",
            departement: "Production",
            telephone: "+33123456789",
            date_embauche: "2025-01-15",
            statut: "Actif",
            acces_zones: ["Zone 1", "Zone 2"],
            permissions: ["Lecture", "Écriture"]
        },
        {
            nom: "Martin",
            prenom: "Marie",
            email: "marie.martin@example.com",
            role: "Superviseur",
            departement: "Maintenance",
            telephone: "+33987654321",
            date_embauche: "2024-12-01",
            statut: "Actif",
            acces_zones: ["Zone 1", "Zone 2", "Zone 3"],
            permissions: ["Lecture", "Écriture", "Administration"]
        }
        ], null, 2);

        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template_utilisateurs.json';
        a.click();
        URL.revokeObjectURL(url);
  };
  return (
    <Card>
        <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Modèle de fichier
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
            <p className="font-medium">Télécharger le modèle</p>
            <p className="text-sm text-muted-foreground">
                Utilisez ce modèle pour structurer vos données utilisateurs
            </p>
            </div>
            <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={downloadTemplate}
            >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
            </Button>
        </div>
        </CardContent>
    </Card>
  )
}

export default DownloadTemplate