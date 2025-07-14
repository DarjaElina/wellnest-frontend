import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import { useParams, useNavigate } from "react-router";
import type { RouteParams } from "@/types/shared.types";
import type { JournalEntry } from "@/types/journalEntry.types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export function JournalEntryList({ journalColor }: { journalColor: string }) {
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;
  const entries = useLiveQuery(
    () =>
      db.journalEntries
        .where("journalId")
        .equals(journalId)
        .sortBy("entryDate"),
    [journalId],
  );

  const navigate = useNavigate();

  const onSelect = (entry: JournalEntry) => {
    navigate(`/dashboard/journals/${journalId}/${entry.id}`);
  };

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
          onSelect={() => onSelect(entry)}
          content={entry.content}
          date={entry.entryDate}
          isActive={entry.id === entryId}
          journalColor={journalColor}
        />
      ))}
    </div>
  );
}
