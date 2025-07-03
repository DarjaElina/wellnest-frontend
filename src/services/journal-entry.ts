import api from "./index";

export async function getJournalEntries() {
  const response = await api.get("/journal-entries");
  return response.data;
}

export async function createJournalEntry(data: any) {
  const response = await api.post("/journal-entries", data);
  return response.data;
}
