export function MoodTrackerGraph() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Mood Tracker</h2>
      <div className="flex space-x-3 text-2xl mt-2">
        <div title="Mon">😊</div>
        <div title="Tue">😐</div>
        <div title="Wed">😢</div>
        <div title="Thu">😊</div>
        <div title="Fri">😊</div>
        <div title="Sat">😴</div>
        <div title="Sun">😊</div>
      </div>
    </div>
  );
}
