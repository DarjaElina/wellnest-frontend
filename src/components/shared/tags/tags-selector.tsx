import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { textColorMap } from "@/lib/journalColor";
import { Tag, Plus } from "lucide-react";
import { useState, useMemo } from "react";

export function TagSelector({
  color,
  selectedTags,
  onChange,
}: {
  color: string;
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  allowAdd?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return selectedTags;
    return selectedTags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }, [searchTerm, selectedTags]);

  const tagExists = selectedTags.some(
    (tag) => tag.toLowerCase() === searchTerm.trim().toLowerCase(),
  );

  const addTag = (tag: string) => {
    if (!tagExists && tag.trim()) {
      onChange([...selectedTags, tag.trim()]);
      setSearchTerm("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(selectedTags.filter((t) => t !== tag));
  };

  console.log("filteres tags are:", filteredTags);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label className="mb-2" htmlFor="tag-search">
          Tag Name
        </Label>
        <Input
          id="tag-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={"Search or add tag"}
        />
      </div>

      <div className="grid gap-3">
        {filteredTags.length > 0 && (
          <ul className="max-h-40 overflow-auto border rounded p-2 flex flex-col gap-2">
            {filteredTags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
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

        {!tagExists && searchTerm.trim() !== "" && (
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
  );
}
