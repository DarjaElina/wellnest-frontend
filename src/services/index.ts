import axios from "axios";
import { BACKEND_URL } from "@/config";

const api = axios.create({
  baseURL: BACKEND_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
