import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar.tsx";
import { useSettings } from "@/context/settingsContext";
import MoodDialog from "@/components/shared/mood/create-mood-dialog";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getTodayMoodEntry } from "@/services/moodEntry";
import { useQuery } from "@tanstack/react-query";
import { useIsDemo } from "@/context/demoContext";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { settings } = useSettings();
  const isDemo = useIsDemo();
  const { data } = useQuery({
    queryKey: ["todayMood"],
    queryFn: getTodayMoodEntry,
    enabled: !isDemo,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto">
          <SidebarTrigger className="cursor-pointer m-2" />
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
    </SidebarProvider>
  );
}
