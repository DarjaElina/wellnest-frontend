import { fireEvent, render, screen, waitFor } from "@/util/test-utils";
import LoginForm from "@/components/shared/login-form";
import { mockNavigate } from "@/util/test-utils";

beforeEach(() => {
  mockNavigate.mockClear();
});


describe("LoginForm", () => {
  
  it("renders correctly", () => {
    render(<LoginForm />);
    expect(screen.getByText("Log In to Wellnest")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /log in/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeDefined();
  });

  it("validates inputs", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findAllByText(/please enter a valid email address/i)).toBeDefined();
    expect(await screen.findAllByText(/password must be at least 6 characters./i)).toBeDefined();
  })

  it('logs in and redirects on success', async () => {

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
    
  });

  it('shows error message when username is wrong', async () => {

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeDefined();
    });

    
  });

  it('shows error message when password is wrong', async () => {

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeDefined();
    });

    
  });
});