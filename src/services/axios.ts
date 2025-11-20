import axios from "axios";

// In dev we proxy `/api` to the backend (see `vite.config.ts`).
// Using a relative base avoids CORS in development.
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
