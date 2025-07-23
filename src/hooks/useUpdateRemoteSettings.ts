import { updateRemoteSettings } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSettings } from "@/context/settingsContext";
import type { UserSettings } from "@/types/settings.types";
import { showErrorToast } from "@/helper/error";

export function useUpdateRemoteSettings() {
  const queryClient = useQueryClient();
  const { settings } = useSettings();

  return useMutation({
    mutationFn: (partial: Partial<UserSettings>) => {
      const updated = { ...settings, ...partial };
      return updateRemoteSettings(updated);
    },
    onSuccess: async (updatedSettings) => {
      queryClient.setQueryData(["settings"], updatedSettings);
    },
    onError: (err) => {
      showErrorToast(err);
    },
  });
}
