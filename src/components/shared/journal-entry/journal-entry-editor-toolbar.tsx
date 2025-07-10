import { Button } from "@/components/ui/button.tsx";
import {
  MoreVerticalIcon,
  Trash2,
  Heart,
  Download,
  Heading1,
  Bold,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export function JournalEntryEditorToolbar({ editor }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
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
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() => console.log("Exporting as PDF 🐸📄")}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Download className="w-4 h-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Deleting entry 🐸🗑️")}
            className="flex items-center gap-2 text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Favoriting entry 🐸💖")}
            className="flex items-center gap-2 text-foreground"
          >
            <Heart className="w-4 h-4" />
            <span>Favorite</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
