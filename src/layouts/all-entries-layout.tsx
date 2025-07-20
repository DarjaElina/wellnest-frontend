import { createOfflineEntry } from "@/helper/journal-entry";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { db } from "@/lib/db";
import { getJournals } from "@/services/journal";
import type { Journal } from "@/types/journal.types";
import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { EntriesSidebar } from "@/components/shared/journal-entry/entries-sidebar";
import { CreateEntryDialog } from "@/components/shared/journal-entry/create-entry-dialog";
import { EmptyState } from "@/components/shared/journal-entry/empty-state";
import { SquarePen } from "lucide-react";
import { useFilter } from "@/context/filterContext";
import { demoJournals, demoJournalEntries } from "@/data/demo/journal";
import { useIsDemo } from "@/context/demoContext";

export default function AllEntriesLayout() {
  const [openDialog, setOpenDialog] = useState(false);
  const { state } = useFilter();
  const isDemo = useIsDemo();

  const createEntryMutation = useCreateEntry();

  const {
    data: journals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
    enabled: !isDemo,
  });

  useEffect(() => {
    if (isDemo) {
      db.journalEntries.bulkPut(demoJournalEntries);
    }
  }, [isDemo]);

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

    return state.sortOrder === "asc"
      ? result.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        )
      : result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
  }, [allEntries, state]);

  const handleNewEntry = async (selectedJournal: Journal) => {
    if (isDemo) return;
    const offlineEntry = await createOfflineEntry(
      selectedJournal.id,
      selectedJournal.color,
    );
    createEntryMutation.mutate(offlineEntry);
    setOpenDialog(false);
  };

  const journalList = isDemo ? demoJournals : journals;

  return (
    <div className="flex w-full h-screen overflow-hidden flex-col md:flex-row">
      <aside className="md:w-full lg:w-96 flex-shrink-0 border-r border-border flex-col bg-background hidden xl:flex">
        <div className="px-4 py-4 border-b border-border flex items-center bg-brand-secondary">
          <div className="flex items-center gap-3 text-neutral-100">
            <SquarePen />
            <h2 className="text-lg font-semibold truncate">All Entries</h2>
          </div>
        </div>
        <EntriesSidebar entries={filteredEntries} />
      </aside>

      <main className="flex-1 flex-col bg-background flex">
        <div className="fixed bottom-6 right-6 z-50">
          <CreateEntryDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
            journals={journalList}
            isLoading={isLoading}
            isError={isError}
            onCreate={handleNewEntry}
          />
        </div>

        <Outlet />
        <EmptyState />
      </main>
    </div>
  );
}
