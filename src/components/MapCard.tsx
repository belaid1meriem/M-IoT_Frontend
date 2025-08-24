import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Position } from "@/hooks/dashboard/site/useSitePosition";

const MapCard = ({ position }: { position: Position }) => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-sm">
      <MapContainer 
        center={[position.latitude, position.longitude]} 
        zoom={12} 
        scrollWheelZoom={false} 
        style={{ zIndex: 0 }} 
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[position.latitude, position.longitude]}>
          <Popup>Algiers</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapCard;