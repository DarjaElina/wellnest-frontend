import type { UserSettings } from "@/types/settings.types";
import api from "./index";

export async function getAuthUser() {
  const response = await api.get("/user/me");
  return response.data;
}

export async function deleteUserAccount() {
  const response = await api.delete("/user/me");
  return response.data;
}

export async function getRemoteSettings(): Promise<UserSettings> {
  const response = await api.get("/user/settings");
  return response.data;
}

export async function updateRemoteSettings(settings: UserSettings) {
  const response = await api.put("/user/settings", settings);
  return response.data;
}
