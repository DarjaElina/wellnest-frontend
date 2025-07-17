import { db } from "@/lib/db";
import type { UserSettings } from "@/types/settings.types";

export const DEFAULT_SETTINGS: UserSettings = {
  key: "user",
  showMoodPopup: false,
  moodSet: "Default",
  wallpaperUrl: "/assets/bg/home-bg-nature.avif",
  checkinTime: "10:00"
};

export async function getSettings(): Promise<UserSettings> {
  const settings = await db.settings.get("user");
  return settings ?? DEFAULT_SETTINGS;
}

export async function updateSettings(updates: Partial<UserSettings>) {
  const current = await getSettings();
  await db.settings.put({ ...current, ...updates });
}
