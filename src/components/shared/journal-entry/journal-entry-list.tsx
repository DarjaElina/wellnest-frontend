import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import { setCurrentEntry } from "@/reducers/journalReducer";
import { getJournalEntries } from "@/services/journal-entry";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { type JournalEntry } from "@/types/journal.types";

export function JournalEntryList() {
  const query = useQuery({
    queryKey: ["journalEntries"],
    queryFn: getJournalEntries,
  });
  const dispatch = useDispatch();

  if (query.isLoading) {
    return <div>loading data...</div>;
  }

  if (query.isError) {
    return <div>Something went wrong.</div>;
  }
  return (
    <div>
      <ul>
        {query.data.map((journal: JournalEntry) => (
          <li key={journal.id}>
            <JournalEntryCard
              onSelect={() => dispatch(setCurrentEntry(journal))}
              content={journal.content}
              date={journal.entryDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
