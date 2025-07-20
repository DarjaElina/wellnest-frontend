import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { MoodPicker } from "./mood-picker";
import { updateMoodEntry } from "@/services/moodEntry";
import { format } from "date-fns";
import type { MoodType } from "@/types/mood.types";
import { Label } from "@/components/ui/label";

interface MoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEntry: MoodType & { note?: string; id?: string };
}

export default function EditMoodDialog({
  open,
  onOpenChange,
  initialEntry,
}: MoodDialogProps) {
  const queryClient = useQueryClient();

  const [entry, setEntry] = useState({
    id: initialEntry?.id ?? "",
    label: initialEntry?.label ?? "",
    iconUrl: initialEntry?.iconUrl ?? "",
    note: initialEntry?.note ?? "",
    moodSet: "Default",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const mutation = useMutation({
    mutationFn: async () => updateMoodEntry(entry, entry.id),
    onSuccess: (updatedEntry) => {
      console.log(updatedEntry);

      queryClient.setQueryData(["todayMood"], updatedEntry);

      const currentSummary: MoodType[] =
        queryClient.getQueryData(["moodWeekSummary"]) || [];
      const updatedSummary = currentSummary.map((e) =>
        e.id === updatedEntry.id ? updatedEntry : e,
      );
      queryClient.setQueryData(["moodWeekSummary"], updatedSummary);

      onOpenChange(false);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  if (!initialEntry) {
    return null;
  }

  const resetFields = () => {
    setEntry({
      id: initialEntry?.id ?? "",
      label: initialEntry?.label ?? "",
      iconUrl: initialEntry?.iconUrl ?? "",
      note: initialEntry?.note ?? "",
      moodSet: "Default",
      date: format(new Date(), "yyyy-MM-dd"),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetFields}>
      <DialogContent className="flex flex-col space-y-4 overflow-hidden">
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>Update your check-in</DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
        </motion.div>

        <div className="flex-1 overflow-y-auto space-y-4 p-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key="edit"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 justify-center"
            >
              <MoodPicker
                value={{ label: entry.label, iconUrl: entry.iconUrl }}
                onChange={(mood) =>
                  setEntry((prev) => ({
                    ...prev,
                    label: mood.label,
                    iconUrl: mood.iconUrl,
                  }))
                }
              />
              <Label>Note</Label>
              <Textarea
                value={entry.note}
                onChange={(e) =>
                  setEntry((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Write something..."
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            disabled={!entry.label || mutation.isPending}
            onClick={handleSubmit}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
