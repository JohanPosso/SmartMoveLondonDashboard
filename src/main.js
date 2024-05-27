import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
// import './registerServiceWorker'

axios.defaults.baseURL = process.env.BACKEND_URI;
axios.defaults.withCredentials = true;

const appInstance = createApp(App);
appInstance.config.globalProperties.$axios = axios;

appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
