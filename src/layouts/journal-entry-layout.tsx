import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus, NotebookTabs, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
import { getJournalById } from "@/services/journal";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { createOfflineEntry } from "@/helper/journal-entry";
import { bgColorMap, hoverColorMap, textColorMap } from "@/lib/journalColor";
import { getEntries } from "@/services/journalEntry";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export default function JournalEntryLayout() {
  const { journalId } = useParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: journal, isLoading: isJournalLoading, isError: isJournalError } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !!journalId,
  });

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ["journalEntries", journalId],
    queryFn: () =>
      getEntries({
        journalId: journalId!,
        limit: 50,
      }),
    enabled: !!journalId
  });

  useEffect(() => {
    if (isSuccess && data) {
      db.journalEntries.bulkPut(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const entries = useLiveQuery(() =>
    db.journalEntries
      .where("journalId")
      .equals(journalId!)
      .sortBy("entryDate"),
    [journalId]
  );

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    if (!searchTerm.trim()) return entries;

    const term = searchTerm.toLowerCase();
    return entries.filter((entry) => entry.content?.toLowerCase().includes(term));
  }, [entries, searchTerm]);

  const createEntryMutation = useCreateEntry();

  const handleNewEntry = async () => {
    if (journalId && journal) {
      const offlineEntry = await createOfflineEntry(journalId, journal.color);
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

        <div className="px-4 py-3 border-b border-border flex items-center gap-2 text-muted-foreground">
          <NotebookTabs className={`w-5 h-5 ${textColorMap[journal.color]}`} />
          <span className="font-medium text-sm">Entries</span>
        </div>

        <div className="overflow-y-auto px-4 py-2 flex-1">
          <Input
            className="mb-5"
            placeholder="Search entries..."
            value={inputValue}
            onChange={handleSearchChange}
          />

          {isLoading && <p className="text-muted-foreground">Loading entries…</p>}
          {isError && <p className="text-destructive">Failed to fetch entries.</p>}

          <JournalEntryList entries={filteredEntries} />
        </div>
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
