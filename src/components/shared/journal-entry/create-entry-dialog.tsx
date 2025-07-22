import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Journal } from "@/types/journal.types";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useIsDemo } from "@/context/demoContext";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journals: Journal[];
  isLoading: boolean;
  isError: boolean;
  onCreate: (journal: Journal) => void;
};

export function CreateEntryDialog({
  open,
  onOpenChange,
  journals,
  isLoading,
  isError,
  onCreate,
}: Props) {
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null,
  );

  const selectedJournal = journals.find((j) => j.id === selectedJournalId);
  const isDemo = useIsDemo();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={isDemo}
          className="text-neutral-100 bg-brand-secondary cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" />
          {isDemo ? "New Entry (demo)" : "New Entry"}
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Select a journal</DialogTitle>
          <DialogDescription>
            Choose where to add the new entry
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading journals…</p>
        )}
        {isError && (
          <p className="text-sm text-destructive">Error loading journals</p>
        )}

        {journals && (
          <div className="space-y-4">
            <Select onValueChange={(val) => setSelectedJournalId(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select journal" />
              </SelectTrigger>
              <SelectContent>
                {journals.map((j) => (
                  <SelectItem key={j.id} value={j.id}>
                    {j.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="w-full cursor-pointer"
              disabled={!selectedJournal}
              onClick={() => selectedJournal && onCreate(selectedJournal)}
            >
              Create entry in {selectedJournal?.name ?? "..."}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
