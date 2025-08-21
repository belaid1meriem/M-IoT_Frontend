"use client"
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Fix default marker icons for React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type MapPickerProps = {
  onConfirm: (lat: number, lng: number) => void;
};

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
};

function LocationMarker({ 
  position, 
  setPosition 
}: { 
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      const pos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(pos);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapController({ 
  searchLocation 
}: { 
  searchLocation: [number, number] | null;
}) {
  const map = useMap();
  
  useEffect(() => {
    if (searchLocation) {
      map.setView(searchLocation, 15);
    }
  }, [map, searchLocation]);

  return null;
}

function SearchBox({ 
  onSelect 
}: { 
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return [];
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const searchResults: SearchResult[] = await response.json();
      return searchResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length > 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        const searchResults = await handleSearch(value);
        setResults(searchResults);
        setShowResults(true);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    onSelect(lat, lng);
    setQuery(result.display_name);
    setShowResults(false);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative mb-4 z-20">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
        <Input
          type="text"
          placeholder="Search for a location..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pl-12 pr-12 h-12 text-base bg-white/95 backdrop-blur-sm border-white/20 shadow-lg"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      
      {showResults && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-30 max-h-60 overflow-hidden shadow-xl mt-1">
          <CardContent className="p-0">
            <div className="max-h-60 overflow-y-auto">
              {results.map((result, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleResultSelect(result)}
                  className="w-full justify-start h-auto p-4 border-b last:border-b-0 rounded-none text-left"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-2">
                      {result.display_name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function MapPicker({ onConfirm }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    const newPosition: [number, number] = [lat, lng];
    setPosition(newPosition);
    setSearchLocation(newPosition);
  };

  return (
    <Card className="relative overflow-hidden w-full aspect-square py-0">
      {/* Search Bar - Top Left */}
      <div className="absolute top-6 left-6 z-10 w-60">
        <SearchBox onSelect={handleLocationSelect} />
      </div>

      {/* Map Container - Edge to Edge */}
      <MapContainer
        center={[36.7538, 3.0588]} // default center (Algiers)
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <MapController searchLocation={searchLocation} />
      </MapContainer>

      {/* Coordinates and Confirm Button - Bottom Right */}
      {position && (
        <div className="absolute top-6 right-6 z-20">
            <Button
                onClick={() => onConfirm(position[0], position[1])}
                className="flex items-center gap-2 shadow-lg"
                size="default"
                type="button"
            >
                <MapPin className="w-4 h-4" />
                Confirm Location
            </Button>
        </div>
      )}
    </Card>
  );
}