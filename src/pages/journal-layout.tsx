import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, NotebookTabs, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
import { createJournalEntry } from "@/services/journalEntry";
import { formatISO9075 } from "date-fns";
import { getJournalById } from "@/services/journal";
import { getColorClass } from "@/lib/utils";
import type { RouteParams } from "@/types/shared.types";
import { db } from "@/lib/journal-db";
import type {
  JournalEntry,
  LocalJournalEntry,
} from "@/types/journalEntry.types";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

export default function JournalLayout() {
  const { journalId } = useParams<RouteParams>() as RouteParams;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: journal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !!journalId,
  });

  const newEntryMutation = useMutation({
    mutationFn: (offlineEntry: LocalJournalEntry) =>
      createJournalEntry(offlineEntry, offlineEntry.journalId),
    onSuccess: async (data) => {
      const realId = data.id;
      const offlineId = data.clientId;

      const local = await db.journalEntries.get(offlineId);
      if (!local) return;

      const updatedEntry = {
        ...local,
        id: realId,
        needsSync: false,
      };

      await db.journalEntries.delete(offlineId);
      await db.journalEntries.put(updatedEntry);

      queryClient.setQueryData<JournalEntry[]>(
        ["journalEntries", updatedEntry.journalId],
        (old = []) =>
          old.map((entry) => (entry.id === offlineId ? updatedEntry : entry)),
      );

      navigate(`/dashboard/journals/${updatedEntry.journalId}/${realId}`);
    },
    onError: (err) => {
      console.error("Failed to sync with backend:", err);
    },
  });

  const handleNewEntry = async () => {
    const newId = `offline-${uuidv4()}`;
    const now = formatISO9075(new Date());

    const newEntry: LocalJournalEntry = {
      clientId: newId,
      journalId,
      content: "<h2></h2><p></p>",
      tags: [],
      entryDate: now,
      isFavorite: false,
      updatedAt: now,
      needsSync: true,
      id: newId,
    };

    await db.journalEntries.put(newEntry);
    newEntryMutation.mutate(newEntry);
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
