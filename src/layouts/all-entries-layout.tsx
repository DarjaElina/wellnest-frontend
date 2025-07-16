import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOfflineEntry } from "@/helper/journal-entry";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { db } from "@/lib/db";
import { getJournals } from "@/services/journal";
import type { Journal } from "@/types/journal.types";
import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import debounce from "lodash.debounce";
import { SquarePen, NotebookTabs, Plus, NotebookPen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Outlet} from "react-router-dom";

export default function AllEntriesLayout() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const createEntryMutation = useCreateEntry();

  const { data: journals, isLoading, isError } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });


  const allEntries = useLiveQuery(() => db.journalEntries.toArray(), []);
  
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 400),
    []
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

  const handleNewEntry = async () => {
    if (!selectedJournal) return;

    const offlineEntry = await createOfflineEntry(
      selectedJournal.id,
      selectedJournal.color
    );
    createEntryMutation.mutate(offlineEntry);
    setOpenDialog(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="w-96 border-r border-border flex flex-col bg-background">
        <div className="cursor-pointer px-4 py-4 border-b border-border flex items-center gap-3">
          <SquarePen className="text-neutral-100" />
          <h2 className="text-lg font-semibold text-neutral-100 truncate">
            All Entries
          </h2>
        </div>

        <div className="px-4 py-3 border-b border-border flex items-center gap-2 text-muted-foreground">
          <NotebookTabs className="w-5 h-5" />
          <span className="font-medium text-sm">Entries</span>
        </div>

        <div className="overflow-y-auto px-4 py-2 flex-1">
          <Input
            className="mb-2"
            placeholder="Search entries..."
            value={inputValue}
            onChange={handleSearchChange}
          />

          {!allEntries ? (
            <p className="text-muted-foreground">Loading entries…</p>
          ) : (
            <JournalEntryList entries={filteredEntries} />
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        <div className="px-6 py-3 border-b border-border flex items-center justify-end bg-card">

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="text-neutral-100 cursor-pointer">
                <Plus className="w-4 h-4 mr-1" />
                New Entry
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a journal</DialogTitle>
                <DialogDescription>
                  Choose where to add the new entry
                </DialogDescription>
              </DialogHeader>

              {isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading journals…
                </p>
              )}
              {isError && (
                <p className="text-sm text-destructive">
                  Error loading journals
                </p>
              )}

              {journals && (
                <div className="space-y-4">
                  <Select
                    onValueChange={(value) => {
                      const found = journals.find((j: Journal) => j.id === value);
                      setSelectedJournal(found ?? null);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select journal" />
                    </SelectTrigger>
                    <SelectContent>
                      {journals.map((j: Journal) => (
                        <SelectItem key={j.id} value={j.id}>
                          {j.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    className="w-full cursor-pointer"
                    disabled={!selectedJournal}
                    onClick={handleNewEntry}
                  >
                    Create entry in{" "}
                    {selectedJournal ? selectedJournal.name : "..."}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
          {!selectedJournal && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <NotebookPen className="w-16 h-16 mb-4 text-border" />
              <h3 className="text-xl font-semibold">No journal selected</h3>
              <p className="text-sm mt-2 max-w-sm text-center">
                Select a journal or create an entry to get started
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}