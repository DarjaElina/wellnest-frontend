import { useQuery } from "@tanstack/react-query";
import { getMoodEntries } from "@/services/moodEntry";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
} from "date-fns";
import type { MoodType } from "@/types/mood.types";
import { useIsDemo } from "@/context/demoContext";

interface Props {
  year: number;
  monthIndex: number;
}

export default function MoodCalendar({ year, monthIndex }: Props) {
  const isDemo = useIsDemo();

  const start = startOfMonth(new Date(year, monthIndex));
  const end = endOfMonth(new Date(year, monthIndex));

  const { data: entries = [], isLoading } = useQuery<MoodType[]>({
    queryKey: ["moodEntries", format(start, "yyyy-MM")],
    queryFn: () => getMoodEntries(start, end),
    enabled: !isDemo,
  });

  const demoEntries: MoodType[] = [
    {
      date: format(new Date(year, monthIndex, 3), "yyyy-MM-dd"),
      label: "Grateful",
      note: "Had a great walk!",
      iconUrl: "/assets/moods/default/grateful.png",
    },
    {
      date: format(new Date(year, monthIndex, 8), "yyyy-MM-dd"),
      label: "Low",
      note: "Missing my cat :(",
      iconUrl: "/assets/moods/default/low.png",
    },
    {
      date: format(new Date(year, monthIndex, 14), "yyyy-MM-dd"),
      label: "Okay",
      note: "Just okay :/",
      iconUrl: "/assets/moods/default/okay.png",
    },
    {
      date: format(new Date(year, monthIndex, 20), "yyyy-MM-dd"),
      label: "Calm",
      note: "Meditated in the morning 🌿",
      iconUrl: "/assets/moods/default/calm.png",
    },
  ];

  const allEntries = isDemo ? demoEntries : entries;

  const getMoodForDate = (date: Date) =>
    allEntries.find((entry) =>
      entry.date ? isSameDay(new Date(entry.date), date) : false,
    );

  const days = eachDayOfInterval({ start, end });

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
                    isLoading && !isDemo
                      ? "animate-pulse bg-muted/10"
                      : mood
                        ? "bg-muted hover:bg-muted/80 cursor-pointer"
                        : "bg-muted/20 text-muted-foreground"
                  }`}
              >
                {isLoading && !isDemo ? (
                  <span className="w-5 h-5 rounded-full bg-muted-foreground/20" />
                ) : mood ? (
                  <img
                    src={mood.iconUrl}
                    alt={mood.label}
                    className="w-10 h-10"
                  />
                ) : (
                  format(date, "d")
                )}
              </div>
            </TooltipTrigger>
            {!isLoading && mood && (
              <TooltipContent className="text-sm">
                <p>
                  <strong>{mood.label}</strong>
                </p>
                {mood.note && <p>“{mood.note}”</p>}
                <p>{format(date, "PP")}</p>
              </TooltipContent>
            )}
          </Tooltip>
        );
      })}
    </div>
  );
}
