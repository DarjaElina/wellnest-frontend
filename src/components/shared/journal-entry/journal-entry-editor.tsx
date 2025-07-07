import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { JournalEntryEditorToolbar } from "@/components/shared/journal-entry/journal-entry-editor-toolbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "@/components/shared/date-time-picker.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect, useState, useRef } from "react";
import { setHours, setMinutes, setSeconds, format, formatISO9075 } from "date-fns";
import debounce from 'lodash.debounce';
import { type JournalEntry } from "@/types/journalEntry.types";
import { updateJournalEntry } from "@/services/journal-entry";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Check } from 'lucide-react';
import { getColorClass } from "@/lib/utils";
import type { RouteParams } from "@/types/shared.types";
import type { JournalColor } from "@/lib/color";


export function JournalEntryEditor({ journalColor }: { journalColor: JournalColor }) {
  const journalEntry = useSelector((state: RootState) => state.journal.currentEntry);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved'>('idle');

  const [entry, setEntry] = useState<JournalEntry>({
    content: '',
    entryDate: formatISO9075(new Date()),
    isFavorite: false,
    tags: [],
    id: ""
  });

  const queryClient = useQueryClient();
  const {journalId, entryId} = useParams<RouteParams>() as RouteParams;

  const mutateAndTrack = (updatedEntry: JournalEntry) => {
    setSyncStatus('syncing');
    updatedEntryMutation.mutate(updatedEntry, {
      onSuccess: (updatedEntry) => {
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2000);
        const journalEntries: JournalEntry[] = queryClient.getQueryData(['journalEntries', journalId]) ?? []
        const updatedEntries = journalEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
        queryClient.setQueryData(['journalEntries', journalId], updatedEntries)
      },
    });
  };

 

  const updatedEntryMutation = useMutation({
    mutationFn: (updatedEntry: JournalEntry) => updateJournalEntry(updatedEntry, journalId, entryId),
    onSuccess: (data) => {
      queryClient.setQueryData(['journalEntries', { id: data.id }], data);
    },
  });

  const debouncedUpdate = useRef(
    debounce((updatedEntry: JournalEntry) => {
      mutateAndTrack(updatedEntry);
    }, 3000)
  ).current;

  function mergeDateAndTime(date: Date, timeString: string): string {
    const [hours, minutes] = timeString.split(":").map(Number);
    const withHours = setHours(date, hours);
    const withMinutes = setMinutes(withHours, minutes);
    const finalDateTime = setSeconds(withMinutes, 0);
    return formatISO9075(finalDateTime);
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h2></h2><p></p>`,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none p-5',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
    
      setEntry((prev) => {
        const updated = { ...prev, content: html };
        debouncedUpdate(updated);
        return updated;
      });
    
      setSyncStatus('syncing');
    }
  });

  const updateEntryDate = (newDate: Date) => {
    const oldTime = format(new Date(entry.entryDate), "HH:mm");
    const merged = mergeDateAndTime(newDate, oldTime);
    setEntry((prev) => {
      const updated = { ...prev, entryDate: merged };
      mutateAndTrack(updated);
      return updated;
    });
  };

  const updateEntryTime = (newTime: string) => {
    const oldDate = new Date(entry.entryDate);
    const merged = mergeDateAndTime(oldDate, newTime);
    setEntry((prev) => {
      const updated = { ...prev, entryDate: merged };
      mutateAndTrack(updated);
      return updated;
    });
  };

  useEffect(() => {
    if (journalEntry) {
      setEntry(journalEntry);
      if (editor) {
        editor.commands.setContent(journalEntry.content);
      }
    }
  }, [journalEntry, editor]);

  return (
  <div className="p-6 max-w-3xl mx-auto bg-card rounded-xl shadow space-y-4">
    <div className="flex justify-between items-center">
      <DateTimePicker
        entryDate={new Date(entry.entryDate)}
        setEntryDate={(newDate) => updateEntryDate(newDate)}
        entryTime={format(new Date(entry.entryDate), "HH:mm")}
        setEntryTime={(newTime) => updateEntryTime(newTime)}
      />

      <AnimatePresence mode="wait">
        {syncStatus === 'syncing' && (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Cloud className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">Syncing...</span>
          </motion.div>
        )}

        {syncStatus === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-emerald-600"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">Saved!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <JournalEntryEditorToolbar/>

    <div
      className={`border bg-card rounded-xl shadow-sm p-4 transition-shadow focus-within:shadow-md`}
    >
      <EditorContent editor={editor} className="min-h-[60vh]" />
    </div>
  </div>

  );
}
