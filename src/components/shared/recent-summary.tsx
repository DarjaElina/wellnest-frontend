import { Link } from "react-router-dom";

export function RecentSummary() {
    return (
        <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Last Journal Entry</h3>
                    <p className="text-base mt-2 line-clamp-2">
                        “I’ve been feeling more calm this week after meditating every day...”
                    </p>
                    <Link to="/journal" className="text-sm text-primary hover:underline mt-2 inline-block">
                        View full entry →
                    </Link>
                </div>

                <div className="bg-muted p-4 rounded-md shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Mood This Week</h3>
                    <p className="text-base mt-2">😊 😐 😢 😊 😊 😴 😊</p>
                </div>
            </div>
        </div>
    )
}
