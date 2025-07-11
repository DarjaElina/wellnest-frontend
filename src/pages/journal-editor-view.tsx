import { JournalEntryEditor } from "@/components/shared/journal-entry/journal-entry-editor";
import { AppError } from "@/components/ui/app-error";
import { AppLoader } from "@/components/ui/app-loader";
import { getJournalEntry } from "@/services/journalEntry";
import type { RouteParams } from "@/types/shared.types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function JournalEditorView() {
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;
  const {
    data: journalEntry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journalEntry", entryId],
    queryFn: () => getJournalEntry(journalId, entryId),
    enabled: !!journalId && !!entryId,
  });

  if (isLoading) return <AppLoader />;

  if (isError) return <AppError errorMessage="Could not load entry." />;

  return <JournalEntryEditor journalEntry={journalEntry} />;
}
