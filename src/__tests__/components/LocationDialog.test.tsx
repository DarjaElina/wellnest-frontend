import LocationDialog from "@/components/shared/places/location-dialog";
import { fireEvent, render, screen, waitFor } from "@/util/test-utils";
import { vi } from "vitest";

const fakeLat = 60.192059;
const fakeLng = 24.945831;

describe("LocationDialog", () => {
  const mockSetDialogOpen = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockSetDialogOpen.mockClear();
    mockOnCancel.mockClear();
  });

  it("renders title and inputs", () => {
    render(
      <LocationDialog
        dialogOpen={true}
        setDialogOpen={mockSetDialogOpen}
        onCancel={mockOnCancel}
        lat={fakeLat}
        lng={fakeLng}
      />,
    );

    expect(screen.getByText("Add a Place")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes (optional)")).toBeInTheDocument();
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("calls onCancel and resets form on cancel", async () => {
    render(
      <LocationDialog
        dialogOpen={true}
        setDialogOpen={mockSetDialogOpen}
        onCancel={mockOnCancel}
        lat={fakeLat}
        lng={fakeLng}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("allows file upload and preview shows up", async () => {
    render(
      <LocationDialog
        dialogOpen={true}
        setDialogOpen={mockSetDialogOpen}
        onCancel={mockOnCancel}
        lat={fakeLat}
        lng={fakeLng}
      />,
    );

    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText("Preview")).toBeInTheDocument();
    });
  });
});
