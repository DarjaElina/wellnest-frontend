import api from "./index";
import type { MoodType } from "@/types/mood.types";

export async function getMoodEntries(startDate: Date, endDate: Date) {
  const response = await api.get("/mood-entries", {
    params: { startDate, endDate },
  });
  return response.data;
}
export async function createMoodEntry(newEntry: MoodType) {
  const response = await api.post("/mood-entries", newEntry);
  return response.data;
}

export async function updateMoodEntry(updatedEntry: MoodType, entryId: string) {
  const response = await api.put(`/mood-entries/${entryId}`, updatedEntry);
  return response.data;
}

export async function deleteMoodEntry(moodId: string) {
  await api.delete(`/mood-entries/${moodId}`);
}

export async function getTodayMoodEntry() {
  const response = await api.get("/mood-entries/today");
  return response.data;
}

export async function getWeekSummary() {
  const response = await api.get("/mood-entries");
  return response.data;
}
