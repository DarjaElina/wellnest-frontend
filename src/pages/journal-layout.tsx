import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
import { createJournalEntry } from "@/services/journal-entry";
import { formatISO9075 } from "date-fns";
import { useDispatch } from "react-redux";
import { setCurrentEntry } from "@/reducers/journalReducer";

export default function JournalLayout() {
  const { journalId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: () =>
      createJournalEntry({
        journalId,
        content: "<h2></h2><p></p>",
        tags: [],
        entryDate: formatISO9075(new Date()),
        isFavorite: false,
      }, journalId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["journalEntries", journalId]);
      navigate(`/dashboard/journals/${journalId}/${data.id}`);
      console.log("DATA IS", data)
      dispatch(setCurrentEntry(data))
    },
  });

  const handleNewEntry = () => {
    if (journalId) mutation.mutate();
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="w-96 border-r flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Entries</h2>
        </div>

        <div className="overflow-y-auto px-4 py-2 flex-1">
          <JournalEntryList journalId={journalId!} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="px-6 py-3 border-b flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Journal view</span>

          <Button size="sm" onClick={handleNewEntry} className="cursor-pointer">
            <Plus className="w-4 h-4 mr-1" />
            New Entry
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
