import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URI,
  // withCredentials: false,
});
export default api;
