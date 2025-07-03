import { useQuery } from "@tanstack/react-query";
import { getJournalEntries } from "@/services/journal-entry.ts";
import {JournalEditor} from "@/components/shared/journal/journal-editor.tsx";
import {JournalList} from "@/components/shared/journal/journal-list.tsx";
export default function Journal() {
  const query = useQuery({
    queryKey: ["journalEntries"],
    queryFn: getJournalEntries,
  });

    if (query.isLoading ) {
        return <div>loading data...</div>
    }

    if (query.isError) {
        return <div>Something went wrong.</div>;
    }

    console.log(query.data);

  return (
      <div className="max-w-7xl mx-auto px-4 mt-10 h-screen flex gap-6">
          <div className="w-1/3 overflow-y-auto border-r pr-4">
              <JournalList />
          </div>

          <div className="flex-1 overflow-y-auto">
              <JournalEditor />
          </div>
      </div>

  );
}
