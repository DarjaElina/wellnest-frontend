import { render, screen } from "@/util/test-utils";
import LoginForm from "@/components/shared/login-form";

describe("LoginForm", () => {
  it("renders correctly", () => {
    render(<LoginForm />);
    expect(screen.getByText("Log In to Wellnest")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /log in/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeDefined();
  });
});