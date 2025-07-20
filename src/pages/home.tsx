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
import EditMoodDialog from "@/components/shared/mood/edit-mood-dialog";
import CreateMoodDialog from "@/components/shared/mood/create-mood-dialog";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { useQuery } from "@tanstack/react-query";
import { getTodayMoodEntry } from "@/services/moodEntry";
import { Sparkles } from "lucide-react";
import { useSettings } from "@/context/settingsContext";
import { getAffirmationOfTheDay } from "@/services/affirmation";
import { useIsDemo } from "@/context/demoContext";

export default function HomePage() {
  const { data: user } = useAuthQuery();
  const isDemo = useIsDemo();

  const {
    data,
    isLoading: moodLoading,
    isError: moodError,
  } = useQuery({
    queryKey: ["todayMood"],
    queryFn: getTodayMoodEntry,
    enabled: !isDemo,
  });

  const { settings } = useSettings();

  const {
    data: affirmationOfTheDay,
    isLoading: affLoading,
    isError: affError,
  } = useQuery({
    queryKey: ["affirmationOfTheDay", settings.affirmationSet],
    queryFn: () =>
      getAffirmationOfTheDay({ category: settings.affirmationSet }),
    enabled: !isDemo,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const demoAffirmation = {
    content: "You are exactly where you need to be 🧘‍♀️",
  };

  const demoMood = {
    label: "Grateful",
    iconUrl: "/assets/moods/default/grateful.png",
  };

  return (
    <div className="px-0 sm:px-6 py-6 sm:py-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {user?.firstName ? `Welcome back, ${user?.firstName}!` : "Welcome!"}
        </h1>
        {isDemo && (
          <p className="text-sm">
            You’re currently viewing the demo ✨ Some features are disabled.
          </p>
        )}
      </div>

      <Card className="bg-background/90">
        <CardHeader className="flex flex-row items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <CardTitle className="text-base font-medium">
              Affirmation of the Day
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              A gentle reminder just for you
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isDemo ? (
            <p className="text-base italic text-muted-foreground">
              “{demoAffirmation.content}”
            </p>
          ) : affLoading ? (
            <p className="text-muted-foreground text-sm">
              Loading affirmation of the day...
            </p>
          ) : affError ? (
            <p className="text-destructive text-sm">
              Failed to load affirmation.
            </p>
          ) : (
            <p className="text-base italic text-muted-foreground">
              “{affirmationOfTheDay?.content}”
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-background/90">
        <CardHeader>
          <CardTitle>Mood check-in</CardTitle>
          <CardDescription>Track how you're feeling today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {isDemo ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
              <div className="text-base sm:text-lg">
                <p className="mb-1 text-muted-foreground text-sm sm:text-base">
                  You checked in today:
                </p>
                <span className="font-semibold inline-flex items-center gap-2">
                  Feeling {demoMood.label}
                  <img
                    src={demoMood.iconUrl}
                    className="w-8 h-8"
                    alt="Mood icon"
                  />
                </span>
              </div>

              <Button disabled variant="outline">
                Update check-in (disabled in demo)
              </Button>
            </div>
          ) : moodLoading ? (
            <p className="text-muted-foreground text-sm">
              Loading today’s mood…
            </p>
          ) : moodError ? (
            <p className="text-destructive text-sm">
              Failed to load mood entry.
            </p>
          ) : data ? (
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

              <Button onClick={() => setDialogOpen(true)}>
                Update check-in
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-base sm:text-lg text-muted-foreground">
                You haven’t checked in yet today.
              </p>
              <Button onClick={() => setDialogOpen(true)}>Check in</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RecentSummary />

      {!isDemo && data ? (
        <EditMoodDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialEntry={data}
        />
      ) : !isDemo ? (
        <CreateMoodDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      ) : null}
    </div>
  );
}
