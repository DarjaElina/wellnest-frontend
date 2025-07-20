import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getJournalEntry } from "@/services/journalEntry";
import { useIsDemo } from "@/context/demoContext";
import { db } from "@/lib/db";

import { JournalEntryEditor } from "@/components/shared/journal-entry/journal-entry-editor";
import { JournalEntryEditorSkeleton } from "@/components/skeleton/JournalEntryEditorSkeleton";
import { AppError } from "@/components/ui/app-error";
import type { JournalEntry } from "@/types/journalEntry.types";

export default function JournalEntryEditorView() {
  const isDemo = useIsDemo();
  const { entryId } = useParams() as {
    journalId: string;
    entryId: string;
  };

  const [demoEntry, setDemoEntry] = useState<JournalEntry | null>(null);
  const [loadingDemoEntry, setLoadingDemoEntry] = useState(false);

  const {
    data: journalEntry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journalEntry", entryId],
    queryFn: () => getJournalEntry(entryId),
    enabled: !!entryId && !isDemo,
  });

  useEffect(() => {
    if (isDemo && entryId) {
      setLoadingDemoEntry(true);
      db.journalEntries.get(entryId).then((entry) => {
        setDemoEntry(entry ?? null);
        setLoadingDemoEntry(false);
      });
    }
  }, [isDemo, entryId]);

  if (isDemo && loadingDemoEntry) return <JournalEntryEditorSkeleton />;
  if (isDemo && !demoEntry)
    return <AppError errorMessage="Demo entry not found." />;
  if (!isDemo && isLoading) return <JournalEntryEditorSkeleton />;
  if (!isDemo && (isError || !journalEntry))
    return <AppError errorMessage="Error loading entry." />;

  return (
    <JournalEntryEditor journalEntry={isDemo ? demoEntry! : journalEntry!} />
  );
}
