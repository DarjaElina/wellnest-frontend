import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import LocationPicker from "./location-picker.tsx";
import MyLocationButton from "./my-location-button.tsx";
import LocationDialog from "./location-dialog.tsx";
import { MeditationIcon } from "@/helper/places.ts";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/services/places.ts";
import type { Place } from "@/types/places.types.ts";
import { useIsDemo } from "@/context/demoContext.tsx";
import { Loader2, AlertCircle } from "lucide-react";

export default function PlacesMap() {
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isDemo = useIsDemo();

  const {
    data: places = [],
    isLoading,
    isError,
  } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: getPlaces,
    enabled: !isDemo,
  });

  const demoPlaces: Place[] = [
    {
      id: "1",
      title: "Peaceful Park",
      note: "Sat under a tree and meditated 🌳",
      imageUrl: "/assets/demo/park.avif",
      lat: 60.1708,
      lng: 24.9375,
    },
    {
      id: "2",
      title: "Seaside Bench",
      note: "Watched the waves, felt calm 🌊",
      imageUrl: "/assets/demo/bench.avif",
      lat: 60.1679,
      lng: 24.9562,
    },
  ];

  const visiblePlaces = isDemo ? demoPlaces : places;

  const handleSelectLocation = (pos: [number, number]) => {
    setTempMarker(pos);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setTempMarker(null);
    setDialogOpen(false);
  };

  return (
    <div className="relative h-screen w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[60.1695, 24.9354]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full rounded-xl z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <LocationPicker onSelect={handleSelectLocation} />

        {visiblePlaces.map(({ id, lat, lng, title, note, imageUrl }) => (
          <Marker key={id} position={[lat, lng]} icon={MeditationIcon}>
            <Popup>
              <strong>{title}</strong>
              <p>{note}</p>
              {imageUrl && (
                <img src={imageUrl} alt={title} className="mt-2 rounded-md" />
              )}
            </Popup>
          </Marker>
        ))}

        {tempMarker && <Marker position={tempMarker} icon={MeditationIcon} />}

        <LocationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onCancel={handleCancel}
          lat={tempMarker?.[0] ?? 0}
          lng={tempMarker?.[1] ?? 0}
        />

        <MyLocationButton setMarker={handleSelectLocation} />
      </MapContainer>

      {isLoading && !isDemo && (
        <div className="absolute top-4 right-4 z-50 bg-muted px-3 py-2 rounded-md shadow text-sm flex items-center gap-2">
          <Loader2 className="animate-spin w-4 h-4" />
          Loading places...
        </div>
      )}

      {isError && (
        <div className="absolute top-4 right-4 z-50 bg-destructive text-destructive-foreground px-3 py-2 rounded-md shadow text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Failed to load places
        </div>
      )}
    </div>
  );
}
