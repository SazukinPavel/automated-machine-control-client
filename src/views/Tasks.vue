<template>
  <div v-if="!isFetchLoading" variant="text">
    <page-title>Мои задачи</page-title>
    <div class="mx-3">
      <search v-model="searchValue" />
    </div>
    <machine-card
      v-for="machine in filtredMachines"
      :key="machine.id"
      :machine="machine"
    />
  </div>
  <loading v-else />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Defect from "@/types/busnes/Defect";
import deepObjectSearch from "@/utils/deepObjectSearch";
import useDateFormater from "@/hooks/useDateFormater";
import Search from "@/components/search.vue";
import Loading from "@/components/loading.vue";
import PageTitle from "@/components/ui/pageTitle.vue";
import Machine from "@/types/busnes/Machine";
import MachineCard from "@/components/machineCard.vue";

const store = useStore();
const { formatDateTime } = useDateFormater();

const searchValue = ref("");
const isFetchLoading = ref(false);

const machines = computed<Machine[]>(() =>
  store.getters["defects/defects"]
    ?.map((d: Defect) => ({
      ...d,
      decisionDate: formatDateTime(d.decisionDate),
    }))
    .map((d: Defect) => ({ ...d.machine, defects: [d], isActive: false }))
);
const filtredMachines = computed<Machine[]>(() => {
  console.log(machines.value);
  if (!searchValue.value) {
    return machines.value;
  }
  return deepObjectSearch(machines.value, searchValue.value);
});

onMounted(async () => {
  isFetchLoading.value = true;
  try {
    await store.dispatch("defects/fetch", { byUser: true });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе задач",
    });
  } finally {
    isFetchLoading.value = false;
  }
});
</script>

<style scoped></style>
