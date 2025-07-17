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
import { Label } from "@/components/ui/label";

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) =>
  `${String(i).padStart(2, "0")}:00`
);

export default function MoodSettings() {
  const { settings, updateSetting } = useSettings();
  const selectedSet = moodSets.find((s) => s.name === settings.moodSet);
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
        <Label className="text-base font-medium block">Mood Emoji Set</Label>
        <p className="text-sm text-muted-foreground mb-1">
          Choose your preferred style of mood icons
        </p>
        <Select
          value={settings.moodSet}
          onValueChange={(val) => updateSetting("moodSet", val)}
        >
         <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select emoji set">
              {selectedSet ? (
                <span className="inline-flex items-center gap-2">
                  {selectedSet.name}
                  <img
                    src={selectedSet.moods[0].iconUrl}
                    alt={`${selectedSet.name} example`}
                    className="w-5 h-5"
                  />
                </span>
              ) : null}
            </SelectValue>
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
        <div className="flex flex-col gap-3">
        <Label className="text-base font-medium block" htmlFor="time-picker">
          Mood Check-in Time
        </Label>
        <Select
          value={settings.checkinTime}
          onValueChange={(val) => updateSetting("checkinTime", val)}
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
      </div>
    </div>
  );
}
