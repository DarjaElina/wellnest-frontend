import { moodSets, type MoodSetName } from "@/types/mood.types";
import { Switch } from "@/components/ui/switch";
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
import { Label } from "@/components/ui/label";
import { useIsDemo } from "@/context/demoContext";
import { useUpdateRemoteSettings } from "@/hooks/useUpdateRemoteSettings";
import type { UserSettings } from "@/types/settings.types";

const TIME_OPTIONS = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`,
);

export default function MoodSettings() {
  const isDemo = useIsDemo();
  const updateRemoteSettings = useUpdateRemoteSettings();
  const { settings, updateSettings } = useSettings();

  const handleUpdateSettings = async (
    key: keyof UserSettings,
    value: unknown,
  ) => {
    const newSettings = { ...settings, [key]: value };
    if (!isDemo) {
      await updateRemoteSettings.mutateAsync(newSettings);
    }
    updateSettings(newSettings);
  };

  return (
    <div className="space-y-7 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium">Mood Check-In Popup</p>
          <p className="text-sm text-muted-foreground">
            Show a popup to check in with your mood each day
          </p>
        </div>
        <Switch
          checked={settings.showMoodPopup}
          onCheckedChange={(val) => handleUpdateSettings("showMoodPopup", val)}
          disabled={isDemo}
        />
      </div>

      <div className="space-y-2">
        <Label>Mood Emoji Set</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Choose your preferred style of mood icons
        </p>
        <Select
          value={settings.moodSet}
          onValueChange={(val: MoodSetName) =>
            handleUpdateSettings("moodSet", val)
          }
          disabled={isDemo}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select emoji set" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Available Sets</SelectLabel>
              {moodSets.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  <span className="inline-flex items-center gap-2">
                    {s.name}
                    <img
                      src={s.moods[0].iconUrl}
                      alt={`${s.name} example`}
                      className="w-5 h-5"
                    />
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="time-picker">Mood Check-in Time</Label>
        <Select
          value={settings.checkinTime}
          onValueChange={(val) => handleUpdateSettings("checkinTime", val)}
          disabled={isDemo}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isDemo && (
        <p className="text-xs text-muted-foreground my-3">
          This settings are not editable in demo mode 💙
        </p>
      )}
    </div>
  );
}
