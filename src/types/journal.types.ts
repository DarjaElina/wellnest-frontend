export interface JournalEntry {
  id?: string;
  content: string;
  tags: string[];
  entryDate: string;
  isFavorite: boolean;
}