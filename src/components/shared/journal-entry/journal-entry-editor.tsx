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
import { type JournalEntry } from "@/types/journal.types";
import { updateJournalEntry } from "@/services/journal-entry";
import { useParams, Navigate } from "react-router-dom";

export function JournalEntryEditor() {
  const journalEntry = useSelector((state: RootState) => state.journal.currentEntry);

  const [entry, setEntry] = useState<JournalEntry>({
    content: '',
    entryDate: formatISO9075(new Date()),
    isFavorite: false,
    tags: [],
    id: ""
  });

  const queryClient = useQueryClient();
  const {journalId, entryId} = useParams();

 

  const updatedEntryMutation = useMutation({
    mutationFn: (updatedEntry: JournalEntry) => updateJournalEntry(updatedEntry, journalId, entryId),
    onSuccess: (data) => {
      queryClient.setQueryData(['journalEntries', { id: data.id }], data);
    },
  });

  const debouncedUpdate = useRef(
    debounce((updatedEntry: JournalEntry) => {
      updatedEntryMutation.mutate(updatedEntry);
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
        class: 'prose prose-sm sm:prose-base lg:prose-lg l:prose-l m-5 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();

      setEntry((prev) => {
        const updated = { ...prev, content: html };
        debouncedUpdate(updated);
        return updated;
      });
    },
  });

  useEffect(() => {
    if (journalEntry) {
      setEntry(journalEntry);

      const dateObj = new Date(journalEntry.entryDate);
      if (editor) {
        editor.commands.setContent(journalEntry.content);
      }
    }
  }, [journalEntry, editor]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <DateTimePicker
          entryDate={new Date(entry.entryDate)}
          setEntryDate={(newDate) => {
            const oldTime = format(new Date(entry.entryDate), "HH:mm");
            const merged = mergeDateAndTime(newDate, oldTime);
            setEntry((prev) => {
              const updated = { ...prev, entryDate: merged };
              debouncedUpdate(updated);
              return updated;
            });
          }}
          entryTime={format(new Date(entry.entryDate), "HH:mm")}
          setEntryTime={(newTime) => {
            const oldDate = new Date(entry.entryDate);
            const merged = mergeDateAndTime(oldDate, newTime);
            setEntry((prev) => {
              const updated = { ...prev, entryDate: merged };
              debouncedUpdate(updated);
              return updated;
            });
          }}
        />
      </div>

      <JournalEntryEditorToolbar />

      <div className="border rounded-md shadow-sm p-3">
        <EditorContent editor={editor} className="min-h-[60vh]" />
      </div>
    </div>
  );
}
