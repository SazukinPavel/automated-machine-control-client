<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
      </v-col>
      <v-col>
        <add-btn :to="{ name: 'AddDepartament' }" />
      </v-col>
    </v-row>
    <departament-card
      v-for="departament in filtredDepartaments"
      :key="departament.id"
      :departament="departament"
    />
  </div>
  <loading v-else></loading>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Departament from "@/types/Departament";
import Loading from "@/components/loading.vue";
import Search from "@/components/search.vue";
import DepartamentCard from "@/components/departamentCard.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();

const searchParam = ref("");

const departaments = computed<Departament[]>(
  () => store.getters["departaments/departaments"]
);
const filtredDepartaments = computed<Departament[]>(() => {
  if (!searchParam.value) {
    return departaments.value;
  }
  return departaments.value.filter((d) =>
    d.name.toLowerCase().includes(searchParam.value.toLowerCase())
  );
});

const isLoading = computed<boolean>(
  () => store.getters["departaments/isLoading"]
);
</script>
