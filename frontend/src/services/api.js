import axios from "axios";

const api = axios.create({
  baseURL: "https://sentinelx-ai-ufud.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;