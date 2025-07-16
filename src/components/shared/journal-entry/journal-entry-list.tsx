import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import type { JournalEntry } from "@/types/journalEntry.types";
import { useParams } from "react-router-dom";
export function JournalEntryList({ entries }: { entries: JournalEntry[] }) {
  const { entryId } = useParams();
  if (!entries) {
    return <div className="text-muted-foreground">Loading entries...</div>;
  }
  if (entries.length === 0) {
    return <div className="text-muted-foreground">No entries yet.</div>;
  }
  return (
    <div className="space-y-3">
      {entries.map((entry: JournalEntry) => (
        <JournalEntryCard
          key={entry.id}
          entry={entry}
          isActive={entry.id === entryId}
        />
      ))}
    </div>
  );
}
