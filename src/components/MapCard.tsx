import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapCard = () => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-sm">
      <MapContainer center={[36.75, 3.06]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[36.75, 3.06]}>
          <Popup>Algiers</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapCard;
