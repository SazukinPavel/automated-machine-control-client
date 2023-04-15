import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import Departament from "@/views/Departament.vue";
import AddMachine from "@/views/AddMachine.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/departaments/",
    name: "LastDepartament",
    component: Departament,
    meta: { isAdminRoute: true },
  },
  {
    path: "/departaments/:id",
    name: "Departament",
    component: Departament,
    meta: { isAdminRoute: true },
  },
  {
    path: "/machines/add",
    name: "AddMachine",
    component: AddMachine,
    meta: { isAdminRoute: true },
  },
  {
    path: "/machines/edit/:id",
    name: "EditMachine",
    component: AddMachine,
    props: { isEdit: true },
    meta: { isAdminRoute: true },
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
