import { createContext, useContext } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTodayMoodEntry } from "@/services/moodEntry";
import type { MoodType } from "@/types/mood.types";

type MoodContextType = Pick<
  UseQueryResult<MoodType>,
  "data" | "isLoading" | "isError"
>;

const MoodContext = createContext<MoodContextType | null>(null);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};

export const MoodProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todayMood"],
    queryFn: getTodayMoodEntry,
  });

  return (
    <MoodContext.Provider value={{ data, isLoading, isError }}>
      {children}
    </MoodContext.Provider>
  );
};
