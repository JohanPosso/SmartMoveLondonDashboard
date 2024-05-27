import axios from "axios";

const api = axios.create({
  // baseURL: process.env.BACKEND_URI,
  baseURL: "https://smartmovelondondashboard-task.up.railway.app",
  withCredentials: false,
});
export default api;
