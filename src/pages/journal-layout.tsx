import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, NotebookTabs, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
import { createJournalEntry } from "@/services/journal-entry";
import { formatISO9075 } from "date-fns";
import { useDispatch } from "react-redux";
import { setCurrentEntry } from "@/reducers/journalReducer";
import { getJournalById } from "@/services/journal";
import { getColorClass } from "@/lib/utils";
import type { RouteParams } from "@/types/shared.types";

export default function JournalLayout() {
  const { journalId } = useParams<RouteParams>() as RouteParams;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: journal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !!journalId,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createJournalEntry(
        {
          content: "<h2></h2><p></p>",
          tags: [],
          entryDate: formatISO9075(new Date()),
          isFavorite: false,
        },
        journalId,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["journalEntries", journalId],
      });
      navigate(`/dashboard/journals/${journalId}/${data.id}`);
      dispatch(setCurrentEntry(data));
    },
  });

  const handleNewEntry = () => {
    if (journalId) mutation.mutate();
  };

  const navigateToJournalView = () => {
    navigate(`/dashboard/journals/${journalId}`);
  };

  if (isLoading)
    return <p className="p-6 text-muted-foreground">Loading journal...</p>;
  if (isError || !journal)
    return <p className="p-6 text-destructive">Failed to load journal.</p>;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="w-96 border-r border-border flex flex-col bg-background">
        <div
          onClick={navigateToJournalView}
          className={`cursor-pointer px-4 py-4 border-b border-border flex items-center gap-3 ${getColorClass(
            journal.color,
            "bg",
          )}`}
        >
          <SquarePen className="text-neutral-100" />
          <h2 className="text-lg font-semibold text-neutral-100 truncate">
            {journal.name}
          </h2>
        </div>

        <div className="px-4 py-3 border-b border-border flex items-center gap-2 text-muted-foreground">
          <NotebookTabs
            className={`w-5 h-5 ${getColorClass(journal.color, "text")}`}
          />
          <span className="font-medium text-sm">Entries</span>
        </div>

        <div className="overflow-y-auto px-4 py-2 flex-1">
          <JournalEntryList journalColor={journal.color} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-card">
          <span className="text-muted-foreground text-sm">Journal view</span>

          <Button
            size="sm"
            onClick={handleNewEntry}
            className={`text-neutral-100 cursor-pointer ${getColorClass(journal.color, "bg")} ${getColorClass(
              journal.color,
              "hover",
            )}`}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Entry
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet context={{ journal }} />
        </div>
      </main>
    </div>
  );
}
