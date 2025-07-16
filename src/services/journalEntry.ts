import api from "./index";
import type {
  JournalEntry,
  JournalEntryCreateInput,
} from "@/types/journalEntry.types.ts";

export async function getEntries(params?: {
  journalId?: string;
  search?: string;
  cursor?: string;
  limit?: number;
}) {
  const response = await api.get(`/entries`, {
    params,
  });
  return response.data;
}

export const getJournalEntry = async (entryId: string) => {
  const response = await api.get(`/entries/${entryId}`);
  return response.data;
};

export async function createJournalEntry(entry: JournalEntryCreateInput): Promise<JournalEntry> {
  const response = await api.post(`/entries`, entry);
  return response.data;
}

export async function updateJournalEntry(updatedEntry: JournalEntry) {
  const response = await api.put(`/entries/${updatedEntry.id}`, updatedEntry);
  return response.data;
}
export async function updateEntryTags(entryId: string, tags: string[]) {
  const res = await api.patch(`/entries/${entryId}/tags`, { tags });
  return res.data;
}

export async function deleteJournalEntry(entryId: string) {
  await api.delete(`/entries/${entryId}`);
}

export async function toggleFavorite(entryId: string) {
  const response = await api.patch(`/entries/${entryId}/favorite`);
  return response.data;
}