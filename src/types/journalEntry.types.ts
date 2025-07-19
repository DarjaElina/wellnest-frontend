import { z } from "zod";

export const journalEntryCreateSchema = z.object({
  content: z.string(),
  tags: z.array(z.string()),
  entryDate: z.string(),
  isFavorite: z.boolean(),
});

export const journalEntrySchema = journalEntryCreateSchema.extend({
  id: z.string(),
});

export type JournalEntryCreateInput = z.infer<typeof journalEntryCreateSchema>;
export type JournalEntry = z.infer<typeof journalEntrySchema> & {
  color: string;
  journalId: string;
  updatedAt: string;
  clientId: string;
};

export type LocalJournalEntry = JournalEntry & {
  needsSync: boolean;
  markedForDeletion?: boolean;
  color: string;
};
