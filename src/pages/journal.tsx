import { JournalEditor } from "@/components/shared/journal/journal-editor.tsx";
import { JournalList } from "@/components/shared/journal/journal-list.tsx";
export default function Journal() {
  return (
    <div className="w-full px-4 mt-10 h-screen flex gap-6">
      <div className="w-96 overflow-y-auto border-r pr-4">
        <JournalList />
      </div>

      <div className="flex-1 overflow-y-auto">
        <JournalEditor />
      </div>
    </div>
  );
}
