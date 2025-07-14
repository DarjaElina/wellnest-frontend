import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar.tsx";
import { Toaster } from "sonner";
import { useSettings } from "@/context/settingsContext";
import MoodDialog from "@/components/shared/mood/create-mood-dialog";
import { useState } from "react";
import { useMood } from "@/context/moodContext";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { settings } = useSettings();
  const { data } = useMood();
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
          {settings.showMoodPopup && !data && (
            <MoodDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              mode="auto-checkin"
              initialMoodEntry={data}
            />
          )}
        </main>
      </div>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  );
}
