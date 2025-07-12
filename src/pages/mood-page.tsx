import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { moodSets } from "@/types/mood.types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MoodPage() {
  const [selectedSet, setSelectedSet] = useState("Emoji");

  const moodSet = moodSets.find((set) => set.name === selectedSet);

  useEffect(() => {
    const savedSet = localStorage.getItem("moodSet");
    if (savedSet) setSelectedSet(savedSet);
  }, []);

  useEffect(() => {
    localStorage.setItem("moodSet", selectedSet);
  }, [selectedSet]);

  useEffect(() => {
    const savedSet = localStorage.getItem("moodSet");
    if (savedSet) setSelectedSet(savedSet);
  }, []);

  return (
    <div className="wrapper py-8 space-y-6">
      <h3>Settings</h3>
      <div className="flex items-center gap-4">
        <span className="font-medium">Mood style:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              {selectedSet}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {moodSets.map((set) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={set.name}
                onClick={() => setSelectedSet(set.name)}
              >
                {set.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3>Mood statictics</h3>
    </div>
  );
}
