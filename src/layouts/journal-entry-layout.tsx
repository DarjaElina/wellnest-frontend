import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJournalById } from "@/services/journal";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { createOfflineEntry } from "@/helper/journal-entry";
import { bgColorMap, hoverColorMap } from "@/lib/journalColor";
import { getEntries } from "@/services/journalEntry";
import { useEffect, useMemo } from "react";
import { EntriesSidebar } from "@/components/shared/journal-entry/entries-sidebar";
import { useFilter } from "@/context/filterContext";

export default function JournalEntryLayout() {
  const { journalId } = useParams();
  const navigate = useNavigate();
  const { state } = useFilter();

  const {
    data: journal,
    isLoading: isJournalLoading,
    isError: isJournalError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !!journalId,
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["journalEntries", journalId],
    queryFn: () =>
      getEntries({
        journalId: journalId!,
        limit: 50,
      }),
    enabled: !!journalId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      db.journalEntries.bulkPut(data);
    }
  }, [data, isSuccess]);

  const entries = useLiveQuery(
    () =>
      db.journalEntries
        .where("journalId")
        .equals(journalId!)
        .sortBy("entryDate"),
    [journalId],
  );

  const filteredEntries = useMemo(() => {
    if (!entries) return [];

    let result = entries;

    if (state.searchTerm.trim()) {
      const term = state.searchTerm.toLowerCase();
      result = result.filter((entry) =>
        entry.content?.toLowerCase().includes(term),
      );
    }

    if (state.selectedTags.length > 0) {
      result = result.filter((entry) =>
        entry.tags?.some((tag) => state.selectedTags.includes(tag)),
      );
    }

    if (state.sortOrder === "asc") {
      result = result.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
    } else {
      result = result.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }
    return result;
  }, [entries, state]);

  const createEntryMutation = useCreateEntry();

  const handleNewEntry = async () => {
    if (journalId && journal) {
      const offlineEntry = await createOfflineEntry(journalId, journal.color);
      console.log("offline entry is", offlineEntry);
      createEntryMutation.mutate(offlineEntry);
    }
  };

  const navigateToJournalView = () => {
    navigate(`/dashboard/journals/${journalId}`);
  };

  if (isJournalLoading)
    return <p className="p-6 text-muted-foreground">Loading journal...</p>;

  if (isJournalError || !journal)
    return <p className="p-6 text-destructive">Failed to load journal.</p>;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="w-96 border-r border-border flex flex-col bg-background">
        <div
          onClick={navigateToJournalView}
          className={`cursor-pointer px-4 py-4 border-b border-border flex items-center gap-3 ${bgColorMap[journal.color]}`}
        >
          <SquarePen className="text-neutral-100" />
          <h2 className="text-lg font-semibold text-neutral-100 truncate">
            {journal.name}
          </h2>
        </div>

        <EntriesSidebar entries={filteredEntries} />
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-card">
          <span className="text-muted-foreground text-sm">Journal view</span>

          <Button
            onClick={handleNewEntry}
            className={`text-neutral-100 cursor-pointer ${bgColorMap[journal.color]} ${hoverColorMap[journal.color]}`}
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
