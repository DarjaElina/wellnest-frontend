import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getJournalById } from "@/services/journal";

export default function JournalView() {
  const { journalId } = useParams();

  const { data: journal, isLoading, isError } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !!journalId,
  });

  if (isLoading) return <p>Loading journal info...</p>;
  if (isError || !journal) return <p>Failed to load journal info.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">{journal.name}</h2>
      <p className="text-muted-foreground">Color: {journal.color}</p>
      <p>Last updated: {new Date(journal.updatedAt).toLocaleString()}</p>
      <p>Total entries: {journal.journalEntries.length ?? "0"}</p>
    </div>
  );
}
