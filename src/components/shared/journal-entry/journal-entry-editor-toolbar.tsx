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
import { deleteJournalEntry, toggleFavorite } from "@/services/journalEntry";
import { showErrorToast } from "@/helper/error";
import { useNavigate, useParams } from "react-router";
import type { JournalEntry } from "@/types/journalEntry.types";
import type { RouteParams } from "@/types/shared.types";
import { toast } from "sonner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { JournalEntryPdf } from "../journal-entry-pdf";
import { db } from "@/lib/db";
import { formatISO9075 } from "date-fns";

export function JournalEntryEditorToolbar({
  editor,
  entry,
}: {
  editor: Editor | null;
  entry: JournalEntry;
}) {
  const { journalId, entryId } = useParams<RouteParams>() as RouteParams;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: () => deleteJournalEntry(entryId),
    onSuccess: async () => {
      queryClient.setQueriesData<JournalEntry[]>({
        queryKey: ["journalEntries"],
      }, (oldEntries = []) => oldEntries.filter((e) => e.id !== entryId))
    },
    onError: showErrorToast,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(entryId),
    onSuccess: async (updatedEntry) => {
      queryClient.setQueryData<JournalEntry[]>(
        ["journalEntry", updatedEntry],
        (entries = []) =>
          entries.map((entry) =>
            entry.id === updatedEntry.id
              ? { ...entry, isFavorite: updatedEntry.isFavorite }
              : entry,
          ),
      );
      queryClient.setQueryData(["journalEntry", updatedEntry.id],
        (entry: JournalEntry) => {
          return {...entry, favorite: updatedEntry.favorite}
        }
      )
    },
    onError: showErrorToast,
  });

  const handleDelete = async () => {
    toast("Are you sure you want to delete?", {
      action: {
        label: "Yes, Delete",
        onClick: async () => {
          await db.journalEntries.delete(entryId);

          navigate(`/dashboard/journals/${journalId}`);

          deleteMutation.mutate();
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("cancelled"),
      },
    });
  };

  const handleToggleFavorite = async () => {
    await db.journalEntries.update(entryId, {
      isFavorite: !entry.isFavorite,
      needsSync: true,
      updatedAt: formatISO9075(new Date()),
    });
    favoriteMutation.mutate();
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
      <FormattingButtons editor={editor} tags={entry.tags} color={entry.color}/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <PDFDownloadLink
            document={
              <JournalEntryPdf
                title={"Journal Entry"}
                date={new Date(entry.entryDate).toLocaleDateString()}
                content={entry.content}
              />
            }
            fileName="journal-entry.pdf"
          >
            {({ loading }) =>
              loading ? (
                <span className="text-sm text-muted-foreground">
                  Preparing PDF…
                </span>
              ) : (
                <DropdownMenuItem className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <Download className="w-4 h-4" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
              )
            }
          </PDFDownloadLink>
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
