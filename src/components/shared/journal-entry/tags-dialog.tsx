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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { updateEntryTags } from "@/services/journalEntry";
import type { RouteParams } from "@/types/shared.types";
import type { JournalEntry } from "@/types/journalEntry.types";
import { showErrorToast } from "@/helper/error";
import { formatISO9075 } from "date-fns";
import { db } from "@/lib/db";
import { textColorMap } from "@/lib/journalColor";

export function TagsDialog({ initialTags, color }: { initialTags: string[], color: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags || []);
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return selectedTags;
    return selectedTags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }, [searchTerm, selectedTags]);

  const tagAlreadySelected = (tag: string) =>
    selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase());

  const addTag = (tag: string) => {
    if (!tagAlreadySelected(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setSearchTerm("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const tagsMutation = useMutation({
    mutationFn: () => updateEntryTags(entryId, selectedTags),
    onMutate: async () => {
      await db.journalEntries.update(entryId, {
        tags: selectedTags,
        updatedAt: formatISO9075(new Date()),
      });
    },
    onSuccess: async (updatedEntry: JournalEntry) => {
      queryClient.setQueryData(["journalEntry", entryId], (oldEntry: JournalEntry) => {
        return oldEntry = {...oldEntry, tags: updatedEntry.tags}
      })
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
      setSearchTerm("");
      setOpen(false);
    } catch (e) {
      showErrorToast(e);
    }
  };

  const tagExistsInSelected = tagAlreadySelected(searchTerm.trim());

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
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="mb-2" htmlFor="tag-search">
                Tag Name
              </Label>
              <Input
                id="tag-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search or add tag"
              />
            </div>

            <div className="grid gap-3">
              {filteredTags.length > 0 && (
                <ul className="max-h-40 overflow-auto border rounded p-2 flex flex-col gap-2">
                  {filteredTags.map((tag) => (
                    <Button
                      variant="outline"
                      key={tag}
                      className="w-full justify-start"
                      onClick={() => removeTag(tag)}
                      type="button"
                    >
                      <Tag className={`mr-2 ${textColorMap[color]}`} />
                      {tag}
                    </Button>
                  ))}
                </ul>
              )}

              {!tagExistsInSelected && searchTerm.trim() !== "" && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex gap-2 mt-2"
                  onClick={() => addTag(searchTerm.trim())}
                >
                  <Plus className="w-4 h-4" /> Add tag "{searchTerm.trim()}"
                </Button>
              )}
            </div>
          </div>

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
            <Button type="submit" className="cursor-pointer">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
