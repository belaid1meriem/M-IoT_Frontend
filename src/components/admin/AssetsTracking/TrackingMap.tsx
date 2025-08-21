import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trajet } from '@/types/Trajet';
import { Clock, MapPin, Route } from "lucide-react";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different states
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const getIconByState = (etat: string) => {
  switch (etat) {
    case 'recu':
      return createCustomIcon('#22c55e'); // Green
    case 'stocke':
      return createCustomIcon('#eab308'); // Yellow
    case 'en_transit':
      return createCustomIcon('#3b82f6'); // Blue
    default:
      return createCustomIcon('#ef4444'); // Red
  }
};

const getStateColor = (etat: string) => {
  switch (etat) {
    case 'recu':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'stocke':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    case 'en_transit':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    default:
      return 'bg-red-100 text-red-800 hover:bg-red-100';
  }
};

const getStateText = (etat: string) => {
  switch (etat) {
    case 'recu':
      return 'Reçu';
    case 'stocke':
      return 'Stocké';
    case 'en_transit':
      return 'En transit';
    default:
      return 'Inconnu';
  }
};

interface TrackingMapProps {
  trajets: Trajet[];
  onPlanifierTrajet?: () => void;
  height?: string;
}

const TrackingMap = ({ 
  trajets, 
  onPlanifierTrajet,
  height = "h-96"
}: TrackingMapProps) => {
  // Calculate map center based on available trajets
  const mapCenter: [number, number] = trajets && trajets.length > 0
    ? [trajets[0].latitude_actuelle, trajets[0].longitude_actuelle]
    : [36.75, 3.06]; // Default to Algiers

  const handlePlanifierTrajet = () => {
    if (onPlanifierTrajet) {
      onPlanifierTrajet();
    } else {
      console.log('Planifier un trajet clicked');
    }
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-end">
        <Button 
        onClick={handlePlanifierTrajet}
        className="mb-3"
        >
          Planifier un trajet
        </Button>
      </div>
      
      <div className={`${height} rounded-lg overflow-hidden`}>
        <MapContainer 
          center={mapCenter} 
          zoom={10} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {trajets && trajets.map((trajet) => (
            <Marker 
              key={trajet.id}
              position={[trajet.latitude_actuelle, trajet.longitude_actuelle]}
              icon={getIconByState(trajet.etat_objet)}
            >
              <Popup 
                closeButton={false}
                className="custom-popup"
              >
                <div className="bg-card border-0 rounded-lg shadow-xl p-0 min-w-[260px] max-w-[300px] overflow-hidden">
                  {/* Header with close button */}
                  <div className="flex items-center justify-between p-4 pb-2">
                    <h3 className="font-semibold text-card-foreground text-base truncate">
                      {trajet.objet_nom}
                    </h3>
                  </div>
                  
                  {/* Route info */}
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Route className="h-3.5 w-3.5" />
                      <span>{trajet.nom_trajet}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium text-card-foreground">{trajet.localisation_actuelle}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="px-4 pb-4">
                    <Badge 
                      variant="secondary"
                      className={`${getStateColor(trajet.etat_objet)} inline-flex items-center gap-1.5 px-2.5 py-1`}
                    >
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                      {getStateText(trajet.etat_objet)}
                    </Badge>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-muted/20 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {trajet.derniere_mise_a_jour} • {trajet.heure_derniere_mise_a_jour}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingMap;