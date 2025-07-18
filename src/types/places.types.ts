import { z } from "zod";

export const placeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  note: z.string().optional(),
  image: z
    .any()
    .refine((files) => files?.length === 0 || files?.[0]?.size < 5_000_000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (files) =>
        files?.length === 0 ||
        ["image/jpeg", "image/png", "image/jpg"].includes(files?.[0]?.type),
      {
        message: "File format must be jpg, jpeg or png.",
      }
    )
    .optional(),
});

export type PlaceInput = z.infer<typeof placeSchema>;
export type Place = z.infer<typeof placeSchema> & {
  lat: number;
  lng: number;
  id?: string;
  imageUrl?: string;
}
