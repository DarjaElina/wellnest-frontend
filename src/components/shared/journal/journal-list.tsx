import { useQuery } from "@tanstack/react-query";
import JournalCard from "./journal-card";
import { Button } from "@/components/ui/button";
import { getJournals } from "@/services/journal";

export default function JournalList() {
  const query = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });

  if (query.isLoading) {
    return <div>loading data...</div>;
  }

  if (query.isError) {
    return <div>Something went wrong.</div>;
  }

  if (query.data && query.data.length === 0) {
   return (
    <>
      <p>No journals available</p>
     <Button>Create your first jounral</Button>
    </>

   )
  }

  return (
    <div>
      <ul>
        {query.data.map((journal) => (
          <li key={journal.id}>
            <JournalCard name={journal.name} color={journal.color}/>
          </li>
        ))}
      </ul>
    </div>
  );
}