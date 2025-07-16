import { NotebookPen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <NotebookPen className="w-16 h-16 mb-4 text-border" />
      <h3 className="text-xl font-semibold">No journal selected</h3>
      <p className="text-sm mt-2 max-w-sm text-center">
        Select a journal or create an entry to get started
      </p>
    </div>
  );
}
