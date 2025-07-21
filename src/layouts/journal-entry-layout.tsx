import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ListTree, Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJournalById } from "@/services/journal";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { createOfflineEntry } from "@/helper/journal-entry";
import { bgColorMap, hoverColorMap } from "@/lib/journalColor";
import { getEntries } from "@/services/journalEntry";
import { useEffect, useMemo, useState } from "react";
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
import { useIsDemo } from "@/context/demoContext";
import { demoJournals, demoJournalEntries } from "@/data/demo/journal";

export default function JournalEntryLayout() {
  const { journalId } = useParams();
  const navigate = useNavigate();
  const { state } = useFilter();
  const isDemo = useIsDemo();
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: journal, isLoading: isJournalLoading } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournalById(journalId!),
    enabled: !isDemo && !!journalId,
  });

  const { data: fetchedEntries, isSuccess } = useQuery({
    queryKey: ["journalEntries", journalId],
    queryFn: () =>
      getEntries({
        journalId: journalId!,
        limit: 50,
      }),
    enabled: !isDemo && !!journalId,
  });

  useEffect(() => {
    if (!isDemo && isSuccess && fetchedEntries) {
      db.journalEntries.bulkPut(fetchedEntries);
    }
  }, [fetchedEntries, isSuccess, isDemo]);

  useEffect(() => {
    if (isDemo && journalId === demoJournals[0].id) {
      db.journalEntries.bulkPut(demoJournalEntries);
    }
  }, [isDemo, journalId]);

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

    return state.sortOrder === "asc"
      ? result.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        )
      : result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
  }, [entries, state]);

  const createEntryMutation = useCreateEntry();

  const handleNewEntry = async () => {
    if (isDemo) return;

    if (journalId && journal) {
      const offlineEntry = await createOfflineEntry(journalId, journal.color);
      createEntryMutation.mutate(offlineEntry);
    }
  };

  const navigateToJournalView = () => {
    navigate(`/dashboard/journals/${journalId}`);
  };

  const activeJournal = isDemo ? demoJournals[0] : journal;
  const activeColor = activeJournal?.color ?? "purple";

  return (
    <div className="flex w-full h-screen overflow-hidden flex-col md:flex-row">
      <aside className="md:w-full lg:w-96 flex-shrink-0 border-r border-border flex-col bg-background hidden xl:flex">
        {isJournalLoading ? (
          <Skeleton className="w-full h-15 rounded" />
        ) : (
          <div
            onClick={navigateToJournalView}
            className={`cursor-pointer px-4 py-4 border-b border-border flex items-center gap-3 ${bgColorMap[activeColor]}`}
          >
            <SquarePen className="text-neutral-100" />
          </div>
        )}

        {isJournalLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <EntriesSidebar
            setSheetOpen={setSheetOpen}
            entries={filteredEntries}
            color={activeColor}
          />
        )}

        
      </aside>

      <main className="flex-1 flex-col bg-background relative">
        <div className="fixed bottom-6 right-6 z-50">
          {isJournalLoading ? (
            <Skeleton className="h-10 w-32 rounded" />
          ) : isDemo ? (
            <Button
              disabled
              className={`opacity-50 cursor-not-allowed$ ${bgColorMap[activeColor]} text-neutral-100`}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Entry (demo)
            </Button>
          ) : (
            <Button
              onClick={handleNewEntry}
              className={`text-neutral-100 cursor-pointer ${bgColorMap[activeColor]} ${hoverColorMap[activeColor]}`}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Entry
            </Button>
          )}
        </div>
        <div className="xl:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="fixed right-0 top-0" asChild>
              <Button className="size-7 m-2" variant="ghost">
                <ListTree/>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-85 p-0 gap-2" >
              <SheetHeader className="p-0 ">
                <SheetTitle className="sr-only">Entries List</SheetTitle>
                <SheetDescription className="sr-only">
                  Show entries list
                </SheetDescription>
                <div
                onClick={navigateToJournalView}
                className={`cursor-pointer px-3 py-3 border-b border-border flex items-center gap-3 ${bgColorMap[activeColor]}`}
              >
                <SquarePen className="text-neutral-100" />
              </div>
              </SheetHeader>
             

              <EntriesSidebar
                entries={filteredEntries}
                setSheetOpen={setSheetOpen}
              />
              <SheetClose asChild></SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 overflow-y-auto px-2 md:px-6 bg-background">
          <Outlet context={{ journal: activeJournal }} />
        </div>
      </main>
    </div>
  );
}
