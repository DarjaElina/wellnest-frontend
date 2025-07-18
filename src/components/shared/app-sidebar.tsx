import {
  BookHeart,
  ChevronDown,
  Plus,
  SmilePlus,
  Home,
  LogOut,
  BookOpenText,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJournals } from "@/services/journal";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Journal } from "@/types/journal.types";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/helper/error";

import { NewJournalForm } from "./journal/new-journal-form";

import SettingsDialog from "./settings-dialog";
import { db } from "@/lib/db";
import { Skeleton } from "../ui/skeleton";

const items = [
  { title: "Home", url: "", icon: Home },
  { title: "All Entries", url: "journal-entries/all", icon: BookOpenText },
  { title: "Mood Tracker", url: "mood", icon: SmilePlus },
  { title: "My Calm Places", url: "places", icon: MapPin },
];

export function AppSidebar() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      navigate("/login");
      localStorage.clear();
      await db.delete();
      await db.open();
      queryClient.clear();
    },
    onError: (e) => {
      showErrorToast(e);
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <Sidebar
      variant="inset"
      className="bg-sidebar text-foreground border-r border-border shadow-sm"
    >
      <SidebarContent className="flex flex-col h-full rounded-r-2xl p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg flex items-center font-bold tracking-tight text-brand-secondary">
            <img
              src="/public/logo.png"
              className="w-8 h-8 mr-2"
              alt="lotus flower"
            />
            <p>Wellnest</p>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-1">
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-muted/40 transition-all rounded-lg px-3 py-2">
                      <BookHeart className="mr-2 h-4 w-4" />
                      <span>Journals</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-2 space-y-1">
                    {isLoading ? (
                      <Skeleton />
                    ) : isError ? (
                      <SidebarMenuSubItem className="text-destructive text-sm">
                        Error loading journals
                      </SidebarMenuSubItem>
                    ) : data && data.length > 0 ? (
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
                            <Plus className="h-4 w-4 mr-2" />
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
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SettingsDialog />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarFooter className="mt-auto pt-4 border-t border-border">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
