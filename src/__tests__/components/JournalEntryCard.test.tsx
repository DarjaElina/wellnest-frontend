import { JournalEntryCard } from "@/components/shared/journal-entry/journal-entry-card";
import { render, screen } from "@/util/test-utils";
import { vi } from "vitest";

vi.mock("@/context/demoContext", () => ({
  useIsDemo: () => false,
}));

const mockEntry = {
  id: "1",
  journalId: "j1",
  color: "blue",
  content: "<h1>My Entry</h1><p>Details</p>",
  entryDate: "2023-01-01T00:00:00Z",
  tags: [],
  isFavorite: false,
  updatedAt: "2023-02-01T00:00:00Z",
  clientId: "offline-1",
};

describe("JournalEntryCard", () => {
  it("renders entry content and date", async () => {
    render(<JournalEntryCard entry={mockEntry} isActive={false} />);
    expect(await screen.findByText(/my entry/i)).toBeDefined();
    expect(await screen.findByText(/details/i)).toBeDefined();
    expect(await screen.findByText(/january/i)).toBeDefined();
  });
});
