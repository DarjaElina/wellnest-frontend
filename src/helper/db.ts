import { db } from "@/lib/db";
import type { UserSettings } from "@/types/settings.types";

export const getUserSettings = async () =>
  (await db.settings.get("user")) || {
    showMoodPopup: true,
    emojiSet: "simple",
    wallpaperUrl: "nature",
  };

export const updateSettings = async (updates: Omit<UserSettings, 'key'>) =>
  db.settings.put({ key: "user", ...(await getUserSettings()), ...updates });
