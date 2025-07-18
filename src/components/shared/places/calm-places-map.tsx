import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import LocationPicker from "./location-picker.tsx";
import MyLocationButton from "./my-location-button.tsx";
import LocationDialog from "./location-dialog.tsx";
import { MeditationIcon } from "@/helper/places.ts";

type CalmPlace = {
  id: number;
  position: [number, number];
  title: string;
  note: string;
  imagePreview?: string;
};

export default function CalmPlacesMap() {
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [calmPlaces, setCalmPlaces] = useState<CalmPlace[]>([]);

  const handleSelectLocation = (pos: [number, number]) => {
    setTempMarker(pos);
    setDialogOpen(true);
  };

  const handleSave = (data: { title: string; note: string; imagePreview?: string }) => {
    if (!tempMarker || !data.title.trim()) {
      alert("Please add a title!");
      return;
    }
    setCalmPlaces((prev) => [
      ...prev,
      {
        id: Date.now(),
        position: tempMarker,
        title: data.title.trim(),
        note: data.note.trim(),
        imagePreview: data.imagePreview,
      },
    ]);
    setTempMarker(null);
    setDialogOpen(false);
  };

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

        {calmPlaces.map(({ id, position, title, note, imagePreview }) => (
          <Marker key={id} position={position} icon={MeditationIcon}>
            <Popup>
              <strong>{title}</strong>
              <p>{note}</p>
              {imagePreview && (
                <img src={imagePreview} alt={title} className="mt-2 rounded-md max-w-15" />
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
          onSave={handleSave}
        />

        <MyLocationButton setMarker={handleSelectLocation} />
      </MapContainer>
    </div>
  );
}
