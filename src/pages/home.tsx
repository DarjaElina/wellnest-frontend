import { MoodPopup } from "@/components/shared/mood-popup";
import { RecentSummary } from "@/components/shared/recent-summary.tsx";
export default function HomePage() {
  return (
    <div className="px-6 py-10 max-w-5xl space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Hello, User! 💚
        </h1>
        <p className="text-muted-foreground text-lg">
          How are you feeling today?
        </p>
      </div>

      <MoodPopup/>

      <RecentSummary />
    </div>
  );
}
