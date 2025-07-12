import { moodSets } from "@/types/mood.types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MoodPicker({ value, onChange }) {
  const moodSet = moodSets.find((set) => set.name === "Cat");

  console.log(value);

  return (
    <div className="space-y-4">
      <Card className="p-4 grid grid-cols-3 sm:grid-cols-5 gap-4 bg-muted shadow-lg">
        {moodSet?.moods.map((mood) => (
          <button
            key={mood.label}
            className={cn(
              "flex cursor-pointer flex-col items-center p-2 rounded-xl transition hover:bg-accent",
              value?.label=== mood.label && "bg-accent",
            )}
            onClick={() => onChange(mood)}
          >
            <img src={mood.icon} alt={mood.label} className="w-10 h-10" />

            <span className="text-sm mt-1">{mood.label}</span>
          </button>
        ))}
      </Card>
    </div>
  );
}
