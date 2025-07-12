import api from "./index";

export async function getMoodEntries() {
  const response = await api.get("/mood-entries");
  return response.data;
}
export async function createMoodEntry(newEntry) {
  const response = await api.post("/mood-entries", newEntry);
  return response.data;
}

export async function updateMoodEntry(updatedEntry, entryId) {
  const response = await api.put(`/mood-entries/${entryId}`, updatedEntry);
  return response.data;
}

export async function deleteMoodEntry(moodId: string, entryId: string) {
  await api.delete(`/moods/${moodId}/entries/${entryId}`);
}
