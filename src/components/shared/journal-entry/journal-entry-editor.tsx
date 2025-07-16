import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { JournalEntryEditorToolbar } from "@/components/shared/journal-entry/journal-entry-editor-toolbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "@/components/shared/date-time-picker.tsx";
import { useEffect, useState, useRef } from "react";
import {
  setHours,
  setMinutes,
  setSeconds,
  format,
  formatISO9075,
} from "date-fns";
import debounce from "lodash.debounce";
import { type JournalEntry } from "@/types/journalEntry.types";
import { updateJournalEntry } from "@/services/journalEntry";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Check, Hash } from "lucide-react";
import type { RouteParams } from "@/types/shared.types";
import { db } from "@/lib/db";
import { saveToLocal } from "@/lib/utils";
import { textColorMap } from "@/lib/journalColor";

export function JournalEntryEditor({
  journalEntry,
}: {
  journalEntry: JournalEntry;
}) {
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "saved">(
    "idle",
  );

  const [entry, setEntry] = useState<JournalEntry>({
    content: "<h2></h2><p></p>",
    entryDate: formatISO9075(new Date()),
    isFavorite: false,
    tags: [],
    id: "",
    color: "",
    journalId: ""
  });

  const queryClient = useQueryClient();

  const { journalId } = useParams<RouteParams>() as RouteParams;

  const mutateAndTrack = (updatedEntry: JournalEntry) => {
    updatedEntryMutation.mutate(updatedEntry, {
      onSuccess: (updatedEntry) => {
        setSyncStatus("saved");
        setTimeout(() => setSyncStatus("idle"), 2000);
        queryClient.setQueriesData<JournalEntry[]>({
          queryKey: ["journalEntries"],
        }, (entries = []) =>
          entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
        )} 
    });
    setSyncStatus("syncing");
  };

  const updatedEntryMutation = useMutation({
    mutationFn: (updatedEntry: JournalEntry) =>
      updateJournalEntry(updatedEntry),
  });

  const debouncedUpdate = useRef(
    debounce((updatedEntry: JournalEntry) => {
      mutateAndTrack(updatedEntry);
    }, 3000),
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
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none p-5",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      const updated = { ...entry, content: html };
      setEntry(updated);
      saveToLocal(updated, journalId);
      debouncedUpdate(updated);
      setSyncStatus("syncing");
    },
  });

  const updateEntryDate = async (newDate: Date) => {
    const oldTime = format(new Date(entry.entryDate), "HH:mm");
    const merged = mergeDateAndTime(newDate, oldTime);

    const updated = { ...entry, entryDate: merged };

    setEntry(updated);
    await saveToLocal(updated, journalId);
    mutateAndTrack(updated);
  };

  const updateEntryTime = async (newTime: string) => {
    const oldDate = new Date(entry.entryDate);
    const merged = mergeDateAndTime(oldDate, newTime);

    const updated = { ...entry, entryDate: merged };

    setEntry(updated);
    await saveToLocal(updated, journalId);
    mutateAndTrack(updated);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const local = await db.journalEntries.get(journalEntry.id);

      if (!cancelled && local) {
        setEntry(local);
        editor?.commands.setContent(local.content);
      } else if (journalEntry) {
        setEntry(journalEntry);
        editor?.commands.setContent(journalEntry.content);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [editor, journalEntry]);

  const handleRemoveTag = async (tagToRemove: string) => {
    const newTags = entry.tags.filter((tag) => tag !== tagToRemove);
    const updated = { ...entry, tags: newTags };

    setEntry(updated);
    await saveToLocal(updated, journalId);

    mutateAndTrack(updated);
  };

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
          {syncStatus === "syncing" && (
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

          {syncStatus === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-brand-primary"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
              <span className="text-sm">Saved!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <JournalEntryEditorToolbar editor={editor} entry={entry} />

      <div
        className={`border bg-card rounded-xl shadow-sm p-4 transition-shadow focus-within:shadow-md`}
      >
        <EditorContent editor={editor} className="min-h-[55vh]" />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 text-sm rounded bg-muted text-muted-foreground"
          >
            <Hash className={`${textColorMap[entry.color]}`}/> {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-destructive focus:outline-none cursor-pointer"
              title="Remove tag"
              type="button"
            >
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
