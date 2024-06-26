// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue"; // Asegúrate de importar tu layout principal
import Dashboard from "../views/Dashboard.vue";
import Empleados from "../views/Empleados.vue";
import Billing from "../views/Billing.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Prueba from "../views/Prueba.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/prueba",
    name: "prueba",
    component: Prueba,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/empleados",
        name: "Tables",
        component: Empleados,
        meta: { requiresAuth: true },
      },
      {
        path: "/tareas",
        name: "Tareas",
        component: Billing,
        meta: { requiresAuth: true },
      },
      {
        path: "/registrar",
        name: "Registrar",
        component: Profile,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const tokenInfo = JSON.parse(localStorage.getItem("token"));
  const isAuthenticated =
    tokenInfo?.token && tokenInfo?.expiresAt <= Date.now();

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
