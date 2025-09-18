import axios from "axios";

// Определяем базовый URL для всех наших запросов к нашему Next.js серверу
const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true, // важно для cookies (refresh / access token)
});
