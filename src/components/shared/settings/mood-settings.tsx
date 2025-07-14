import { moodSets } from "@/types/mood.types";
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

export default function MoodSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium">Mood Check-In Popup</p>
          <p className="text-sm text-muted-foreground">
            Show a popup to check in with your mood each day
          </p>
        </div>
        <Switch
          checked={settings.showMoodPopup}
          onCheckedChange={(val) => updateSetting("showMoodPopup", val)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-base font-medium block">Mood Emoji Set</label>
        <p className="text-sm text-muted-foreground mb-1">
          Choose your preferred style of mood icons
        </p>
        <Select
          value={settings.moodSet}
          onValueChange={(val) => updateSetting("moodSet", val)}
        >
          <SelectTrigger>
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
    </div>
  );
}
