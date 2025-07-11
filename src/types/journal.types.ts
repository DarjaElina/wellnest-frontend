import { z } from "zod";
import { JOURNAL_COLORS } from "@/lib/color";

const journalColorSchema = z.enum(JOURNAL_COLORS);

export const journalInputSchema = z.object({
  name: z.string().min(1, { message: "Journal name is required" }),
  color: journalColorSchema,
});

export const journalSchema = journalInputSchema.extend({
  id: z.string(),
  updatedAt: z.string(),
  journalEntries: z.array(z.string()).optional(),
});

export type JournalInput = z.infer<typeof journalInputSchema>;
export type Journal = z.infer<typeof journalSchema>;
