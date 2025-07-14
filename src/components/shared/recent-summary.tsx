import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeekMoodSummary } from "./mood/week-mood-summary";

export function RecentSummary() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">
        Recent Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-background/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Last Journal Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <p className="text-base line-clamp-2">
              “I’ve been feeling more calm this week after meditating every
              day...”
            </p>
            <Link
              to="/journal"
              className="text-sm text-brand-primary hover:underline font-medium"
            >
              View full entry →
            </Link>
          </CardContent>
        </Card>
        <WeekMoodSummary/>
      </div>
    </section>
  );
}
