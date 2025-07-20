import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { MoodPicker } from "./mood-picker";
import { createMoodEntry } from "@/services/moodEntry";
import { format } from "date-fns";
import {
  hasDismissedMoodPopupToday,
  markMoodPopupAsDismissed,
} from "@/helper/mood";
import type { MoodType } from "@/types/mood.types";
import { getDynamicMessage } from "@/helper/mood";
import { showErrorToast } from "@/helper/error";
import { useSettings } from "@/context/settingsContext";

type MoodDialogMode = "manual-checkin" | "auto-checkin";

interface MoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: MoodDialogMode;
  initialMoodEntry?: MoodType & { note?: string; id?: string };
}

export default function CreateMoodDialog({
  open,
  onOpenChange,
  mode = "manual-checkin",
  initialMoodEntry,
}: MoodDialogProps) {
  const queryClient = useQueryClient();
  const isAuto = mode === "auto-checkin";
  const { settings } = useSettings();

  const [step, setStep] = useState<1 | 2>(1);

  const [entry, setEntry] = useState({
    id: "",
    label: "",
    iconUrl: "",
    note: "",
    moodSet: "Emoji",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    if (open) {
      setStep(1);
      setEntry({
        id: initialMoodEntry?.id ?? "",
        label: initialMoodEntry?.label ?? "",
        iconUrl: initialMoodEntry?.iconUrl ?? "",
        note: initialMoodEntry?.note ?? "",
        moodSet: "Emoji",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    }
  }, [open, initialMoodEntry]);

  useEffect(() => {
    const now = new Date();
    const [hours, minutes] = settings.checkinTime.split(":").map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    const isAfterTargetTime = now >= targetTime;

    if (
      isAuto &&
      !initialMoodEntry &&
      isAfterTargetTime &&
      !hasDismissedMoodPopupToday()
    ) {
      onOpenChange(true);
    }
  }, [isAuto, initialMoodEntry, onOpenChange, settings.checkinTime]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen && isAuto && !initialMoodEntry) {
      markMoodPopupAsDismissed();
    }
  };

  const mutation = useMutation({
    mutationFn: async () => createMoodEntry(entry),
    onSuccess: (newEntry) => {
      queryClient.setQueryData(["todayMood"], newEntry);
      onOpenChange(false);
      markMoodPopupAsDismissed();
      const currentSummary: MoodType[] =
        queryClient.getQueryData(["moodWeekSummary"]) || [];
      queryClient.setQueryData(
        ["moodWeekSummary"],
        currentSummary.concat(newEntry),
      );
    },
  });

  const handleSubmit = () => {
    try {
      mutation.mutate();
      console.log("saved!");
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col space-y-4 overflow-hidden">
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>
              {step === 1
                ? "How are you feeling today?"
                : getDynamicMessage(entry.label)}
            </DialogTitle>
            <DialogDescription>
              {step === 1
                ? "This will only take a moment"
                : "Would you like to share more?"}
            </DialogDescription>
          </DialogHeader>
        </motion.div>

        <div className="min-h-[12vh] flex-1 overflow-y-auto space-y-4 px-1">
          <AnimatePresence mode="wait" initial={false}>
            {step === 2 && (
              <motion.div
                key="editOrStep2"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[10vh] flex flex-col gap-4 justify-center"
              >
                <Textarea
                  value={entry.note}
                  onChange={(e) =>
                    setEntry((prev) => ({ ...prev, note: e.target.value }))
                  }
                  placeholder="Write something..."
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[10vh] flex items-center justify-center"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter>
          {step === 1 && (
            <DialogClose asChild>
              <Button variant="ghost" onClick={markMoodPopupAsDismissed}>
                Answer later
              </Button>
            </DialogClose>
          )}
          <Button
            className="cursor-pointer"
            disabled={!entry.label || mutation.isPending}
            onClick={step === 2 ? handleSubmit : () => setStep(2)}
          >
            {step === 2 && mutation.isPending
              ? "Saving..."
              : step === 2
                ? "Save"
                : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
