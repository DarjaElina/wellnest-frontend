import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoodWeekSummary } from "./mood/mood-week-summary";
import { getJournalPreviewTitle } from "@/helper/journal";
import DOMPurify from "dompurify";

export function RecentSummary() {
  const latestEntry = useLiveQuery(async () => {
    const all = await db.journalEntries.toArray();
    if (!all.length) return null;

    return all.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt)
        ? current
        : latest;
    });
  }, []);

  if (!latestEntry) {
    return null;
  }

  const sanitizedHTML = DOMPurify.sanitize(latestEntry.content);
  const { parsedHeading, parsedParagraph } =
    getJournalPreviewTitle(sanitizedHTML);

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
            {latestEntry ? (
              <>
                <h3 className="text-base line-clamp-2">
                  {parsedHeading && parsedHeading}
                </h3>

                <p className="text-base line-clamp-2">
                  {parsedParagraph && parsedParagraph}
                </p>
                <Link
                  to={`/dashboard/journals/${latestEntry.journalId}`}
                  className="text-sm text-brand-primary hover:underline font-medium"
                >
                  View full entry →
                </Link>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                No journal entries yet.
              </p>
            )}
          </CardContent>
        </Card>

        <MoodWeekSummary />
      </div>
    </section>
  );
}

