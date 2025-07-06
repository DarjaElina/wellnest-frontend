import { JournalEntryEditor } from "@/components/shared/journal-entry/journal-entry-editor";
import { JournalEntryList } from "@/components/shared/journal-entry/journal-entry-list";
export default function JournalEntryView() {
  return (
    <div className="w-full px-4 mt-10 h-screen flex gap-6">
      <div className="w-96 overflow-y-auto border-r pr-4">
        <JournalEntryList />
      </div>

      <div className="flex-1 overflow-y-auto">
        <JournalEntryEditor />
      </div>
    </div>
  );
}
