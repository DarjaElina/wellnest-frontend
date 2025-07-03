import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button.tsx'

export function JournalEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start writing your thoughts here...</p>',
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

            <div className="prose prose-neutral max-w-none border rounded p-4">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
