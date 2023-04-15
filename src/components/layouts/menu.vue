<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
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
      <v-list-group title="Цеха">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Станки"></v-list-item>
        </template>
        <v-list-item value="all">
          <v-list-item-title class="text-h6" @click="goTo('LastDepartament')"
            >Все цеха</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          v-for="item in departamnetsRoutes"
          :key="item.title"
          :value="item.title"
        >
          <v-list-item-title
            class="text-h6"
            @click="goTo(item.routeName, item.params)"
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Departament from "@/types/Departament";
import MenuItem from "@/types/MenuItem";
import useNavigateTo from "@/hooks/useNavigateTo";
import Role from "@/types/Role";

const store = useStore();
const { goTo } = useNavigateTo();

const role = computed<Role>(() => store.getters["auth/role"]);
const departaments = computed<Departament[]>(
  () => store.getters["departaments/departaments"]
);
const drawer = ref(true);
const rail = ref(true);

const departamnetsRoutes = computed<MenuItem[]>(() => {
  if (role.value === "admin") {
    return departaments.value.map((d) => ({
      title: d.name,
      routeName: "Departament",
      params: { id: d.id },
    }));
  }
  return [];
});
</script>

<style scoped></style>
