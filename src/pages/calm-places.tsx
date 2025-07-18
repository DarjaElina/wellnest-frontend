import CalmPlacesMap from "@/components/shared/places/calm-places-map";

export default function CalmPlacesPage() {
  return (
    <div className="px-6 py-10 mx-auto space-y-6">
      <div className="rounded-xl overflow-hidden shadow-md max-h-[calc(100vh-14rem)]">
        <CalmPlacesMap />
      </div>
    </div>
  );
}
