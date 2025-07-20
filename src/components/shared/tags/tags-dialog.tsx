import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { updateEntryTags } from "@/services/journalEntry";
import type { RouteParams } from "@/types/shared.types";
import type { JournalEntry } from "@/types/journalEntry.types";
import { showErrorToast } from "@/helper/error";
import { formatISO9075 } from "date-fns";
import { db } from "@/lib/db";
import { TagSelector } from "./tags-selector";

export function TagsDialog({
  initialTags,
  color,
}: {
  initialTags: string[];
  color: string;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags || []);
  const { entryId } = useParams<RouteParams>() as RouteParams;
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const tagsMutation = useMutation({
    mutationFn: () => updateEntryTags(entryId, selectedTags),
    onMutate: async () => {
      await db.journalEntries.update(entryId, {
        tags: selectedTags,
        updatedAt: formatISO9075(new Date()),
      });
    },
    onSuccess: async (updatedEntry: JournalEntry) => {
      queryClient.setQueryData(
        ["journalEntry", entryId],
        (oldEntry: JournalEntry) => {
          return (oldEntry = { ...oldEntry, tags: updatedEntry.tags });
        },
      );
    },
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.journalEntries.update(entryId, {
        tags: selectedTags,
        needsSync: true,
        updatedAt: formatISO9075(new Date()),
      });
      await tagsMutation.mutateAsync();
      setOpen(false);
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Tag className="w-4 h-4 mr-1" />
          Tags
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Tags</DialogTitle>
          <DialogDescription>
            Add or remove tags for your journal entry
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="flex flex-col h-full space-y-6">
          <TagSelector
            color={color}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={tagsMutation.isPending}
            >
              {tagsMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
