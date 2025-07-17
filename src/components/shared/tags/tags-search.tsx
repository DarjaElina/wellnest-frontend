import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilter } from "@/context/filterContext";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import debounce from "lodash.debounce";
import { useState, useMemo, useEffect } from "react";

export function TagsSearch() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useFilter();
  const selectedTags = state.selectedTags;

  const debouncedSetSearchTerm = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 400);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const allTags = useLiveQuery(async () => {
    const entries = await db.journalEntries.toArray();
    const tagSet = new Set<string>();

    entries.forEach((entry) => {
      if (Array.isArray(entry.tags)) {
        entry.tags.forEach((tag) => tagSet.add(tag));
      }
    });

    return Array.from(tagSet).sort();
  }, []);

  const filteredTags = useMemo(() => {
    if (!allTags) return [];
    if (!searchTerm.trim()) return allTags;

    const lower = searchTerm.trim().toLowerCase();
    return allTags.filter((tag) => tag.toLowerCase().includes(lower));
  }, [allTags, searchTerm]);

  const handleTagToggle = (checked: boolean, tag: string) => {
    const updatedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    dispatch({ type: "SET_TAGS", payload: updatedTags });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="tag-search" className="mb-2">
          Tag Name
        </Label>
        <Input
          id="tag-search"
          value={input}
          onChange={handleInputChange}
          placeholder="Search tags..."
        />
        {filteredTags.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {filteredTags.map((tag: string) => (
              <div key={tag} className="flex items-center gap-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked: boolean) =>
                    handleTagToggle(checked, tag)
                  }
                />
                <Label htmlFor={tag} className="text-sm">
                  {tag}
                </Label>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground mt-2">No tags found.</p>
        )}
      </div>
    </div>
  );
}
