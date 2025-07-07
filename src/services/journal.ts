import api from "./index";

export async function getJournals() {
  const response = await api.get("/journals");
  return response.data;
}

export async function createJournal(data: any) {
  const response = await api.post("/journals", data);
  return response.data;
}

export async function getJournalById(id: string) {
  const response = await api.get(`/journals/${id}`)
  return response.data
}
