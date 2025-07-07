import api from "./index";

export async function getJournalEntriesByJournal(journalId: string) {
  const response = await api.get(`/journals/${journalId}/entries`);
  return response.data;
}


export async function createJournalEntry(data: any, journalId: string) {
  const response = await api.post(`/journals/${journalId}/entries`, data);
  return response.data;
}

export async function updateJournalEntry(updatedEntry, journalId, entryId) {
  const response = await api.put(`/journals/${journalId}/entries/${entryId}`, updatedEntry)
  return response.data
}
