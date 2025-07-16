import { db } from "@/lib/db";
import { createJournalEntry } from "@/services/journalEntry";
import type { JournalEntry, LocalJournalEntry } from "@/types/journalEntry.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export function useCreateEntry() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entry: LocalJournalEntry) => createJournalEntry(entry),
    onSuccess: async (data) => {
      const { id: realId, clientId, journalId } = data;

      const local = await db.journalEntries.get(clientId);
      if (!local) return;

      const updatedEntry = {
        ...local,
        id: realId,
        needsSync: false,
      };

      await db.journalEntries.delete(clientId);
      await db.journalEntries.put(updatedEntry);

      queryClient.setQueryData<JournalEntry[]>(
        ["journalEntries", journalId],
        (old = []) =>
          old.map((entry) =>
            entry.id === clientId ? updatedEntry : entry
          ),
      );

      navigate(`/dashboard/journals/${journalId}/${realId}`);
    },
    onError: (err) => {
      console.error("Failed to sync with backend:", err);
    },
  });
}
