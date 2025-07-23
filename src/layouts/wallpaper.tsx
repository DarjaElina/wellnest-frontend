import { useSettings } from "@/context/settingsContext";
import { Outlet } from "react-router";

export default function PageWallpaperWrapper() {
  const { settings, isBooting } = useSettings();
  const background = settings.wallpaperUrl;
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: isBooting ? "none" : `url(${background})` }}
    >
      <div className="bg-white/10 dark:bg-background/40 min-h-screen">
        <div className="px-6 py-6 max-w-5xl mx-auto space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
