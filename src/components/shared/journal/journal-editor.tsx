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
import { useEffect } from "react";

export function JournalEditor() {
  const journalEntry = useSelector((state: RootState) => state.journal.currentEntry)
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

  const addJournalEntry = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const journalEntry = {
      title: "Example Title",
      content: editor?.getHTML(),
      tags: ["Programming", "Java", "Healthy Lifestyle"],
      entryDate: "2020-05-01 00:00:00",
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
        <DateTimePicker />
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
