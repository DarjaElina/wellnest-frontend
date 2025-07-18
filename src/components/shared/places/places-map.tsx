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

export default function PlacesMap() {
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {data: places, isLoading, isError} = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: getPlaces
  })

  const handleSelectLocation = (pos: [number, number]) => {
    setTempMarker(pos);
    setDialogOpen(true);
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error.</p>
  }

  const handleCancel = () => {
    setTempMarker(null);
    setDialogOpen(false);
  };

  return (
    <div className="h-screen w-full rounded-xl overflow-hidden shadow-lg">
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
        {places && places.map(({ id, lat, lng, title, note, imageUrl }) => (
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

        {tempMarker && (
          <Marker position={tempMarker} icon={MeditationIcon} />
        )}

        <LocationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onCancel={handleCancel}
          lat={tempMarker?.[0] ?? 0}
          lng={tempMarker?.[1] ?? 0}
        />
        <MyLocationButton setMarker={handleSelectLocation} />
      </MapContainer>
    </div>
  );
}
