import {Button} from "@/components/ui/button.tsx";
import { MoreVerticalIcon, Trash2, Heart, Download } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export function JournalEditorToolbar() {
    return (
        <>
            <div className="flex justify-between items-center px-4 py-2 border-b bg-white shadow-sm mb-4">
                <div className="flex space-x-2">
                    <Button>H1</Button>
                    <Button>B</Button>
                    <Button>I</Button>
                    <Button>List</Button>
                </div>


                <div className="p-4 mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log("I saw you clicked the button! here is lil frog for u friend, 🐸")}>
                                <Download />
                                Export as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() =>console.log("I saw you clicked the button! here is lil frog for u friend, 🐸")}>
                                <Trash2/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("I saw you clicked the button! here is lil frog for u friend, 🐸")}>
                                <Heart/>
                                Favorite
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}