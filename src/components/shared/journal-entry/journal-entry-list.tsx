import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import { setCurrentEntry } from "@/reducers/journalReducer";
import { getJournalEntriesByJournal } from "@/services/journal-entry";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { type JournalEntry } from "@/types/journal.types";
import { useParams, useNavigate } from "react-router";

type JournalParams = {
  journalId: string;
}

export function JournalEntryList() {
  const { journalId } = useParams<JournalParams>();
  const query = useQuery({
    queryKey: ["journalEntries", journalId],
    queryFn: () => getJournalEntriesByJournal(journalId),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (query.isLoading) {
    return <div>loading data...</div>;
  }

  if (query.isError) {
    return <div>Something went wrong.</div>;
  }

  const onSelect = (entry) => {
    dispatch(setCurrentEntry(entry))
    navigate(`/dashboard/journals/${journalId}/${entry.id}`)
  }
  
  return (
    <div>
      <ul>
        {query.data.map((entry: JournalEntry) => (
          <li key={entry.id}>
            <JournalEntryCard
              onSelect={() => onSelect(entry)}
              content={entry.content}
              date={entry.entryDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// auth with providers
// journal, symptom and medication
// charts
// export to pdfs