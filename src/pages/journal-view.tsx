import { useOutletContext } from "react-router-dom";
import { BookOpenText, CalendarDays, ListOrdered } from "lucide-react";
import { getColorClass } from "@/lib/utils";
import type { Journal } from "@/types/journal.types";

export default function JournalView() {
  const { journal } = useOutletContext<{ journal: Journal }>();

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`rounded-xl shadow-md overflow-hidden mb-6 ${getColorClass(journal.color, "bg")}`}
      >
        <div className="flex items-center gap-3 px-6 py-4 text-white">
          <BookOpenText className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{journal.name}</h2>
        </div>
      </div>

      <div className="space-y-3 bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays
            className={`w-4 h-4 ${getColorClass(journal.color, "text")}`}
          />
          <span>
            Last updated:{" "}
            <span className="font-medium">
              {new Date(journal.updatedAt).toLocaleString()}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListOrdered
            className={`w-4 h-4 ${getColorClass(journal.color, "text")}`}
          />
          <span>
            Total entries:{" "}
            <span className="font-medium">
              {journal.journalEntries?.length ?? "0"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
