import { configureStore } from "@reduxjs/toolkit";
import journalReducer from "@/reducers/journalReducer";
import authReducer from '@/reducers/authReducer'

export const store = configureStore({
  reducer: {
    journal: journalReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
