export function MoodTrackerGraph() {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-semibold text-foreground">Mood Tracker</h2>
      <div className="flex justify-between text-3xl mt-4 px-2 md:px-4">
        <div title="Mon" className="hover:scale-110 transition">😊</div>
        <div title="Tue" className="hover:scale-110 transition">😐</div>
        <div title="Wed" className="hover:scale-110 transition">😢</div>
        <div title="Thu" className="hover:scale-110 transition">😊</div>
        <div title="Fri" className="hover:scale-110 transition">😊</div>
        <div title="Sat" className="hover:scale-110 transition">😴</div>
        <div title="Sun" className="hover:scale-110 transition">😊</div>
      </div>
    </section>
  )
}
