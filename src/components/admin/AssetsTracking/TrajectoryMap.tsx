import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-routing-machine';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { TrajetHistorique } from '@/hooks/useTrajetHistory';
import { getStatusColor, getStatusText, getPointTypeText } from '@/hooks/useTrajetHistory';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different point types
const createCustomIcon = (color: string, isActive: boolean = false) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      width: ${isActive ? '24px' : '16px'};
      height: ${isActive ? '24px' : '16px'};
      border-radius: 50%;
      background-color: ${color};
      border: ${isActive ? '4px' : '3px'} solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [isActive ? 24 : 16, isActive ? 24 : 16],
    iconAnchor: [isActive ? 12 : 8, isActive ? 12 : 8]
  });
};

const getIconByStatus = (statut: string, isActive: boolean = false) => {
  switch (statut) {
    case 'arrive':
      return createCustomIcon('#22c55e', isActive); // Green
    case 'arrive_en_retard':
      return createCustomIcon('#ef4444', isActive); // Red
    case 'en_attente':
      return createCustomIcon('#eab308', isActive); // Yellow
    case 'position_actuelle':
        return createCustomIcon('#9333ea', isActive) //Purple
    default:
      return createCustomIcon('#6b7280', isActive); // Gray
  }
};

// Routing Machine Component
const RoutingMachine = ({ waypoints, routingOptions = {} }) => {
  const map = useMap();

  useEffect(() => {
    if (!waypoints || waypoints.length < 2) return;

    // Create routing control
    const routingControl = L.Routing.control({
      waypoints: waypoints.map(point => L.latLng(point.lat, point.lng)),
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: () => null, // Don't create markers, we'll handle them separately
      lineOptions: {
        styles: [
          {
            color: routingOptions.color || '#8b5cf6',
            weight: routingOptions.weight || 4,
            opacity: routingOptions.opacity || 0.8
          }
        ]
      },
      show: false, // Hide the routing instructions panel
      ...routingOptions
    }).addTo(map);

    // Hide the routing control panel
    const routingContainer = routingControl.getContainer();
    if (routingContainer) {
      routingContainer.style.display = 'none';
    }

    // Cleanup function
    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, waypoints, routingOptions]);

  return null;
};

interface TrajectoryMapProps {
  trajetData: TrajetHistorique;
  title?: string;
  height?: string;
  selectedPoint?: string | null;
  onPointClick?: (pointId: string) => void;
  showPath?: boolean;
  pathColor?: string;
  zoom?: number;
  routingService?: 'osrm' | 'mapbox' | 'graphhopper';
}

const TrajectoryMap = ({ 
  trajetData, 
  title = "Carte du trajet",
  height = "h-96",
  selectedPoint,
  onPointClick,
  showPath = true,
  pathColor = "#8b5cf6",
  zoom = 7,
  routingService = 'osrm'
}: TrajectoryMapProps) => {
  
  // Calculate map center and bounds
  const coordinates = trajetData.points_trajet.map(point => 
    [point.latitude, point.longitude] as [number, number]
  );
  
  const mapCenter: [number, number] = coordinates.length > 0 
    ? [coordinates[0][0], coordinates[0][1]]
    : [36.7729333, 3.0588445];

  // Create waypoints for routing (sorted by order)
  const waypoints = trajetData.points_trajet
    .sort((a, b) => a.ordre - b.ordre)
    .map(point => ({
      lat: point.latitude,
      lng: point.longitude,
      name: point.nom_lieu
    }));

  // Routing service configuration
  const getRoutingOptions = () => {
    const baseOptions = {
      color: pathColor,
      weight: 4,
      opacity: 0.8
    };

    switch (routingService) {
      case 'mapbox':
        // Note: Requires API key
        return {
          ...baseOptions,
          router: L.Routing.mapbox('your-mapbox-token') // Replace with actual token
        };
      case 'graphhopper':
        // Note: Requires API key
        return {
          ...baseOptions,
          router: L.Routing.graphHopper('your-graphhopper-key') // Replace with actual key
        };
      case 'osrm':
      default:
        return {
          ...baseOptions,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          })
        };
    }
  };

  const handleMarkerClick = (pointId: string) => {
    if (onPointClick) {
      onPointClick(pointId);
    }
  };

  return (
    <div className={`${height} rounded-lg overflow-hidden relative z-20`}>
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Add routing machine for real routes */}
        {showPath && waypoints.length > 1 && (
          <RoutingMachine 
            waypoints={waypoints}
            routingOptions={getRoutingOptions()}
          />
        )}
        
        {/* Add markers for each point */}
        {trajetData.points_trajet.map((point) => {
          const isSelected = selectedPoint === point.id;
          const isActive = point.est_position_actuelle || isSelected;
          
          return (
            <Marker 
              key={point.id}
              position={[point.latitude, point.longitude]}
              icon={getIconByStatus(point.statut, isActive)}
              eventHandlers={{
                click: () => handleMarkerClick(point.id)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{point.nom_lieu}</h4>
                  <p className="text-sm text-gray-600">Type: {getPointTypeText(point.type)}</p>
                  <div className="mt-2">
                    <Badge variant="secondary" className={getStatusColor(point.statut)}>
                      {getStatusText(point.statut)}
                    </Badge>
                  </div>
                  {point.date_prevu && (
                    <p className="text-xs text-gray-500 mt-1">
                      Prévu: {point.date_prevu}
                    </p>
                  )}
                  {point.date_entree && point.heure_entree && (
                    <p className="text-xs text-gray-500 mt-1">
                      Arrivé: {point.date_entree} à {point.heure_entree}
                    </p>
                  )}
                  {point.est_position_actuelle && (
                    <p className="text-xs text-purple-600 mt-1">
                      📍 Position actuelle
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TrajectoryMap;