import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.BACKEND_URI,
  withCredentials: false,
=======
  baseURL: "https://smartmovelondondashboard-task.up.railway.app",
     withCredentials: false,
>>>>>>> 3e0f39eb2e2bc3245c4614909631bd9738bded66
});
export default api;
