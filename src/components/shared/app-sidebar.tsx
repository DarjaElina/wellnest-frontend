import {
  BookHeart,
  ChevronDown,
  Plus,
  SmilePlus,
  Home,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

const items = [
  { title: "Home", url: "", icon: Home },
  { title: "Mood Tracker", url: "mood", icon: SmilePlus },
];

export function AppSidebar() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
      localStorage.clear();
    },
  });

  const handleLogout = () => {
    try {
      logoutMutation.mutate();
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <Sidebar className="bg-sidebar text-foreground border-r border-border shadow-sm">
      <SidebarContent className="flex flex-col h-full rounded-r-2xl p-4">
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
