import Dexie from "dexie";
import type { Table } from "dexie";
import type { LocalJournalEntry } from "@/types/journalEntry.types";

export class JournalDB extends Dexie {
  journalEntries!: Table<LocalJournalEntry, string>;

  constructor() {
    super("WDexie");
    this.version(1).stores({
      journalEntries: "id, journalId, entryDate",
    });
  }
}

export const db = new JournalDB();
