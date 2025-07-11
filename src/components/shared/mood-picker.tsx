"use client";
import { useEffect, useState } from "react";
import { moodSets } from "@/types/mood.types";
import type { MoodType } from "@/types/mood.types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MoodPicker() {
  const [selectedSet, setSelectedSet] = useState("Emoji");
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const moodSet = moodSets.find((set) => set.name === selectedSet);

  useEffect(() => {
    const savedSet = localStorage.getItem("moodSet");
    if (savedSet) setSelectedSet(savedSet);
  }, []);

  useEffect(() => {
    localStorage.setItem("moodSet", selectedSet);
  }, [selectedSet]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="font-medium">Mood style:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedSet}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {moodSets.map((set) => (
              <DropdownMenuItem
                key={set.name}
                onClick={() => setSelectedSet(set.name)}
              >
                {set.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="p-4 grid grid-cols-3 sm:grid-cols-5 gap-4 bg-muted shadow-lg">
        {moodSet?.moods.map((mood) => (
          <button
            key={mood.id}
            className={cn(
              "flex flex-col items-center p-2 rounded-xl transition hover:bg-accent",
              selectedMood?.id === mood.id && "bg-accent"
            )}
            onClick={() => setSelectedMood(mood)}
          >
            {mood.icon.startsWith("/") ? (
              <img src={mood.icon} alt={mood.label} className="w-10 h-10" />
            ) : (
              <span className="text-3xl">{mood.icon}</span>
            )}
            <span className="text-sm mt-1">{mood.label}</span>
          </button>
        ))}
      </Card>

      {selectedMood && (
        <p className="text-muted-foreground text-sm">
          Selected mood: <strong>{selectedMood.label}</strong>
        </p>
      )}
    </div>
  );
}
