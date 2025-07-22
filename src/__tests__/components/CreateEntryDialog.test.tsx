import { render, screen } from "@/util/test-utils";
import { CreateEntryDialog } from "@/components/shared/journal-entry/create-entry-dialog";
import type { Journal } from "@/types/journal.types";

const mockJournals: Journal[] = [
  { id: "1", name: "Morning Pages", color: "moss", updatedAt: "" },
  { id: "2", name: "Dream Log", color: "ocean", updatedAt: "" },
];

describe("CreateEntryDialog", () => {
  it("renders dialog content when open", () => {
    render(
      <CreateEntryDialog
        open={true}
        onOpenChange={() => {}}
        journals={mockJournals}
        isLoading={false}
        isError={false}
        onCreate={() => {}}
      />,
    );

    expect(screen.getByText("Select a journal")).toBeDefined();
    expect(screen.getByText("Choose where to add the new entry")).toBeDefined();
  });

  it("renders loading and error states", () => {
    const { rerender } = render(
      <CreateEntryDialog
        open={true}
        onOpenChange={() => {}}
        journals={[]}
        isLoading={true}
        isError={false}
        onCreate={() => {}}
      />,
    );

    expect(screen.getByText(/loading journals/i)).toBeDefined();

    rerender(
      <CreateEntryDialog
        open={true}
        onOpenChange={() => {}}
        journals={[]}
        isLoading={false}
        isError={true}
        onCreate={() => {}}
      />,
    );

    expect(screen.getByText(/error loading journals/i)).toBeDefined();
  });

  it("disables create button until a journal is selected", () => {
    render(
      <CreateEntryDialog
        open={true}
        onOpenChange={() => {}}
        journals={mockJournals}
        isLoading={false}
        isError={false}
        onCreate={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /create entry/i });
    expect(button).toBeDisabled();
  });
});
