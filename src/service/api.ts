import axios from "axios";

const api = axios.create({
  baseURL: "http://app.pixelencounter.com/api/basic",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default api;
