import { z } from "zod";
import { JOURNAL_COLORS } from "@/lib/color";

const journalColorSchema = z.enum(JOURNAL_COLORS);

export const journalCreateSchema = z.object({
  name: z.string().min(1, { message: "Journal name is required" }),
  color: journalColorSchema,
});

export const journalSchema = journalCreateSchema.extend({
  id: z.string(),
  updatedAt: z.string(),
  journalEntries: z.array(z.string()).optional(),
});

export type JournalCreateInput = z.infer<typeof journalCreateSchema>;
export type Journal = z.infer<typeof journalSchema>;
