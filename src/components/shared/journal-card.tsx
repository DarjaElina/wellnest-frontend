import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function JournalCard({ title, content, date }: { title: string; content: string, date: string }) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{date}</CardDescription>
               {/* <CardAction>Card Action</CardAction>*/}
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>
    )
}