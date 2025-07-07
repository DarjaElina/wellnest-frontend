import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import DOMPurify from "dompurify";
import { getJournalPreviewTitle } from "@/helper/journal";
import { StickyNote } from "lucide-react";
import clsx from "clsx";
import { getColorClass } from "@/lib/utils";

export function JournalEntryCard({
  content,
  date,
  onSelect,
  isActive,
  journalColor,
}: {
  content: string;
  date: string;
  onSelect: () => void;
  isActive?: boolean;
  journalColor: string;
}) {
  const sanitizedHTML = DOMPurify.sanitize(content);
  const { parsedHeading, parsedParagraph } =
    getJournalPreviewTitle(sanitizedHTML);
  return (
    <Card
      onClick={onSelect}
      className={clsx(
        "cursor-pointer transition-shadow border shadow-sm",
        isActive
          ? `ring-2 ${getColorClass(journalColor, "ring")} border-transparent`
          : "hover:shadow-md hover:border-gray-300",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex-1">
          <CardTitle
            className="text-base font-medium line-clamp-1"
            dangerouslySetInnerHTML={{ __html: parsedHeading }}
          />
          <CardDescription className="text-xs mt-1">
            {new Date(date).toLocaleString()}
          </CardDescription>
        </div>
        <StickyNote
          className={`w-4 h-4 ${getColorClass(journalColor, "text")} opacity-80`}
        />
      </CardHeader>

      <CardContent
        className="text-sm text-gray-700 mt-1 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: parsedParagraph }}
      />
    </Card>
  );
}
