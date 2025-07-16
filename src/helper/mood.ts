import type { MoodType } from "@/types/mood.types";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

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
      return "Lovely.";
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

const defaultMoodWeekData = [
  {
    day: "Monday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Tuesday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Wednesday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Thursday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Friday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Saturday",
    mood: "No mood available",
    note: "",
    scale: 0,
  },
  {
    day: "Sunday",
    mood: "No mod available",
    note: "",
    scale: 0,
  },
];

export function transformMoodEntriesToChart(entries: MoodType[]) {
  const mappedEntries = entries.map((entry) => {
    const date = entry.date ? parseISO(entry.date) : new Date();
    return {
      day: format(date, "EEEE", { locale: enUS }),
      scale: moodScaleMap[entry.label.toLowerCase()] ?? 3,
      mood: capitalize(entry.label),
      note: entry.note,
      iconUrl: entry.iconUrl,
    };
  });

  return defaultMoodWeekData.map((defaultEntry) => {
    const exist = mappedEntries.find((e) => e.day === defaultEntry.day);
    return exist ?? defaultEntry;
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
