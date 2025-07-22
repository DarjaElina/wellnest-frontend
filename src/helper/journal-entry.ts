import { v4 as uuidv4 } from "uuid";
import { formatISO9075 } from "date-fns";
import type { LocalJournalEntry } from "@/types/journalEntry.types";
import { db } from "@/lib/db";

export async function createOfflineEntry(journalId: string, color: string) {
  const newId = `offline-${uuidv4()}`;
  const now = formatISO9075(new Date());

  const newEntry: LocalJournalEntry = {
    clientId: newId,
    journalId,
    content: "<h2></h2><p></p>",
    tags: [],
    entryDate: now,
    favorite: false,
    updatedAt: now,
    needsSync: true,
    id: newId,
    color,
  };

  await db.journalEntries.put(newEntry);
  return newEntry;
}
