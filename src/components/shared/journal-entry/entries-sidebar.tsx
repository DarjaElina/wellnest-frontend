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
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { TagsSearch } from "../tags/tags-search";
import { useFilter } from "@/context/filterContext";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";
import { bgColorMap, hoverColorMap } from "@/lib/journalColor";

type Props = {
  entries: JournalEntry[];
  color?: string;
  setSheetOpen?: Dispatch<SetStateAction<boolean>>;
};

export function EntriesSidebar({ entries, color, setSheetOpen }: Props) {
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

  const hoverColor = color ? hoverColorMap[color] : "";

  return (
    <div className="overflow-y-auto px-2 md:px-4 py-1 md:py-3 flex-1">
      <div className="flex md:w-full items-center gap-1 mb-3">
        <Input
          placeholder="Search entries..."
          value={inputValue}
          onChange={handleSearchChange}
        />
        <Button
          className={cn(
            "cursor-pointer",
            color && hoverColor,
            "transition-colors",
          )}
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
            onValueChange={(value: "asc" | "desc") => {
              dispatch({ type: "SET_SORT", payload: value });
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
          <Button
            className={cn(
              "cursor-pointer",
              color && bgColorMap[color],
              color && "text-white hover:opacity-90",
            )}
            onClick={handleClearFilter}
          >
            Clear filters
          </Button>
        </DialogContent>
      </Dialog>

      <JournalEntryList entries={entries} setSheetOpen={setSheetOpen} />
    </div>
  );
}
