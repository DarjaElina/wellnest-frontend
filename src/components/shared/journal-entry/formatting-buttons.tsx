import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagsDialog } from "../tags/tags-dialog";
import type { Editor } from "@tiptap/react";
export function FormattingButtons({
  editor,
  tags,
  color,
}: {
  editor: Editor | null;
  tags: string[];
  color: string;
}) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4 mr-1" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4 mr-1" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4 mr-1" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4 mr-1" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Button>

      <TagsDialog initialTags={tags} color={color} />
    </div>
  );
}
