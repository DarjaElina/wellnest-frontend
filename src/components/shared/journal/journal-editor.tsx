import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button.tsx";
import { JournalEditorToolbar } from "@/components/shared/journal/journal-editor-toolbar.tsx";
import { useMutation } from "@tanstack/react-query";
import { createJournalEntry } from "@/services/journal-entry.ts";
import { Plus } from "lucide-react";
import { DateTimePicker } from "@/components/shared/date-time-picker.tsx";
import * as React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { setHours, setMinutes, setSeconds, format } from "date-fns";

export function JournalEditor() {
  const journalEntry = useSelector((state: RootState) => state.journal.currentEntry)
  const [entryDate, setEntryDate] = useState(new Date())
  const [entryTime, setEntryTime] = useState(format(new Date(), "HH:mm"))

  function mergeDateAndTime(date: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(":").map(Number);
    const withHours = setHours(date, hours);
    const withMinutes = setMinutes(withHours, minutes);
    const finalDateTime = setSeconds(withMinutes, 0);
    return finalDateTime;
  }
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
     <h2></h2>
     <p></p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg l:prose-l m-5 focus:outline-none',
      },
    }
  });
  const newEntryMutation = useMutation({ mutationFn: createJournalEntry });

  useEffect(() => {
    if (journalEntry && editor) {
      editor.commands.setContent(journalEntry.content)
    }
  }, [journalEntry, editor])

  useEffect(() => {
    if (journalEntry?.entryDate) {
      const dateObj = new Date(journalEntry.entryDate)
      setEntryDate(dateObj)
      setEntryTime(format(dateObj, "HH:mm"))
    }
  }, [journalEntry])

  const addJournalEntry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    const combinedDateTime = mergeDateAndTime(entryDate, entryTime);
  
    const journalEntry = {
      content: editor?.getHTML(),
      tags: ["Programming", "Java", "Healthy Lifestyle"],
      entryDate: format(combinedDateTime, "yyyy-MM-dd HH:mm:ss"),
      isFavorite: true,
    };
  
    try {
      newEntryMutation.mutate(journalEntry);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
      <DateTimePicker
        entryDate={entryDate}
        setEntryDate={setEntryDate}
        entryTime={entryTime}
        setEntryTime={setEntryTime}
      />
        <Button onClick={addJournalEntry}>
          <Plus size={20} />
        </Button>
      </div>

      <JournalEditorToolbar />
      <div className="border rounded-md shadow-sm p-3">
        <EditorContent editor={editor} className="min-h-[60vh]" />
      </div>
    </div>
  );
}
