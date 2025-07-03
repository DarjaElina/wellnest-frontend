import { useQuery } from "@tanstack/react-query";
import { getJournalEntries } from "@/services/journal-entry.ts";
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

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Journal</h2>
        <p>Dear journal, I love web development but sometimes its just killing me. </p>
    </div>
  );
}
