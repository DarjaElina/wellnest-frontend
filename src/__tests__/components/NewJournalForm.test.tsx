import { fireEvent, render, screen, waitFor } from "@/util/test-utils";
import { NewJournalForm } from "@/components/shared/journal/new-journal-form";
import {vi} from "vitest";
import { mockNavigate } from "@/util/test-utils";
import { Dialog } from "@/components/ui/dialog";

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("RegisterForm", () => {
  const closeDialog = vi.fn();
  
  it("renders correctly", () => {
    render(<Dialog>
      <NewJournalForm closeDialog={closeDialog} />
    </Dialog>);

    expect(screen.getByLabelText(/journal name/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /create/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDefined();
  });

  it("shows validation error if name is empty", async () => {
    render(<Dialog>
      <NewJournalForm closeDialog={closeDialog} />
    </Dialog>);
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
    expect(await screen.findByText(/journal name is required/i)).toBeDefined()
  });

  it("creates journal and navigates to it", async () => {
    const closeDialog = vi.fn();
  
    render(<Dialog>
      <NewJournalForm closeDialog={closeDialog} />
    </Dialog>);
  
    fireEvent.change(screen.getByLabelText(/journal name/i), {
      target: { value: "New Journal" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
  
    await waitFor(() => {
      expect(closeDialog).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("journals/mock-journal-id");
    });
  });

  it("shows error if journal creation fails", async () => {
    render(<Dialog>
      <NewJournalForm closeDialog={closeDialog} />
    </Dialog>);
  
    fireEvent.change(screen.getByLabelText(/journal name/i), {
      target: { value: "fail" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
  
    await waitFor(() => {
      expect(closeDialog).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
  
      expect(screen.getByText(/invalid journal data/i)).toBeDefined();
    });
  });
});