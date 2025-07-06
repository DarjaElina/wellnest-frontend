import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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


const formSchema = z.object({
  name: z.string().min(1, "Journal name is required"),
  color: z.string().optional(),
});

export function NewJournalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });
  const queryClient =  useQueryClient() 

  const newJournalMutation = useMutation({
    mutationFn: createJournal,
    onSuccess: (newJournal) => {
      const journals = queryClient.getQueryData(['journals'])
      queryClient.setQueryData(['journals'], journals.concat(newJournal))
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      newJournalMutation.mutate(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle>Create New Journal</DialogTitle>
          <DialogDescription className="sr-only">
          </DialogDescription>
        </DialogHeader>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Daily Notes" {...field} />
              </FormControl>
              <FormDescription>This will appear in your sidebar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Picker here */}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Create</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
