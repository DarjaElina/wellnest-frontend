import api from "./index";

export async function getAuthUser() {
  const response = await api.get("/user/me");
  return response.data;
}

export async function deleteUserAccount() {
  const response = await api.delete("/user/me");
  return response.data;
}
