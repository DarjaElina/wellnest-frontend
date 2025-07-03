import { JournalCard } from "@/components/shared/journal/journal-card.tsx";
import { setCurrentEntry } from "@/reducers/journalReducer";
import { getJournalEntries } from "@/services/journal-entry";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function JournalList() {
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
        {query.data.map((journal) => (
          <li key={journal.id}>
            <JournalCard
              onSelect={() => dispatch(setCurrentEntry(journal))}
              title={journal.title}
              content={journal.content}
              date={journal.entryDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
