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
import { useEffect, useMemo, useState } from "react";
import { TagsSearch } from "../tags/tags-search";
import { useFilter } from "@/context/filterContext";
import debounce from "lodash.debounce";

type Props = {
  entries: JournalEntry[];
};

export function EntriesSidebar({ entries }: Props) {
  const { dispatch } = useFilter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClearFilter = () => {
    setFilterOpen(false);
    dispatch({ type: "RESET" });
  };
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        dispatch({ type: "SET_SEARCH", payload: value });
      }, 400),
    [dispatch],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  return (
    <div className="overflow-y-auto px-4 py-2 flex-1">
      <div className="flex w-full max-w-sm items-center gap-3 my-3">
        <Input
          placeholder="Search entries..."
          value={inputValue}
          onChange={handleSearchChange}
        />
        <Button
          className="cursor-pointer"
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

          <RadioGroup
            defaultValue="desc"
            onValueChange={(value: 'asc' | 'desc') => {
              dispatch({ type: "SET_SORT", payload: value});
            }}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="desc" id="r1" />
              <Label htmlFor="r1">Newest first</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="asc" id="r2" />
              <Label htmlFor="r2">Oldest first</Label>
            </div>
          </RadioGroup>

          <TagsSearch />
          <Button className="cursor-pointer" onClick={handleClearFilter}>
            Clear filters
          </Button>
        </DialogContent>
      </Dialog>

      <JournalEntryList entries={entries} />
    </div>
  );
}
