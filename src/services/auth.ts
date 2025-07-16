import api from "./index";
import type { UserCreateInput, LoginInput } from "@/types/auth.types";

export async function signUp(userObj: UserCreateInput) {
  const response = await api.post("/auth/sign-up", userObj);
  return response.data;
}

export async function login({ username, password }: LoginInput) {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  return response.data;
}

export async function getAuthUser() {
  const response = await api.get("/user/me");
  console.log("ME IS", response);
  return response.data;
}

export async function logout() {
  return api.post("/auth/logout", null, { withCredentials: true });
}
