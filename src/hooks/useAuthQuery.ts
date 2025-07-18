import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "@/services/user";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
};
