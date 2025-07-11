import api from "./index";
import type { Journal, JournalInput } from "@/types/journal.types.ts";

export async function createJournal(
  data: JournalInput,
): Promise<Journal> {
  const response = await api.post("/journals", data);
  return response.data;
}

export async function getJournals() {
  const response = await api.get("/journals");
  return response.data;
}

export async function getJournalById(id: string) {
  const response = await api.get(`/journals/${id}`);
  return response.data;
}

export async function deleteJournal(id: string) {
  const response = await api.delete(`/journals/${id}`);
  return response.data;
}

export async function updateJournal(id: string, updatedJournal: JournalInput) {
  const response = await api.patch(`/journals/${id}`, updatedJournal);
  return response.data;
}


