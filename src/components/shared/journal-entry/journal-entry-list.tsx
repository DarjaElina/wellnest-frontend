import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import { setCurrentEntry } from "@/reducers/journalReducer";
import { getJournalEntriesByJournal } from "@/services/journal-entry";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { type JournalEntry } from "@/types/journalEntry.types";
import { useParams, useNavigate } from "react-router";
import type { RootState } from "@/store";
import type { RouteParams } from "@/types/shared.types";
import { useEffect } from "react";

export function JournalEntryList({ journalColor }: { journalColor: string }) {
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["journalEntries", journalId],
    queryFn: () => getJournalEntriesByJournal(journalId),
  });

  const currentEntry = useSelector(
    (state: RootState) => state.journal.currentEntry,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentEntry && data) {
      const found = data.find((entry: JournalEntry) => entry.id === entryId);
      if (found) {
        dispatch(setCurrentEntry(found));
      }
    }
  }, [currentEntry, data, dispatch, entryId]);

  const navigate = useNavigate();

  const onSelect = (entry: JournalEntry) => {
    dispatch(setCurrentEntry(entry));
    navigate(`/dashboard/journals/${journalId}/${entry.id}`);
  };

  if (isLoading)
    return <p className="text-sm text-muted-foreground">Loading entries...</p>;
  if (isError)
    return <p className="text-sm text-destructive">Could not load entries.</p>;

  if (data && data.length === 0) {
    return <div className="space-y-3">No Entries Yet</div>;
  }

  return (
    <div className="space-y-3">
      {data.map((entry: JournalEntry) => (
        <JournalEntryCard
          key={entry.id}
          onSelect={() => onSelect(entry)}
          content={entry.content}
          date={entry.entryDate}
          isActive={currentEntry?.id === entry.id}
          journalColor={journalColor}
        />
      ))}
    </div>
  );
}
