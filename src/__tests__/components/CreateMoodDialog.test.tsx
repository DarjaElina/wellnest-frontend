import { render, screen, waitFor } from "@/util/test-utils";
import userEvent from "@testing-library/user-event";
import CreateMoodDialog from "@/components/shared/mood/create-mood-dialog";
import { vi } from "vitest";

vi.mock("@/lib/utils", () => ({
  markMoodPopupAsDismissed: vi.fn(),
  hasDismissedMoodPopupToday: () => false,
  showErrorToast: vi.fn(),
  cn: vi.fn(),
}));

vi.mock("@/components/shared/mood/mood-picker", () => ({
  MoodPicker: ({
    onChange,
  }: {
    onChange: ({ label, iconUrl }: { label: string; iconUrl: string }) => void;
  }) => (
    <button onClick={() => onChange({ label: "Happy", iconUrl: "smile.png" })}>
      Select Happy
    </button>
  ),
}));

describe("CreateMoodDialog", () => {
  it("saves mood entry successfully via MSW", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <CreateMoodDialog
        open={true}
        onOpenChange={onOpenChange}
        mode="manual-checkin"
      />,
    );

    expect(screen.getByText(/how are you feeling today/i)).toBeInTheDocument();
    await user.click(screen.getByText("Select Happy"));

    await user.click(screen.getByRole("button", { name: /continue/i }));

    const textarea = screen.getByText("Would you like to share more?");
    await user.type(textarea, "I'm great!");

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
