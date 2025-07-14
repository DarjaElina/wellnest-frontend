import { RecentSummary } from "@/components/shared/recent-summary.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMood } from "@/context/moodContext";
import EditMoodDialog from "@/components/shared/mood/edit-mood-dialog";
import CreateMoodDialog from "@/components/shared/mood/create-mood-dialog";

export default function HomePage() {
  const { data, isLoading, isError } = useMood();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Welcome back, Anna!
        </h1>
      </div>

      <Card className="bg-background/90">
        <CardHeader>
          <CardTitle>Mood check-in</CardTitle>
          <CardDescription>Track how you're feeling today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {isLoading && (
            <p className="text-muted-foreground text-sm">
              Loading today’s mood…
            </p>
          )}

          {isError && (
            <p className="text-destructive text-sm">
              Failed to load mood entry.
            </p>
          )}

          {data ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
              <div className="text-base sm:text-lg">
                <p className="mb-1 text-muted-foreground text-sm sm:text-base">
                  You checked in today:
                </p>
                <span className="font-semibold inline-flex items-center gap-2">
                  Feeling {data?.label}
                  <img
                    src={data?.iconUrl}
                    className="w-8 h-8"
                    alt="Mood icon"
                  />
                </span>
              </div>

              <Button
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer"
              >
                Update check-in
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-base sm:text-lg text-muted-foreground">
                You haven’t checked in yet today.
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer"
              >
                Check in
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RecentSummary />

      {data ? (
        <EditMoodDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialEntry={data}
        />
      ) : (
        <CreateMoodDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      )}
    </div>
  );
}
