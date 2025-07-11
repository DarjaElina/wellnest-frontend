import { Button } from "@/components/ui/button.tsx";
import { MoreVerticalIcon, Trash2, Download, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { FormattingButtons } from "./formatting-buttons";
import type { Editor } from "@tiptap/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournalEntry, toggleFavorite } from "@/services/journal-entry";
import { showErrorToast } from "@/helper/error";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEntry } from "@/reducers/journalReducer";
import type { JournalEntry } from "@/types/journalEntry.types";
import type { RouteParams } from "@/types/shared.types";
import type { RootState } from "@/store";
import { toast } from "sonner";

export function JournalEntryEditorToolbar({
  editor,
  tags,
}: {
  editor: Editor | null;
  tags: string[];
}) {
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;
  const entry = useSelector((state: RootState) => state.journal.currentEntry);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteMutation = useMutation({
    mutationFn: () => deleteJournalEntry(journalId, entryId),
    onSuccess: () => {
      queryClient.setQueryData<JournalEntry[]>(
        ["journalEntries", journalId],
        (oldEntries = []) => oldEntries.filter((e) => e.id !== entryId),
      );
      dispatch(setCurrentEntry(null));
      navigate(`/dashboard/journals/${journalId}`);
    },
    onError: showErrorToast,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(journalId, entryId),
    onSuccess: (updatedEntry) => {
      queryClient.setQueryData<JournalEntry[]>(
        ["journalEntries", journalId],
        (entries = []) =>
          entries.map((entry) =>
            entry.id === updatedEntry.id
              ? { ...entry, isFavorite: updatedEntry.isFavorite }
              : entry,
          ),
      );
      dispatch(setCurrentEntry(updatedEntry));
    },
    onError: showErrorToast,
  });

  if (!entry) {
    return null;
  }

  const handleDelete = () => {
    toast.warning("Are you sure you want to delete?", {
      action: {
        label: "Yes, Delete",
        onClick: () => deleteMutation.mutate(),
      },
    });
  };

  const handleToggleFavorite = () => {
    favoriteMutation.mutate();
  };
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
      <FormattingButtons editor={editor} tags={tags} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() => console.log("Exporting as PDF 🐸📄")}
            className="flex items-center gap-2 text-muted-foreground cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="flex items-center gap-2 text-destructive cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleToggleFavorite}
            className="flex items-center gap-2 text-foreground cursor-pointer"
          >
            {entry.isFavorite ? (
              <>
                <Star className="w-4 h-4 mr-1 text-yellow-400" /> Unfavorite
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-1" /> Mark Favorite
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
