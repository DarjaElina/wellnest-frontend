import { JournalEntryEditor } from "@/components/shared/journal-entry/journal-entry-editor";
import { useOutletContext } from "react-router";
import type { Journal } from "@/types/journal.types";

export default function JournalEditorView() {
  const { journal } = useOutletContext<{ journal: Journal }>();
  if (!journal) {
    return null;
  }
  return <JournalEntryEditor />;
}
