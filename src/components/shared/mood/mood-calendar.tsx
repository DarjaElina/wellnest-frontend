import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getMoodEntriesForMonth } from "@/services/moodEntry";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoodEntry } from "@/types/mood.types";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
} from "date-fns";

export default function MoodCalendar() {
  const today = new Date();

  const { data: entries = [], isLoading } = useQuery<MoodEntry[]>({
    queryKey: ["moodEntries", format(today, "yyyy-MM")],
    queryFn: () => getMoodEntriesForMonth(today), // your backend should accept a month param
  });

  const getMoodForDate = (date: Date) =>
    entries.find((entry) => isSameDay(new Date(entry.date), date));

  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  if (isLoading)
    return (
      <p className="text-sm text-muted-foreground">Loading mood entries…</p>
    );

  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {days.map((date) => {
        const mood = getMoodForDate(date);

        return (
          <Tooltip key={date.toISOString()}>
            <TooltipTrigger asChild>
              <div
                className={`aspect-square rounded-md flex items-center justify-center text-xl transition-all 
                  ${
                    mood
                      ? "bg-muted hover:bg-muted/80 cursor-pointer"
                      : "bg-muted/20 text-muted-foreground"
                  }`}
              >
                {mood ? (
                  <img
                    src={mood.iconUrl}
                    alt={mood.label}
                    className="w-5 h-5"
                  />
                ) : (
                  format(date, "d")
                )}
              </div>
            </TooltipTrigger>
            {mood && (
              <TooltipContent className="text-sm">
                <p>
                  <strong>{mood.label}</strong>
                </p>
                {mood.note && (
                  <p className="italic text-muted-foreground">“{mood.note}”</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {format(date, "PP")}
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        );
      })}
    </div>
  );
}
