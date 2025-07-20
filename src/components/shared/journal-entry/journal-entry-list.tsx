import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import type { JournalEntry } from "@/types/journalEntry.types";
import type { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
export function JournalEntryList({
  entries,
  setSheetOpen,
}: {
  entries: JournalEntry[];
  setSheetOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const { entryId } = useParams();
  if (!entries) {
    return <div className="text-muted-foreground m-4">Loading entries...</div>;
  }
  if (entries.length === 0) {
    return <div className="text-muted-foreground m-4">No entries found.</div>;
  }
  return (
    <div className="space-y-3">
      {entries.map((entry: JournalEntry) => (
        <JournalEntryCard
          key={entry.id}
          entry={entry}
          isActive={entry.id === entryId}
          setSheetOpen={setSheetOpen}
        />
      ))}
    </div>
  );
}
