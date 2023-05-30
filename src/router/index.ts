import { createRouter, createWebHistory } from "vue-router";
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
import AddDefectType from "@/views/AddDefectType.vue";
import DefectsTypes from "@/views/DefectsTypes.vue";
import Logging from "@/views/Logging.vue";
import Specializations from "@/views/Specializations.vue";
import AddSpecialization from "@/views/AddSpecialization.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Авторизация" },
  },
  {
    path: "/departaments/",
    name: "Departaments",
    component: Departaments,
    meta: { isAdminRoute: true, title: "Цеха" },
  },
  {
    path: "/departaments/add",
    name: "AddDepartament",
    component: AddDepartament,
    meta: { isAdminRoute: true, title: "Добавление цеха" },
  },
  {
    path: "/departaments/:id/edit",
    name: "EditDepartament",
    component: AddDepartament,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование цеха" },
  },
  {
    path: "/departaments/machines/",
    name: "LastDepartament",
    component: Departament,
    meta: { isAdminRoute: true, title: "Станки" },
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
    meta: { isAdminRoute: true, title: "Добавление станка" },
  },
  {
    path: "/machines/edit/:id",
    name: "EditMachine",
    component: AddMachine,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование станка" },
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
    meta: { isAdminRoute: true, title: "Добавление неисправности" },
  },
  {
    path: "/defects/:id/edit",
    name: "EditDefect",
    component: AddDefect,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование неисправности" },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { isAdminRoute: true, title: "Ответственные" },
  },
  {
    path: "/users/add",
    name: "AddUser",
    component: AddUser,
    meta: { isAdminRoute: true, title: "Добавление ответственного" },
  },
  {
    path: "/consumable-types",
    name: "ConsumableTypes",
    component: ConsumableTypes,
    meta: { isAdminRoute: true, title: "Типы комплектующих" },
  },
  {
    path: "/consumable-types/add",
    name: "AddConsumableType",
    component: AddConsumableType,
    meta: { isAdminRoute: true, title: "Добавление типа комплектующих" },
  },
  {
    path: "/consumable-types/:id/edit",
    name: "EditConsumableType",
    component: AddConsumableType,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование типа комплектующих" },
  },
  {
    path: "/consumables",
    name: "Consumables",
    component: Consumables,
    meta: { isAdminRoute: true, title: "Комплектующие" },
  },
  {
    path: "/consumables/add",
    name: "AddConsumable",
    component: AddConsumable,
    meta: { isAdminRoute: true, title: "Добавление комплектующего" },
  },
  {
    path: "/defect-types/",
    name: "DefectTypes",
    component: DefectsTypes,
    meta: { isAdminRoute: true, title: "Типы неисправностей" },
  },
  {
    path: "/defect-types/add",
    name: "AddDefectType",
    component: AddDefectType,
    meta: { isAdminRoute: true, title: "Добавление типа неисправностей" },
  },
  {
    path: "/defect-types/:id/edit",
    name: "EditDefectType",
    component: AddDefectType,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование типа неисправностей" },
  },
  {
    path: "/specializations/",
    name: "Specializations",
    component: Specializations,
    meta: { isAdminRoute: true, title: "Специальности" },
  },
  {
    path: "/specializations/add",
    name: "AddSpecialization",
    component: AddSpecialization,
    meta: { isAdminRoute: true, title: "Добавление специальности" },
  },
  {
    path: "/specializations/:id/edit",
    name: "EditSpecialization",
    component: AddSpecialization,
    props: { isEdit: true },
    meta: { isAdminRoute: true, title: "Редактирование специальности" },
  },
  {
    path: "/logging",
    name: "Logging",
    component: Logging,
    meta: { isAdminRoute: true, title: "Логирвание" },
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
