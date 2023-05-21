<template>
  <div>
    <page-title v-if="!isLoading && (departament?.name || !id)">{{
      id ? `Станки в ${departament.name}` : `Все станки`
    }}</page-title>
    <v-row class="ma-4" dense="dense">
      <v-col cols="6">
        <search v-model="searchParam" />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="selectedState"
          :items="stateItems"
          label="Состояние"
          density="compact"
        ></v-select>
      </v-col>
      <v-col class="d-flex justify-end">
        <add-btn
          v-if="id"
          :to="{ name: 'AddMachine', query: { departament: id } }"
        />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <machine-card
        v-for="machine in filtredMachines"
        :key="machine.id"
        :machine="machine"
      />
    </template>
    <loading v-else></loading>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Machine from "@/types/busnes/Machine";
import MachineCard from "@/components/machineCard.vue";
import Search from "@/components/search.vue";
import useDateFormater from "@/hooks/useDateFormater";
import Loading from "@/components/loading.vue";
import AddBtn from "@/components/ui/addBtn.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";
import PageTitle from "@/components/ui/pageTitle.vue";
import Departament from "@/types/busnes/Departament";
import useSeo from "@/hooks/useSeo";

const route = useRoute();
const store = useStore();
const { formatDateTime } = useDateFormater();
const { setTitle } = useSeo();

const isLoading = ref(false);
const searchParam = ref("");
const selectedState = ref("");
const stateItems = ref([
  { title: "Не исправна", value: "false" },
  { title: "Исправна", value: "true" },
  { title: "Все", value: "" },
]);

const id = computed(() => route.params.id);

onMounted(() => {
  setTitle(departament.value?.name || "Станки");
  fetchMachines();
});

const fetchMachines = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("machines/fetchByDepartamentId", id.value);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе станков",
    });
  } finally {
    isLoading.value = false;
  }
};

const machines = computed<Machine[]>(() =>
  store.getters["machines/machines"].map((m: Machine): Machine => {
    return {
      ...m,
      updateAt: formatDateTime(m.updateAt),
      createdAt: formatDateTime(m.createdAt),
    };
  })
);
const filtredMachines = computed<Machine[]>(() => {
  let currMachines: Machine[] = JSON.parse(JSON.stringify(machines.value));
  if (selectedState.value !== "") {
    currMachines = currMachines.filter(
      (m) => m.isActive == !!JSON.parse(selectedState.value)
    );
  }

  if (searchParam.value) {
    return deepObjectSearch(currMachines, searchParam.value);
  }

  return currMachines;
});

const departament = computed<Departament>(() => {
  return store.getters["departaments/departaments"].find(
    (d) => d.id === id.value
  );
});

watch(id, () => {
  fetchMachines();
});

watch(departament, () => {
  setTitle(departament.value?.name || "Станки");
});
</script>

<style scoped></style>
