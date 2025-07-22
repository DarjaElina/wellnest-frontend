import { fireEvent, render, screen, waitFor } from "@/util/test-utils";
import { mockNavigate } from "@/util/test-utils";
import RegisterForm from "@/components/shared/register-form";

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("RegisterForm", () => {
  it("renders correctly", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/first name/i)).toBeDefined();
    expect(screen.getByLabelText(/last name/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/^password$/i)).toBeDefined();
    expect(screen.getByLabelText(/confirm password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined();
  });

  it("validates inputs", async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findAllByText(/First name is required/i)).toBeDefined();
    expect(await screen.findAllByText(/Last name is required/i)).toBeDefined();
    expect(
      await screen.findAllByText(/Please enter a valid email address/i),
    ).toBeDefined();
    expect(
      await screen.findAllByText(/Password must be at least 6 characters/i),
    ).toBeDefined();
  });

  it("shows error if passwords do not match", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "abcdef" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeDefined();
  });

  it("submits and redirects on success", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error if email is already taken", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "alreadyInUse@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(screen.getByText(/email is already in use/i)).toBeDefined();
    });
  });
});
