import { db } from "@/lib/db";

export const getUserSettings = async () =>
  (await db.settings.get("user")) || {
    showMoodPopup: true,
    emojiSet: "simple",
    wallpaperUrl: "nature",
  };

export const updateSettings = async (updates) =>
  db.settings.put({ key: "user", ...(await getUserSettings()), ...updates });
