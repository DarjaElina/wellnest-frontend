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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export function JournalEntryEditorToolbar() {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
      <div className="flex gap-2">
        {[
          { label: "H1", icon: Heading1 },
          { label: "Bold", icon: Bold },
          { label: "Italic", icon: Italic },
          { label: "List", icon: List },
        ].map(({ label, icon: Icon }) => (
          <Button
            key={label}
            size="sm"
            variant="outline"
            className="cursor-pointer"
          >
            <Icon className="w-4 h-4 mr-1" />
            {label}
          </Button>
        ))}
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
