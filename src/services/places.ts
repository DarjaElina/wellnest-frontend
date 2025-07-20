import api from "./index";

export async function createPlace(formData: FormData) {
  const response = await api.post("/places", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
export async function getPlaces() {
  const response = await api.get("/places");
  return response.data;
}
