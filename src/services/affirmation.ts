import type { AffirmationCategory } from "@/types/affirmation.types";
import api from "./index";

export async function getAffirmationsPreview() {
  const response = await api.get("/affirmations/preview");
  return response.data;
}

export async function getAffirmationOfTheDay(params?: {
  category?: AffirmationCategory;
}) {
  const response = await api.get("/affirmations/affirmation-of-the-day", {
    params
  })
  return response.data;
}