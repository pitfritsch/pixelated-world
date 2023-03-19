import axios from "axios";

const api = axios.create({
  baseURL: "/pixelencounter",
});

export default api;
