import api from "./index";

export async function signUp(userObj) {
  const response = await api.post("/auth/sign-up", userObj);
  return response.data;
}