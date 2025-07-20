import { ModeToggle } from "@/components/shared/mode-toggle";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground ">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-brand-secondary font-bold text-2xl"
          >
            <img
              src="/logo.png"
              className="w-10 h-10 mr-2"
              alt="Wellnest logo (lotus flower)"
            />
            Wellnest
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
