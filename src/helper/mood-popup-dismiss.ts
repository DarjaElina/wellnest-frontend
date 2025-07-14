import { format } from "date-fns";

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
