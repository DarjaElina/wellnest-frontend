import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { placeSchema, type Place, type PlaceInput } from "@/types/places.types";
import { DialogDescription } from "@radix-ui/react-dialog";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createPlace } from "@/services/places";
import { showErrorToast } from "@/helper/error";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface LocationDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onCancel: () => void;
  lat: number;
  lng: number;
}

export default function LocationDialog({ dialogOpen, setDialogOpen, onCancel, lat, lng }: LocationDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      title: "",
      note: "",
      image: undefined,
    },
  });

  const imageFile = form.watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const placeMutation = useMutation({
    mutationFn: createPlace,
    onSuccess: (newPlace: Place) => {
      toast("Place saved successfully!");
      const places: Place[] = queryClient.getQueryData(["places"]) ?? [];
      queryClient.setQueryData(["places"], places.concat(newPlace));
      form.reset();
      setDialogOpen(false);

    },
    onError: (e) => {
      showErrorToast(e);
    }
  })

  const submitHandler = async (data: PlaceInput) => {
    const formData = new FormData();
  
    formData.append("title", data.title);
    formData.append("note", data.note || "");
  
    const file = data.image?.[0];
    if (file) {
      formData.append("image", file);
    }
  
    formData.append("lat", lat.toString());
    formData.append("lng", lng.toString());
  
    await placeMutation.mutateAsync(formData);
  };
  

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Place</DialogTitle>
          <DialogDescription className="sr-only">Create place with photo, title and note</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo (optional)</FormLabel>
                  <FormControl>
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-foreground"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-foreground">SVG, PNG, JPG (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          {imagePreview && (
            <div className="relative inline-block bg-card rounded-lg max-w-40 p-5">
                <Button className="absolute top-1 right-1 cursor-pointer" variant="ghost" onClick={() => setImagePreview(null)}>
                  <X/>
                </Button>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full object-contain rounded-md"
              />
            </div>
          )}

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button className="cursor-pointer" variant="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="cursor-pointer" type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
