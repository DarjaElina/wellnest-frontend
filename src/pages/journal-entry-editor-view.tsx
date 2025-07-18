import { JournalEntryEditorSkeleton } from "@/components/skeleton/JournalEntryEditorSkeleton";
import { AppError } from "@/components/ui/app-error";
import { getJournalEntry } from "@/services/journalEntry";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { JournalEntryEditor } from "@/components/shared/journal-entry/journal-entry-editor";

export default function JournalEntryEditorView() {
  const { journalId, entryId } = useParams() as {
    journalId: string;
    entryId: string;
  };

  const {
    data: journalEntry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journalEntry", entryId],
    queryFn: () => getJournalEntry(entryId),
    enabled: !!journalId && !!entryId,
  });

  if (isLoading) return <JournalEntryEditorSkeleton />;
  if (isError || !journalEntry)
    return <AppError errorMessage="Error loading editor." />;

  return <JournalEntryEditor journalEntry={journalEntry} />;
}
