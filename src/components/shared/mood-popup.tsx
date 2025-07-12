"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoodPicker } from "./mood-picker";
import { useEffect, useState } from "react";
import type { MoodType } from "@/types/mood.types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { createMoodEntry } from "@/services/moodEntry";
import { format } from "date-fns";

export function MoodPopup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const fakeIsOpenFromUserSettings = true;
  const userHasAlreadySubmittedTheEntryForToday = false;

  useEffect(() => {
    if (fakeIsOpenFromUserSettings && !userHasAlreadySubmittedTheEntryForToday)
      setOpen(true);
  }, [fakeIsOpenFromUserSettings, userHasAlreadySubmittedTheEntryForToday]);
  const newMoodEntryMutation = useMutation({
    mutationFn: createMoodEntry,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = async () => {
    if (!selectedMood) return;
    try {
      console.log({
        note,
        ...selectedMood,
        date: format(new Date(), "yyyy-MM-dd"),
        moodSet: "Emoji"
      })
      await newMoodEntryMutation.mutateAsync({
        note,
        ...selectedMood,
        date: format(new Date(), "yyyy-MM-dd"),
        moodSet: "Emoji"
      })
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getDynamicMessage = () => {
    if (!selectedMood) return "Would you like to leave a note?";
    const mood = selectedMood.label.toLowerCase();
    if (["cry", "rolling eyes", "sad"].some((w) => mood.includes(w))) {
      return "I'm here for you 💛 Want to share more?";
    }
    if (["laugh", "love", "cool", "peace"].some((w) => mood.includes(w))) {
      return "Yay! So happy for you 🎉";
    }
    return "Want to leave a note?";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col space-y-4 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`header-${step}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DialogHeader>
              <DialogTitle>
                {step === 1 ? "Hello, Anna! ❤️" : getDynamicMessage()}
              </DialogTitle>
              <DialogDescription>
                {step === 1
                  ? "How are you feeling today?"
                  : "Would you like to leave a note?"}
              </DialogDescription>
            </DialogHeader>
          </motion.div>
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto space-y-4 px-1">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="min-h-[20vh] flex items-center justify-center"
              >
                <MoodPicker value={selectedMood} onChange={setSelectedMood} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="min-h-[20vh] flex flex-col justify-center"
              >
                <Textarea
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[20vh]"
                  placeholder="Write something..."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {step === 1 && (
              <Button variant="ghost" className="cursor-pointer" type="submit">
                Answer later
              </Button>
            )}
          </DialogClose>
          <Button
            disabled={!selectedMood}
            className="cursor-pointer"
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
          >
            {step === 1 ? "Continue" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
