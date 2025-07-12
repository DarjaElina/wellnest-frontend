import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoodPicker } from "./mood-picker";
import { useEffect, useState } from "react";
import type { MoodType } from "@/types/mood.types";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Form } from "../ui/form";
import {useMutation} from '@tanstack/react-query'
import { createMoodEntry } from "@/services/moodEntry";

export function MoodPopup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [open, setOpen] = useState(false);

  const fakeIsOpenFromUserSettings = true;
  const userHasAlreadySubmittedTheEntryForToday = false;

  useEffect(() => {
    if (fakeIsOpenFromUserSettings && !userHasAlreadySubmittedTheEntryForToday)
      setOpen(fakeIsOpenFromUserSettings)
  }, [fakeIsOpenFromUserSettings, userHasAlreadySubmittedTheEntryForToday])

  const form = useForm<{note: string}>({
    defaultValues: {
      note: ""
    }
  })

  const newMoodEntryMutation = useMutation({
    mutationFn: createMoodEntry,
    onSuccess: (data) => {
      console.log(data)
    },
  });

  useEffect(() => {
    if (selectedMood) {
     setStep(2);
    }
  }, [selectedMood])

  const onSubmit = async (values: {note: string}) => {
    const { note} = values;
    try {
      const moodEntry = await newMoodEntryMutation.mutateAsync({
       note,
       ...selectedMood
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Hello, Anna!❤️"  : "User Message Placeholder"}</DialogTitle>
          <DialogDescription>{step === 1 ? "How are you feeling today?" : "Would you like to leave a note?"}</DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MoodPicker value={selectedMood} onChange={setSelectedMood} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <Textarea {...form.register("note")} />

                <DialogFooter>
                  <Button className="cursor-pointer" type="submit">Save</Button>
                </DialogFooter>
              </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
