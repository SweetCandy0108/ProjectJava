import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const jwt = localStorage.getItem("jwt");
if (jwt) {
  api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default api;
