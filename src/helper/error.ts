import { AxiosError } from "axios";
import { toast } from "sonner";

export function showErrorToast(error: unknown) {
  if (error instanceof AxiosError)
    toast.error(error.response?.data?.message ?? "Something went wrong", {
      description: error.response?.data?.details,
    });
}
