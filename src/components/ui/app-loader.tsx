import { Loader2 } from "lucide-react";

export function AppLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground animate-in fade-in">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
      <p className="text-sm">Loading, just a moment…</p>
    </div>
  );
}
