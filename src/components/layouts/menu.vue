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
          <v-list-item-title class="text-subtitle-1">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item value="add" @click="goTo('AddDepartament')">
          <v-list-item-title class="text-xl-subtitle-1 text-center"
            >Добавить цех <v-icon>mdi-plus</v-icon></v-list-item-title
          >
        </v-list-item>
      </v-list-group>
      <v-list-item value="departaments" @click="goTo('Departaments')">
        <v-list-item-title class="text-h6">Цеха</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Departament from "@/types/Departament";
import MenuItem from "@/types/MenuItem";
import useNavigateTo from "@/hooks/useNavigateTo";

const store = useStore();
const { goTo } = useNavigateTo();

const departaments = computed<Departament[]>(
  () => store.getters["departaments/departaments"]
);
const drawer = ref(true);
const rail = ref(true);

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
</script>

<style scoped></style>
