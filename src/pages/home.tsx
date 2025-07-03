import { RecentSummary } from "@/components/shared/recent-summary.tsx";
import { MoodTrackerGraph } from "@/components/shared/mood-tracker-graph.tsx";

export default function HomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Hello, User! 💚</h1>
      <p className="text-muted-foreground mb-4">How are you feeling today?</p>

      <RecentSummary />
      <MoodTrackerGraph />
    </div>
  );
}
