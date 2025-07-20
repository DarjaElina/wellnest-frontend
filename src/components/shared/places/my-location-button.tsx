import { Button } from "@/components/ui/button";
import { useMap } from "react-leaflet/hooks";

export default function MyLocationButton({
  setMarker,
}: {
  setMarker: (pos: [number, number]) => void;
}) {
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("POS IS", pos);
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        map.setView(coords, 14);
        setMarker(coords);
      },
      () => {
        alert("Unable to retrieve your location.");
      },
    );
  };

  return (
    <div className="absolute top-4 right-4 z-[999]">
      <Button variant="secondary" onClick={handleClick} size="sm">
        Use My Location
      </Button>
    </div>
  );
}
