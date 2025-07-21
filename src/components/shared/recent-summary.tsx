import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoodWeekSummary } from "./mood/mood-week-summary";
import { getJournalPreviewTitle } from "@/helper/journal";
import { useIsDemo } from "@/context/demoContext";
import DOMPurify from "dompurify";
import { demoJournalEntries } from "@/data/demo/journal";

export function RecentSummary() {
  const isDemo = useIsDemo();

  const latestEntry = useLiveQuery(async () => {
    if (isDemo) return null;
    const all = await db.journalEntries.toArray();
    if (!all.length) return null;

    return all.reduce((latest, current) =>
      new Date(current.updatedAt) > new Date(latest.updatedAt)
        ? current
        : latest,
    );
  }, [isDemo]);

  const demoEntry = demoJournalEntries[0];

  const sanitizedHTML =
    (isDemo ? demoEntry.content : latestEntry?.content) || "";

  const { parsedHeading, parsedParagraph } = getJournalPreviewTitle(
    DOMPurify.sanitize(sanitizedHTML),
  );

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
            {isDemo || (latestEntry && latestEntry.journalId) ? (
              <>
                <h3 className="text-base line-clamp-2">{parsedHeading}</h3>

                <p className="text-base line-clamp-2">{parsedParagraph}</p>
                <Link
                  to={
                    isDemo
                      ? "/demo/dashboard/journals/demo-journal/demo-entry-1"
                      : `/dashboard/journals/${latestEntry?.journalId}`
                  }
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
