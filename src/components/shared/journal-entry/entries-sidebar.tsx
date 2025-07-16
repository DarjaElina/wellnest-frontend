import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings2 } from "lucide-react";
import type { JournalEntry } from "@/types/journalEntry.types";
import { JournalEntryList } from "./journal-entry-list";
import { TagSelector } from "../tags/tags-selector";
import { useState } from "react";

type Props = {
  entries: JournalEntry[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterTags: string[];
  onChangeFilterTags: (tags: string[]) => void;
  sortOrder: string;
  onChangeSortOrder: (order: string) => void;
};

export function EntriesSidebar({
  entries,
  inputValue,
  onInputChange,
  filterTags,
  onChangeFilterTags,
  sortOrder,
  onChangeSortOrder,
}: Props) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="overflow-y-auto px-4 py-2 flex-1">
      <div className="flex w-full max-w-sm items-center gap-2 mb-2">
        <Input
          placeholder="Search entries..."
          value={inputValue}
          onChange={onInputChange}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFilterOpen(true)}
          title="Filter & sort"
        >
          <Settings2 className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter entries</DialogTitle>
            <DialogDescription>
              Choose options to filter entries
            </DialogDescription>
          </DialogHeader>

          <RadioGroup value={sortOrder} onValueChange={onChangeSortOrder}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="desc" id="r1" />
              <Label htmlFor="r1">Newest first</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="asc" id="r2" />
              <Label htmlFor="r2">Oldest first</Label>
            </div>
          </RadioGroup>

          <TagSelector
            color="blue"
            selectedTags={filterTags}
            onChange={onChangeFilterTags}
            allowAdd={false}
          />
        </DialogContent>
      </Dialog>

      <JournalEntryList entries={entries} />
    </div>
    // </aside>
  );
}
