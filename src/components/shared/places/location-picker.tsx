import { useMapEvents } from "react-leaflet/hooks";

export default function LocationPicker({
  onSelect,
}: {
  onSelect?: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect?.([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}
