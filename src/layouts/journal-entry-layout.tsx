import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Menu, Plus, SquarePen } from "lucide-react";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isJournalError) {
    return <p>Error</p>;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden flex-col md:flex-row">
      <aside className="md:w-full lg:w-96 flex-shrink-0 border-r border-border flex-col bg-background hidden xl:flex">
        {isJournalLoading ? (
          <Skeleton className="w-full h-15 rounded" />
        ) : (
          <div
            onClick={navigateToJournalView}
            className={`cursor-pointer px-4 py-4 border-b border-border flex items-center justify-center gap-3 ${bgColorMap[journal?.color]}`}
          >
            <SquarePen className="text-neutral-100" />
            <h2 className="text-lg font-semibold text-neutral-100 truncate">
              {journal?.name || "Journal"}
            </h2>
          </div>
        )}

        <EntriesSidebar entries={filteredEntries} />

        <div className="fixed bottom-6 right-6 z-50">
          {isJournalLoading ? (
            <Skeleton className="h-10 w-32 rounded" />
          ) : (
            <Button
              onClick={handleNewEntry}
              className={`text-neutral-100 cursor-pointer ${bgColorMap[journal?.color]} ${hoverColorMap[journal?.color]}`}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Entry
            </Button>
          )}
        </div>
      </aside>

      <main className="flex-1 flex-col bg-background relative">
        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger className="fixed right-2 top-0 m-2" asChild>
              <Button size="icon" variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Entries List</SheetTitle>
                <SheetDescription className="sr-only">
                  Show entries list
                </SheetDescription>
              </SheetHeader>
              <div
                onClick={navigateToJournalView}
                className={`cursor-pointer px-4 py-4 border-b border-border flex items-center justify-center gap-3 ${bgColorMap[journal?.color]}`}
              >
                <SquarePen className="text-neutral-100" />
                <h2 className="text-lg font-semibold text-neutral-100 truncate">
                  {journal?.name || "Journal"}
                </h2>
              </div>

              <EntriesSidebar entries={filteredEntries} />
              <SheetClose asChild></SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 overflow-y-auto px-6 bg-background">
          <Outlet context={{ journal }} />
        </div>
      </main>
    </div>
  );
}
