import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const {mutateAsync} = useMutation({
      mutationFn: login,
      onSuccess: (response) => {
        console.log("response from login mutation", response);
      },
      onError: (res) => {
        console.log("error from login mutation", res);
      },
    });

    return [mutateAsync];
}