import Dexie from "dexie";
import type { Table } from "dexie";
import type { LocalJournalEntry } from "@/types/journalEntry.types";
import type { UserSettings } from "@/types/settings.types";

export class WellnestDB extends Dexie {
  journalEntries!: Table<LocalJournalEntry, string>;
  settings!: Table<UserSettings, string>;

  constructor() {
    super("WDexie");
    this.version(1).stores({
      journalEntries: "id, journalId, entryDate",
      settings: "&key",
    });
  }
}

export const db = new WellnestDB();