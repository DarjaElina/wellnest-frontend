import api from "./index";
import type { Journal, JournalCreateInput } from "@/types/journal.types.ts";

export async function createJournal(
  data: JournalCreateInput,
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
