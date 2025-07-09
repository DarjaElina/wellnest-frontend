import api from "./index";
import type { UserCreateInput, LoginInput } from "@/types/auth.types";

export async function signUp(userObj: UserCreateInput) {
  const response = await api.post("/auth/sign-up", userObj);
  return response.data;
}

export async function login({username, password}: LoginInput) {
  const response = await api.post("/auth/sign-in", {
    username,
    password
  })
  return response.data;
}