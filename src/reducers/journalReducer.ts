import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentEntry: null
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setCurrentEntry(state, action) {
      state.currentEntry = action.payload
    }
  }
})

export const { setCurrentEntry } = journalSlice.actions
export default journalSlice.reducer