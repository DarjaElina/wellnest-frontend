import PlacesMap from "@/components/shared/places/places-map";

export default function PlacesPage() {
  return (
    <div className="px-2 sm:px-6 py-6 sm:py-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Map your peaceful places
        </h1>
      </div>
      <div className="rounded-xl overflow-hidden shadow-md max-h-[calc(100vh-14rem)]">
        <PlacesMap />
      </div>
    </div>
  );
}
