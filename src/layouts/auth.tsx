import { ModeToggle } from "@/components/shared/mode-toggle";
import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground ">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-brand-primary italic">
          Wellnest
        </h1>
        <div>
          <Link to="/" className="text-brand-primary font-bold mr-5 text-xl">
            Home
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main>
        <Outlet />
        <Toaster position="top-right" richColors/>
      </main>
    </div>
  );
}
