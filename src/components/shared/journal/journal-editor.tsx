import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button.tsx'
import {JournalEditorToolbar} from "@/components/shared/journal/journal-editor-toolbar.tsx";

export function JournalEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start writing your thoughts here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
    })

    const handleSave = () => {
      console.log("saved!!... i guess? 🧐")
    }

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">New Journal Entry</h2>
                <Button onClick={handleSave}>Save</Button>
            </div>

            <JournalEditorToolbar/>
            <div className="border rounded-md shadow-sm p-6">
                <EditorContent editor={editor} className="min-h-[60vh]" />
            </div>
        </div>
    )
}
