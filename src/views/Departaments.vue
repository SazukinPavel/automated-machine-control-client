<template>
  <div>
    <page-title>Цеха</page-title>
    <v-row class="ma-4" dense="dense">
      <v-col cols="6">
        <search v-model="searchParam" />
      </v-col>
      <v-col cols="6">
        <add-btn :to="{ name: 'AddDepartament' }" />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <departament-card
        v-for="departament in filtredDepartaments"
        :key="departament.id"
        :departament="departament"
      />
    </template>
    <loading v-else></loading>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Departament from "@/types/busnes/Departament";
import Loading from "@/components/loading.vue";
import Search from "@/components/search.vue";
import DepartamentCard from "@/components/departamentCard.vue";
import AddBtn from "@/components/ui/addBtn.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";
import PageTitle from "@/components/ui/pageTitle.vue";

const store = useStore();

const searchParam = ref("");

const departaments = computed<Departament[]>(
  () => store.getters["departaments/departaments"]
);
const filtredDepartaments = computed<Departament[]>(() => {
  if (!searchParam.value) {
    return departaments.value;
  }

  return deepObjectSearch(departaments.value, searchParam.value, {
    includes: ["name"],
  });
});

const isLoading = computed<boolean>(
  () => store.getters["departaments/isLoading"]
);
</script>
