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
import { useNavigate } from "react-router";
import type { JournalEntry } from "@/types/journalEntry.types";
import { ringColorMap, textColorMap } from "@/lib/journalColor";
import { formatDate } from "@/helper/date";
import { useIsDemo } from "@/context/demoContext";
import type { Dispatch, SetStateAction } from "react";

export function JournalEntryCard({
  entry,
  isActive,
  setSheetOpen,
}: {
  entry: JournalEntry;
  isActive: boolean;
  setSheetOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const { journalId, id, color, content, entryDate } = entry;

  const formattedDate = formatDate(entryDate);
  const isDemo = useIsDemo();

  const navigate = useNavigate();

  const handleSelect = () => {
    if (setSheetOpen) {
      setSheetOpen(false);
    }
    const url = isDemo
      ? `/demo/dashboard/journals/${journalId}/${id}`
      : `/dashboard/journals/${journalId}/${id}`;
    navigate(url);
  };

  const sanitizedHTML = DOMPurify.sanitize(content);
  const { parsedHeading, parsedParagraph } =
    getJournalPreviewTitle(sanitizedHTML);

  if (!entry) {
    return null;
  }
  return (
    <Card
      onClick={handleSelect}
      className={clsx(
        "cursor-pointer transition-shadow border shadow-sm",
        isActive
          ? `ring-2  ${ringColorMap[color]} border-transparent`
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
            {formattedDate}
          </CardDescription>
        </div>
        <StickyNote className={`w-4 h-4 ${textColorMap[color]} opacity-80`} />
      </CardHeader>

      <CardContent
        className="text-sm text-muted-foreground mt-1 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: parsedParagraph }}
      />
    </Card>
  );
}
