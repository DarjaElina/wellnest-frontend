import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import DOMPurify from 'dompurify'
import {getJournalPreviewTitle} from '@/util/journal'

export function JournalEntryCard({
    content,
    date,
    onSelect
}: {
  content: string;
  date: string;
  onSelect: () => void;
}) {
  const sanitizedHTML = DOMPurify.sanitize(content)
  const {parsedHeading, parsedParagraph} = getJournalPreviewTitle(sanitizedHTML)
  return (
    <Card onClick={onSelect} className="mb-4 cursor-pointer">
      <CardHeader>
        <CardTitle dangerouslySetInnerHTML={{__html: parsedHeading}}></CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent dangerouslySetInnerHTML={{__html: parsedParagraph}}>
      </CardContent>
    </Card>
  );
}
