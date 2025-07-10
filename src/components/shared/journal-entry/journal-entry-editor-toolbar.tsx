import { Button } from "@/components/ui/button.tsx";
import { MoreVerticalIcon, Trash2, Heart, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { FormattingButtons } from "./formatting-buttons";
import type { Editor } from "@tiptap/react";

export function JournalEntryEditorToolbar({ editor, tags }: {editor: Editor | null; tags: string[] }) {
  return (
    
    <div className="flex justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
      <FormattingButtons editor={editor} tags={tags}/>
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
