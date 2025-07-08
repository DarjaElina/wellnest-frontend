import { ModeToggle } from "@/components/shared/mode-toggle";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground ">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-brand-primary italic">
          Wellnest
        </h1>
        <ModeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
