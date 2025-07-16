import { createOfflineEntry } from "@/helper/journal-entry";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { db } from "@/lib/db";
import { getJournals } from "@/services/journal";
import type { Journal } from "@/types/journal.types";
import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { EntriesSidebar } from "@/components/shared/journal-entry/entries-sidebar";
import { CreateEntryDialog } from "@/components/shared/journal-entry/create-entry-dialog";
import { EmptyState } from "@/components/shared/journal-entry/empty-state";
import { SquarePen } from "lucide-react";

export default function AllEntriesLayout() {
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterTags, setFilterTags] = useState<string[]>([]);

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

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 400),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const filteredEntries = useMemo(() => {
    if (!allEntries) return [];

    if (!searchTerm.trim()) return allEntries;

    const term = searchTerm.toLowerCase();

    return allEntries.filter((entry) => {
      return entry.content?.toLowerCase().includes(term);
    });
  }, [allEntries, searchTerm]);

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
        <EntriesSidebar
          entries={filteredEntries}
          inputValue={inputValue}
          onInputChange={handleSearchChange}
          filterTags={filterTags}
          onChangeFilterTags={setFilterTags}
          sortOrder={sortOrder}
          onChangeSortOrder={setSortOrder}
        />
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
