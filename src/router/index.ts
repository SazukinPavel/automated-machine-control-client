import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import Departament from "@/views/Departament.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/departament",
    name: "Departament",
    component: Departament,
    meta: { isUserRoute: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { isAdminRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
