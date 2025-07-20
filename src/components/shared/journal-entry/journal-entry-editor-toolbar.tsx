import { Button } from "@/components/ui/button.tsx";
import { MoreVerticalIcon, Trash2, Download, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.tsx";
import { FormattingButtons } from "./formatting-buttons";
import type { Editor } from "@tiptap/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournalEntry, toggleFavorite } from "@/services/journalEntry";
import { showErrorToast } from "@/helper/error";
import { useNavigate, useParams } from "react-router";
import type { JournalEntry } from "@/types/journalEntry.types";
import type { RouteParams } from "@/types/shared.types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { JournalEntryPdf } from "../journal-entry-pdf";
import { db } from "@/lib/db";
import { formatISO9075 } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      queryClient.setQueriesData<JournalEntry[]>(
        {
          queryKey: ["journalEntries"],
        },
        (oldEntries = []) => oldEntries.filter((e) => e.id !== entryId),
      );
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
      queryClient.setQueryData(
        ["journalEntry", updatedEntry.id],
        (entry: JournalEntry) => {
          return { ...entry, favorite: updatedEntry.favorite };
        },
      );
    },
    onError: showErrorToast,
  });

  const handleDelete = async () => {
    await db.journalEntries.delete(entryId);

    navigate(`/dashboard/journals/${journalId}`);

    deleteMutation.mutate();
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
    <div className="flex flex-wrap justify-between items-center px-4 py-3 rounded-md bg-card border shadow-sm mb-4">
      <FormattingButtons
        editor={editor}
        tags={entry.tags}
        color={entry.color}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <MoreVerticalIcon className="w-7 h-7 text-neutral-100" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {entry && (
            <PDFDownloadLink
              document={
                <JournalEntryPdf
                  title="Journal Entry"
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
                  <DropdownMenuItem className="cursor-pointer">
                    <Download className="mr-2 w-4 h-4" />
                    Export as PDF
                  </DropdownMenuItem>
                )
              }
            </PDFDownloadLink>
          )}

          <DropdownMenuItem
            onClick={handleToggleFavorite}
            className="cursor-pointer"
          >
            {entry.isFavorite ? (
              <>
                <Star className="mr-2 w-4 h-4 text-yellow-400" /> Unfavorite
              </>
            ) : (
              <>
                <Star className="mr-2 w-4 h-4 text-foreground" /> Mark Favorite
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full justify-start cursor-pointer"
                variant="ghost"
              >
                <Trash2 className="w-4 h-4 mr-2 text-destructive" /> Delete
                entry
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={deleteMutation.isPending}
                  className="cursor-pointer"
                  onClick={handleDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
