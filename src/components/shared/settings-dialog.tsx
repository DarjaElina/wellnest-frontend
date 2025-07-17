"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useState } from "react";
import GeneralSettings from "./settings/general-settings";
import MoodSettings from "./settings/mood-settings";
import SidebarTabButton from "./settings/sidebar-tab-button";
import AppearanceSettings from "./settings/appearance-settings";
import AffirmationSettings from "./settings/affirmation-settings";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"general" | "appearance" | "mood" | "affirmation">("general");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <DialogTrigger asChild>
          <SidebarMenuButton
            asChild
            className="hover:bg-muted/40 transition-all rounded-lg px-3 py-2 cursor-pointer"
          >
            <button className="w-full text-left flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </button>
          </SidebarMenuButton>
        </DialogTrigger>
      </SidebarMenuItem>

      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>User Settings</DialogDescription>
        </DialogHeader>
        <div className="flex h-[60vh] w-full">
          <aside className="w-48 bg-muted/40 border-r p-4 space-y-2">
            <SidebarTabButton
              label="General"
              isActive={tab === "general"}
              onClick={() => setTab("general")}
            />
            <SidebarTabButton
              label="Appearance"
              isActive={tab === "appearance"}
              onClick={() => setTab("appearance")}
            />
            <SidebarTabButton
              label="Mood"
              isActive={tab === "mood"}
              onClick={() => setTab("mood")}
            />
             <SidebarTabButton
              label="Affirmation"
              isActive={tab === "affirmation"}
              onClick={() => setTab("affirmation")}
            />
          </aside>

          <main className="flex-1 p-6 overflow-y-auto">
            {tab === "general" && <GeneralSettings />}
            {tab === "appearance" && <AppearanceSettings />}
            {tab === "mood" && <MoodSettings />}
            {tab === "affirmation" && <AffirmationSettings />}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
