import type { MoodType } from "@/types/mood.types";
import { addDays, format, isSameDay, parseISO, startOfWeek } from "date-fns";

const KEY = "moodPopupDismissedAt";

export function markMoodPopupAsDismissed() {
  localStorage.setItem(KEY, format(new Date(), "yyyy-MM-dd"));
}

export function hasDismissedMoodPopupToday(): boolean {
  const stored = localStorage.getItem(KEY);
  const today = format(new Date(), "yyyy-MM-dd");
  return stored === today;
}

export const getDynamicMessage = (label: string) => {
  switch (label.toLowerCase()) {
    case "grateful":
      return "That’s beautiful.";
    case "calm":
      return "That sounds peaceful.";
    case "okay":
      return "Sometimes okay is just right.";
    case "stressed":
      return "It’s okay to feel this way.";
    case "low":
      return "I’m here with you 💛";
    default:
      return "Want to leave a note about how you're feeling?";
  }
};

const moodScaleMap: Record<string, number> = {
  grateful: 5,
  calm: 4,
  okay: 3,
  stressed: 2,
  low: 1,
};

export function getDefaultMoodWeekData() {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });

  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(start, index);
    return {
      date: format(date, "yyyy-MM-dd"),
      day: format(date, "EEEE"),
      mood: "No mood available",
      note: "",
      scale: 0,
    };
  });
}

export function transformMoodEntriesToChart(entries: MoodType[]) {
  const defaultWeek = getDefaultMoodWeekData();

  return defaultWeek.map((dayEntry) => {
    const found = entries.find((entry) => {
      if (entry.date) {
        return isSameDay(parseISO(entry.date), parseISO(dayEntry.date));
      }
    });

    if (!found) return dayEntry;

    return {
      ...dayEntry,
      mood: capitalize(found.label),
      note: found.note,
      scale: moodScaleMap[found.label.toLowerCase()] ?? 3,
      iconUrl: found.iconUrl,
    };
  });
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const scaleColorVarMap = [
  {
    scale: 1,
    color: "var(--color-chart-1)",
  },
  {
    scale: 2,
    color: "var(--color-chart-2)",
  },
  {
    scale: 3,
    color: "var(--color-chart-3)",
  },
  {
    scale: 4,
    color: "var(--color-chart-4)",
  },
  {
    scale: 5,
    color: "var(--color-chart-5)",
  },
];
