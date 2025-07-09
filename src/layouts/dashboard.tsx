import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar.tsx";
import { Toaster } from "sonner";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="cursor-pointer mx-3" />
      <Outlet />
      <Toaster position="top-right" richColors/>
    </SidebarProvider>
  );
}
