import { ModeToggle } from "../mode-toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/context/settingsContext";
import { wallpapers } from "@/types/wallpaper.types";

export default function AppearanceSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <label htmlFor="theme-toggle" className="text-base font-medium">
          Theme
        </label>
        <ModeToggle />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="wallpaper-select"
          className="text-base font-medium block"
        >
          Wallpaper Style
        </label>
        <Select
          value={settings.wallpaperUrl}
          onValueChange={(val) => updateSetting("wallpaperUrl", val)}
        >
          <SelectTrigger id="wallpaper-select" className="w-full">
            <SelectValue placeholder="Select wallpaper" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Available Sets</SelectLabel>
              {wallpapers.map((w) => (
                <SelectItem key={w.name} value={w.url}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-6 rounded bg-cover bg-center border"
                      style={{ backgroundImage: `url(${w.url})` }}
                    />
                    <span>{w.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
