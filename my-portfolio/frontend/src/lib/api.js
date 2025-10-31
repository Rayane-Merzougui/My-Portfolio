import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api.php", // ← CHANGER ICI
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
