import {
  Stethoscope,
  Dumbbell,
  Apple,
  Tablets,
  BookHeart,
  Home,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { NewJournalForm } from "./journal/new-journal-form";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getJournals } from "@/services/journal";
import { useState } from "react";
import type { Journal } from "@/types/journal.types";

const items = [
  { title: "Symptom Log", url: "symptom-log", icon: Stethoscope },
  { title: "Medication Log", url: "medication", icon: Tablets },
  { title: "Exercise Tracker", url: "exercises", icon: Dumbbell },
  { title: "Food Habit Tracker", url: "food", icon: Apple },
  { title: "Home", url: "", icon: Home },
];

export function AppSidebar() {
  const query = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MedTrack</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <BookHeart className="mr-2 h-4 w-4" />
                      <span>Journals</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {query.isLoading && <p>Loading journals</p>}
                    {query.isError && <p>Error loading journals</p>}
                    {query.data && query.data.length > 0 ? (
                      query.data.map((journal: Journal) => (
                        <SidebarMenuSubItem key={journal.id}>
                          <Link
                            to={`./journals/${journal.id}`}
                            className="hover:underline"
                          >
                            {journal.name}
                          </Link>
                        </SidebarMenuSubItem>
                      ))
                    ) : (
                      <SidebarMenuSubItem className="text-muted-foreground italic">
                        No journals yet
                      </SidebarMenuSubItem>
                    )}

                    <SidebarMenuSubItem>
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-full justify-start text-sm px-2 cursor-pointer"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            New Journal
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <NewJournalForm
                            closeDialog={() => setDialogOpen(false)}
                          />
                        </DialogContent>
                      </Dialog>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>

              {/* Other items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
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
