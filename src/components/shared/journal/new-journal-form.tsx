import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import ColorPicker from "../color-picker";
import { journalInputSchema } from "@/types/journal.types.ts";
import type { JournalInput } from "@/types/journal.types.ts";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createJournal } from "@/services/journal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Journal } from "@/types/journal.types";
import type { JournalColor } from "@/lib/journalColor";

export function NewJournalForm({ closeDialog }: { closeDialog: () => void }) {
  const form = useForm<JournalInput>({
    resolver: zodResolver(journalInputSchema),
    defaultValues: {
      name: "",
      color: "sand",
    },
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const newJournalMutation = useMutation({
    mutationFn: createJournal,
    onSuccess: (newJournal) => {
      const journals: Journal[] = queryClient.getQueryData(["journals"]) ?? [];
      queryClient.setQueryData(["journals"], journals.concat(newJournal));
    },
  });

  const onSubmit = async (values: JournalInput) => {
    const { name, color } = values;
    try {
      const journal = await newJournalMutation.mutateAsync({
        name: name ?? "New Journal",
        color,
      });
      closeDialog?.();
      navigate(`journals/${journal.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle>Create New Journal</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Journal Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="selection:bg-transparent selection:text-foreground autofill:shadow-[inset_0_0_0px_1000px_white] dark:autofill:shadow-[inset_0_0_0px_1000px_#0f172a]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="font-medium">Journal Color</h3>
        <ColorPicker
          value={form.watch("color") ?? "rose"}
          onChange={(val) => form.setValue("color", val as JournalColor)}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="cursor-pointer" type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
