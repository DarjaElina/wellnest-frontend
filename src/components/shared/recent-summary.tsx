import { Link } from "react-router-dom"

export function RecentSummary() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted/40 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Last Journal Entry
          </h3>
          <p className="text-base mt-3 line-clamp-2">
            “I’ve been feeling more calm this week after meditating every day...”
          </p>
          <Link
            to="/journal"
            className="text-sm text-teal-600 hover:underline mt-3 inline-block font-medium"
          >
            View full entry →
          </Link>
        </div>

        <div className="bg-muted/40 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Mood This Week
          </h3>
          <p className="text-xl mt-3">😊 😐 😢 😊 😊 😴 😊</p>
        </div>
      </div>
    </section>
  )
}

