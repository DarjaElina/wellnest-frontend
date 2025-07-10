import {
  Stethoscope,
  Dumbbell,
  Apple,
  Tablets,
  BookHeart,
  Home,
  ChevronDown,
  Plus,
  LogOut,
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
import { useNavigate } from "react-router-dom";

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
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/auth";

const items = [
  { title: "Symptom Log", url: "symptom-log", icon: Stethoscope },
  { title: "Medication Log", url: "medication", icon: Tablets },
  { title: "Exercise Tracker", url: "exercises", icon: Dumbbell },
  { title: "Food Habit Tracker", url: "food", icon: Apple },
  { title: "Home", url: "", icon: Home },
];

export function AppSidebar() {
  const {data, isError, isLoading} = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ["authUser"], exact: true })
    navigate("/")
  };
  return (
    <Sidebar className="bg-sidebar text-foreground border-r border-border shadow-sm">
      <SidebarContent className=" flex flex-col h-full rounded-r-2xl p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold tracking-tight text-brand-primary">
            Wellnest
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-1">
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-muted/40 transition-all rounded-lg px-3 py-2">
                      <BookHeart className="mr-2 h-4 w-4 text-brand-primary" />
                      <span>Journals</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-2 space-y-1">
                    {isLoading && (
                      <SidebarMenuSubItem className="text-muted-foreground text-sm italic">
                        Loading journals…
                      </SidebarMenuSubItem>
                    )}
                    {isError && (
                      <SidebarMenuSubItem className="text-destructive text-sm">
                        Error loading journals
                      </SidebarMenuSubItem>
                    )}
                    {data && data.length > 0 ? (
                      data.map((journal: Journal) => (
                        <SidebarMenuSubItem key={journal.id}>
                          <Link
                            to={`./journals/${journal.id}`}
                            className="block px-3 py-1.5 rounded-md hover:bg-muted/30 transition"
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
                            className="h-8 w-full justify-start text-sm px-2 cursor-pointer hover:bg-muted/30 transition"
                          >
                            <Plus className="h-4 w-4 mr-2 text-brand-primary" />
                            Create Journal
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

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-muted/40 transition-all rounded-lg px-3 py-2"
                  >
                    <Link to={item.url}>
                      <item.icon className="mr-2 h-4 w-4 text-brand-primary" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 border-t border-border">
        <div className="flex flex-col gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            className="h-8 w-full justify-start text-sm px-2 cursor-pointer "
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      </SidebarContent>
    </Sidebar>
  );
}
