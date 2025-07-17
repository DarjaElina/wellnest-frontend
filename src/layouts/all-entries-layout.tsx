import { createOfflineEntry } from "@/helper/journal-entry";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { db } from "@/lib/db";
import { getJournals } from "@/services/journal";
import type { Journal } from "@/types/journal.types";
import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { EntriesSidebar } from "@/components/shared/journal-entry/entries-sidebar";
import { CreateEntryDialog } from "@/components/shared/journal-entry/create-entry-dialog";
import { EmptyState } from "@/components/shared/journal-entry/empty-state";
import { SquarePen } from "lucide-react";
import { useFilter } from "@/context/filterContext";

export default function AllEntriesLayout() {
  const [openDialog, setOpenDialog] = useState(false);
  const { state } = useFilter();

  const createEntryMutation = useCreateEntry();

  const {
    data: journals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });

  const allEntries = useLiveQuery(() => db.journalEntries.toArray(), []);

  const filteredEntries = useMemo(() => {
    if (!allEntries) return [];

    let result = allEntries;
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
  }, [allEntries, state]);

  const handleNewEntry = async (selectedJournal: Journal) => {
    const offlineEntry = await createOfflineEntry(
      selectedJournal.id,
      selectedJournal.color,
    );
    createEntryMutation.mutate(offlineEntry);
    setOpenDialog(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="w-96 border-r border-border flex flex-col bg-background">
        <div
          className={`cursor-pointer px-4 py-4 border-b border-border flex items-center gap-3 bg-brand-secondary`}
        >
          <SquarePen className="text-neutral-100" />
          <h2 className="text-lg font-semibold text-neutral-100 truncate">
            All Entries
          </h2>
        </div>
        <EntriesSidebar entries={filteredEntries} />
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        <div className="px-6 py-3 border-b border-border flex items-center justify-end bg-card">
          <CreateEntryDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
            journals={journals ?? []}
            isLoading={isLoading}
            isError={isError}
            onCreate={handleNewEntry}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
          <EmptyState />
        </div>
      </main>
    </div>
  );
}
