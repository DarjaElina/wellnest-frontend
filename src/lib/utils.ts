import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import type { JournalEntry } from "@/types/journalEntry.types";
import { formatISO9075 } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function saveToLocal(entry: JournalEntry, journalId: string) {
  await db.journalEntries.put({
    ...entry,
    journalId,
    updatedAt: formatISO9075(new Date()),
    needsSync: true,
  });
}

export async function deleteFromLocal(entryId: string) {
  await db.journalEntries.delete(entryId);
}
