<template>
  <div ref="menu">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
      <v-list-item nav>
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
        <v-list-item-title class="text-h6 text-center">Меню</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-h6">Станки</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="item in departamnetsRoutes"
            :key="item.title"
            :value="item.title"
            @click="goTo(item.routeName, item.params)"
          >
            <v-list-item-title
              :class="`text-subtitle-1 ${!rail && 'text-wrap'}`"
              >{{ item.title }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="add" @click="goTo('AddDepartament')">
            <v-list-item-title class="text-xl-subtitle-1 text-center"
              >Добавить цех
              <v-icon>mdi-plus</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :value="item.title"
          @click="goTo(item.routeName, item.params)"
          :active="isActive(item.routeName)"
        >
          <v-list-item-title class="text-h6"
            >{{ item.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-once
          active-color="primary"
          @click="logout"
          value="logout"
        >
          <v-list-item-title class="text-h6 d-flex justify-space-between"
            ><span>Выйти</span>
            <v-icon size="small">mdi-logout</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Departament from "@/types/busnes/Departament";
import MenuItem from "@/types/utils/MenuItem";
import useNavigateTo from "@/hooks/useNavigateTo";
import { onClickOutside } from "@vueuse/core";
import User from "@/types/busnes/User";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const navigation = useNavigateTo();

const departaments = computed<Departament[]>(
  () => store.getters["departaments/departaments"]
);
const user = computed<User>(() => store.getters["auth/user"]);
const drawer = ref(true);
const rail = ref(true);
const menu = ref(null);

const departamnetsRoutes = computed<MenuItem[]>(() => {
  const departamnents: MenuItem[] = departaments.value.map((d) => ({
    title: d.name,
    routeName: "Departament",
    params: { id: d.id },
  }));

  departamnents.unshift({
    title: "Все цеха",
    routeName: "LastDepartament",
  });

  return departamnents;
});

const menuItems = computed<MenuItem[]>(() => {
  if (user.value.role === "worker") {
    return [
      { title: "Цеха", routeName: "Departaments" },
      { title: "Комплектующие", routeName: "Consumables" },
    ];
  } else {
    return [
      { title: "Цеха", routeName: "Departaments" },
      { title: "Ответственные", routeName: "Users" },
      { title: "Типы комплектующих", routeName: "ConsumableTypes" },
      { title: "Комплектующие", routeName: "Consumables" },
      { title: "Типы неисправностей", routeName: "DefectTypes" },
      { title: "Специальности", routeName: "Specializations" },
      { title: "Логирование", routeName: "Logging" },
    ];
  }
});

const isActive = (name: string) => route.name === name;

const logout = () => {
  store.commit("auth/logout");
  sessionStorage.clear();
  store.reset();
};

const goTo = (name: string, params?: any) => {
  closeMenu();
  navigation.goTo(name, params);
};

const closeMenu = () => {
  rail.value = true;
};

onClickOutside(menu, closeMenu);
</script>

<style scoped></style>
