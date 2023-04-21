<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
      </v-col>
      <v-col cols="3" style="min-width: 150px">
        <v-select
          v-model="selectedState"
          :items="stateItems"
          label="Состояние"
          density="compact"
        ></v-select>
      </v-col>
      <v-col>
        <add-btn
          v-if="id"
          :to="{ name: 'AddMachine', query: { departament: id } }"
        />
      </v-col>
    </v-row>
    <machine-card
      v-for="machine in filtredMachines"
      :key="machine.id"
      :machine="machine"
    />
  </div>
  <loading v-else></loading>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Machine from "@/types/Machine";
import MachineCard from "@/components/machineCard.vue";
import Search from "@/components/search.vue";
import useDateFormater from "@/hooks/useDateFormater";
import Loading from "@/components/loading.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const route = useRoute();
const store = useStore();
const { formatDateTime } = useDateFormater();

const isLoading = ref(false);
const searchParam = ref("");
const selectedState = ref("");
const stateItems = ref([
  { title: "С дефектами", value: "false" },
  { title: "Без дефектов", value: "true" },
  { title: "Все", value: "" },
]);

const id = computed(() => route.params.id);

onMounted(() => {
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

const machines = computed<Machine[]>(() => store.getters["machines/machines"]);
const filtredMachines = computed<Machine[]>(() => {
  let currMachines: Machine[] = JSON.parse(JSON.stringify(machines.value));
  if (selectedState.value !== "") {
    currMachines = currMachines.filter(
      (m) => m.isActive == !!JSON.parse(selectedState.value)
    );
  }

  if (searchParam.value) {
    currMachines = currMachines.filter((m) => {
      return (
        m.name.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
        m.description
          .toLowerCase()
          .startsWith(searchParam.value.toLowerCase()) ||
        formatDateTime(m.createdAt).startsWith(searchParam.value) ||
        formatDateTime(m.updateAt).startsWith(searchParam.value)
      );
    });
  }

  return currMachines;
});

watch(id, () => {
  fetchMachines();
});
</script>

<style scoped></style>
