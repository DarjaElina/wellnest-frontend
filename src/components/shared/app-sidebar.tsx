import { Stethoscope, Dumbbell, Apple, Tablets, BookHeart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle.tsx";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";

const items = [
  {
    title: "Journal",
    url: "journal",
    icon: BookHeart,
  },
  {
    title: "Symptom Log",
    url: "symptom-log",
    icon: Stethoscope,
  },
  {
    title: "Medication Log",
    url: "medication",
    icon: Tablets,
  },
  {
    title: "Exercise Tracker",
    url: "exercises",
    icon: Dumbbell,
  },
  {
    title: "Food Habit Tracker",
    url: "food",
    icon: Apple,
  },
  {
    title: "Home",
    url: "",
    icon: Home,
  },
];

export function AppSidebar() {
  return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>MedTrack</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="p-4 mt-auto">
            <ModeToggle />
          </div>
        </SidebarContent>
      </Sidebar>
  );
}

