import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MoodCalendarContainer from "@/components/shared/mood/mood-calendar/mood-calendar-container";

export default function MoodTrackerPage() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Reflect on your mood
        </h1>
      </div>

      <Card className="bg-card border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="sr-only">Mood Calendar</CardTitle>
          <CardDescription className="sr-only">
            Visualize your moods across the month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoodCalendarContainer />
        </CardContent>
      </Card>
    </div>
  );
}
