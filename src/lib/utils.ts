import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tailwindColorMap, type JournalColor } from "./color";
import { db } from "./journal-db";
import type { JournalEntry } from "@/types/journalEntry.types";
import { formatISO9075 } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorClass(
  color: JournalColor | string | undefined,
  type: keyof (typeof tailwindColorMap)[JournalColor],
) {
  if (!color || !(color in tailwindColorMap)) return "";
  return tailwindColorMap[color as JournalColor][type];
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
