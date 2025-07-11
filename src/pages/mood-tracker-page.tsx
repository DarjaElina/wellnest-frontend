import { MoodPicker } from "@/components/shared/mood-picker";
import { Flower2 } from "lucide-react";

export default function MoodTrackerPage() {
  return (
    <div className="wrapper py-8 space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Track your mood</h1>
        <Flower2/>
      </div>
      <p className="text-muted-foreground">
        Choose how you feel today. You can also switch the style of the mood icons below.
      </p>
      <MoodPicker />
    </div>
  );
}
