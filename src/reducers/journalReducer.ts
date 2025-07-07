import { createSlice } from "@reduxjs/toolkit";
import type { JournalEntry } from "@/types/journalEntry.types";

interface StateProp {
  currentEntry: JournalEntry | null;
}

const initialState: StateProp = {
  currentEntry: null,
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setCurrentEntry(state, action) {
      state.currentEntry = action.payload;
    },
  },
});

export const { setCurrentEntry } = journalSlice.actions;
export default journalSlice.reducer;
