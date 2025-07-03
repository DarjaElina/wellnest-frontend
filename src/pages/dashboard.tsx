import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar.tsx";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Outlet />
    </SidebarProvider>
  );
}
