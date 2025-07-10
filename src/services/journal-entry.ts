import api from "./index";
import type {
  JournalEntry,
  JournalEntryCreateInput,
} from "@/types/journalEntry.types.ts";

export async function getJournalEntriesByJournal(journalId: string) {
  const response = await api.get(`/journals/${journalId}/entries`);
  return response.data;
}

export async function createJournalEntry(
  entry: JournalEntryCreateInput,
  journalId: string,
): Promise<JournalEntry> {
  const response = await api.post(`/journals/${journalId}/entries`, entry);
  return response.data;
}

export async function updateJournalEntry(
  updatedEntry: JournalEntry,
  journalId: string,
  entryId: string,
) {
  const response = await api.put(
    `/journals/${journalId}/entries/${entryId}`,
    updatedEntry,
  );
  return response.data;
}

export async function updateEntryTags(
  entryId: string,
  journalId: string,
  tags: string[],
) {
  const res = await api.patch(
    `/journals/${journalId}/entries/${entryId}/tags`,
    { tags },
  );
  return res.data;
}

export async function getJournalEntryById(entryId: string) {
  const response = await api.get(`/journal-entries/${entryId}`);
  return response.data;
}

export async function deleteJournalEntry(journalId: string, entryId: string) {
  await api.delete(`/journals/${journalId}/entries/${entryId}`);
}

export async function toggleFavorite(journalId: string, entryId: string) {
  const response = await api.patch(
    `/journals/${journalId}/entries/${entryId}/favorite`,
  );
  return response.data;
}
