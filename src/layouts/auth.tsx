import { ModeToggle } from "@/components/shared/mode-toggle";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground ">
      <header className="flex items-center justify-between px-6 py-4">
       <div className="flex items-center" >
        <img src="/public/logo.png" className="w-10 h-10 mr-2" alt="lotus flower" />
          <h1 className="text-xl font-bold tracking-tight text-brand-secondary ">
            Wellnest
          </h1>
       </div>
        <div>
          <Link to="/" className="text-brand-secondary font-bold mr-5 text-xl">
            Home
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
