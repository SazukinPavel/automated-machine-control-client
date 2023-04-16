import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Departament from "@/views/Departament.vue";
import AddMachine from "@/views/AddMachine.vue";
import AddDepartament from "@/views/AddDepartament.vue";
import Departaments from "@/views/Departaments.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/departaments/",
    name: "Departaments",
    component: Departaments,
    meta: { isAdminRoute: true },
  },
  {
    path: "/departaments/add",
    name: "AddDepartament",
    component: AddDepartament,
    meta: { isAdminRoute: true },
  },
  {
    path: "/departaments/:id/edit",
    name: "EditDepartament",
    component: AddDepartament,
    props: { isEdit: true },
    meta: { isAdminRoute: true },
  },
  {
    path: "/departaments/machines/",
    name: "LastDepartament",
    component: Departament,
    meta: { isAdminRoute: true },
  },
  {
    path: "/departaments/:id/machines",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
