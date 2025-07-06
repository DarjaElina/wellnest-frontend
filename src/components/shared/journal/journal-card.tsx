import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

export default function JournalCard({ name, color }) {
  return (
    <Card className="mb-4 cursor-pointer">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{color}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}