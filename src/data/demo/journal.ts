export const demoJournals = [
  {
    id: "demo-journal",
    name: "Gratitude Journal",
    color: "moss",
    updatedAt: "2025-07-19 22:15:00",
  },
];

export const demoJournalEntries = [
  {
    id: "demo-entry-1",
    journalId: "demo-journal",
    content:
      "<h2>Today I’m grateful for</h2><p>sunshine, coffee, and quiet time 🧘‍♀️</p>",
    updatedAt: "2025-07-19 15:28:00",
    entryDate: "2025-07-19 15:55:00",
    tags: ["gratitude"],
    favorite: true,
    color: "moss",
    clientId: "offline-demo-entry-1",
    needsSync: false,
  },
  {
    id: "demo-entry-2",
    journalId: "demo-journal",
    content:
      "<h2>My thoughts</h2><p>I felt a bit anxious earlier, but journaling helped.</p>",
    updatedAt: "2025-07-19 19:20:00",
    entryDate: "2025-07-19 20:01:00",
    tags: ["reflection"],
    favorite: true,
    color: "moss",
    clientId: "offline-demo-entry-2",
    needsSync: false,
  },
];
