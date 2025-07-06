import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button.tsx";
import { JournalEntryEditorToolbar } from "@/components/shared/journal-entry/journal-entry-editor-toolbar";
import { useMutation } from "@tanstack/react-query";
import { createJournalEntry } from "@/services/journal-entry.ts";
import { Plus } from "lucide-react";
import { DateTimePicker } from "@/components/shared/date-time-picker.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { setHours, setMinutes, setSeconds, format } from "date-fns";
import debounce from 'lodash.debounce'
import { type JournalEntry } from "@/types/journal.types";
import { formatISO9075 } from "date-fns";

export function JournalEntryEditor() {
  const journalEntry = useSelector((state: RootState) => state.journal.currentEntry)
  const [entryDate, setEntryDate] = useState(new Date())
  const [entryTime, setEntryTime] = useState(format(new Date(), "HH:mm"))
  const [newEntry, setNewEntry] = useState<JournalEntry | null>({
    content: '',
    entryDate: mergeDateAndTime(entryDate, entryTime),
    isFavorite: false,
    tags: []
  })
  
  function mergeDateAndTime(date: Date, timeString: string): string {
    const [hours, minutes] = timeString.split(":").map(Number);
    const withHours = setHours(date, hours);
    const withMinutes = setMinutes(withHours, minutes);
    const finalDateTime = setSeconds(withMinutes, 0);
    return formatISO9075(finalDateTime);
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
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      if (!journalEntry) {
        saveContent(html)
      }
    },
  });
  const newEntryMutation = useMutation({ mutationFn: createJournalEntry });

  useEffect(() => {
    if (journalEntry) {
      setNewEntry({
        content: journalEntry.content,
        entryDate: journalEntry.entryDate,
        isFavorite: journalEntry.isFavorite,
        tags: journalEntry.tags
      })

      const dateObj = new Date(journalEntry.entryDate)
      setEntryDate(dateObj)
      setEntryTime(format(dateObj, "HH:mm"))

      if (editor) {
        editor.commands.setContent(journalEntry.content)
      }
    }
  }, [journalEntry, editor])


  const saveContent = debounce((content: string) => {
    newEntryMutation.mutate({ ...newEntry, content })
  }, 3000) 
  

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
      <DateTimePicker
        entryDate={entryDate}
        setEntryDate={setEntryDate}
        entryTime={entryTime}
        setEntryTime={setEntryTime}
      />
        <Button onClick={() => console.log("adding new entry! hehe")}>
          <Plus size={20} />
        </Button>
      </div>

      <JournalEntryEditorToolbar />
      <div className="border rounded-md shadow-sm p-3">
        <EditorContent editor={editor} className="min-h-[60vh]" />
      </div>
    </div>
  );
}
