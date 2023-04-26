import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Departament from "@/views/Departament.vue";
import AddMachine from "@/views/AddMachine.vue";
import AddDepartament from "@/views/AddDepartament.vue";
import Departaments from "@/views/Departaments.vue";
import MachinesDefects from "@/views/MachinesDefects.vue";
import AddDefect from "@/views/AddDefect.vue";
import Users from "@/views/Users.vue";
import AddUser from "@/views/AddUser.vue";
import ConsumableTypes from "@/views/ConsumableTypes.vue";
import AddConsumableType from "@/views/AddConsumableType.vue";
import AddConsumable from "@/views/AddConsumable.vue";
import Consumables from "@/views/Consumables.vue";

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
  {
    path: "/machines/:id/defects",
    name: "MachinesDefects",
    component: MachinesDefects,
    meta: { isAdminRoute: true },
  },
  {
    path: "/defects/add",
    name: "AddDefect",
    component: AddDefect,
    meta: { isAdminRoute: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { isAdminRoute: true },
  },
  {
    path: "/users/add",
    name: "AddUser",
    component: AddUser,
    meta: { isAdminRoute: true },
  },
  {
    path: "/types",
    name: "ConsumableTypes",
    component: ConsumableTypes,
    meta: { isAdminRoute: true },
  },
  {
    path: "/types/add",
    name: "AddConsumableType",
    component: AddConsumableType,
    meta: { isAdminRoute: true },
  },
  {
    path: "/types/:id/edit",
    name: "EditConsumableType",
    component: AddConsumableType,
    props: { isEdit: true },
    meta: { isAdminRoute: true },
  },
  {
    path: "/consumables",
    name: "Consumables",
    component: Consumables,
    meta: { isAdminRoute: true },
  },
  {
    path: "/consumables/add",
    name: "AddConsumable",
    component: AddConsumable,
    meta: { isAdminRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
