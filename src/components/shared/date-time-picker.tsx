import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DateTimePicker({
  entryDate,
  setEntryDate,
  entryTime,
  setEntryTime,
}: {
  entryDate: Date
  setEntryDate: (d: Date) => void
  entryTime: string
  setEntryTime: (t: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {entryDate ? entryDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={entryDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  setEntryDate(date)
                  setOpen(false)
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">Time</Label>
        <input
          type="time"
          id="time-picker"
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
          step="60"
          className="w-28 rounded-md border border-input shadow-xs hover:bg-accent bg-background px-3 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white h-9"
        />
      </div>
    </div>
  )
}
