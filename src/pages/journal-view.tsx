import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  BookOpenText,
  CalendarDays,
  Download,
  ListOrdered,
  MoreHorizontal,
  Settings,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  journalInputSchema,
  type Journal,
  type JournalInput,
} from "@/types/journal.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJournal, deleteJournal } from "@/services/journal";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import ColorPicker from "@/components/shared/color-picker";
import { toast } from "sonner";
import { bgColorMap, textColorMap, type JournalColor } from "@/lib/journalColor";
import { JournalViewSkeleton } from "@/components/skeleton/JournalViewSkeleton";

export default function JournalView() {
  const { journal } = useOutletContext<{ journal: Journal }>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<JournalInput>({
    resolver: zodResolver(journalInputSchema),
    defaultValues: {
      name: journal?.name ?? "",
      color: journal?.color ?? "rose",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: JournalInput) => updateJournal(journal?.id, data),
    onSuccess: (updatedJournal: Journal) => {
      console.log("updated journal is:",updatedJournal)
      queryClient.setQueryData<Journal[]>(["journals"], (old = []) =>
        old.map((j) => (j.id === updatedJournal.id ? updatedJournal : j)),
      );
      queryClient.setQueryData(["journal", updatedJournal.id], (old: Journal) => {
        return {...old, name: updatedJournal.name, color: updatedJournal.color}
      })
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteJournal(journal.id),
    onSuccess: () => {
      queryClient.setQueryData<Journal[]>(["journals"], (old = []) =>
        old.filter((j) => j.id !== journal.id),
      );
      navigate("/dashboard");
    },
  });
  const onSubmit = (data: JournalInput) => {
    updateMutation.mutate(data);
  };

  const handleDelete = () => {
    toast("Are you sure you want to delete?", {
      action: {
        label: "Yes, Delete",
        onClick: () => deleteMutation.mutate(),
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("cancelled"),
      },
    });
  };

  if (!journal) {
    return <JournalViewSkeleton />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`flex items-center justify-between rounded-xl shadow-md overflow-hidden mb-6 px-6 py-4 ${bgColorMap[journal.color]}`}
      >
        <div className="flex items-center gap-3">
          <BookOpenText className="w-6 h-6 text-neutral-100" />
          <h2 className="text-xl font-semibold text-neutral-100">
            {journal.name}
          </h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal className="w-7 h-7 text-neutral-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setDialogOpen(true)}
              className="cursor-pointer"
            >
              <Settings className="mr-2 w-4 h-4" />
              Journal Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Exporting...")}
              className="cursor-pointer"
            >
              <Download className="mr-2 w-4 h-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive cursor-pointer"
            >
              <Trash2 className="mr-2 w-4 h-4 text-destructive" />
              Delete Journal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3 bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className={`w-4 h-4 ${textColorMap[journal.color]}`} />
          <span>
            Last updated:{" "}
            <span className="font-medium">
              {new Date(journal.updatedAt).toLocaleString()}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListOrdered className={`w-4 h-4 ${textColorMap[journal.color]}`} />
          <span>
            Total entries:{" "}
            <span className="font-medium">
              {journal.journalEntries?.length ?? "0"}
            </span>
          </span>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Edit Journal</DialogTitle>
                <DialogDescription>
                  Update journal details below.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Journal Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Journal Color</FormLabel>
              <ColorPicker
                value={form.watch("color")}
                onChange={(val) => form.setValue("color", val as JournalColor)}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
