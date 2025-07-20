import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "@/services/user";
import { useIsDemo } from "@/context/demoContext";

export const useAuthQuery = () => {
  const isDemo = useIsDemo();
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    enabled: !isDemo,
  });
};
