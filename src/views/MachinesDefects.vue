<template>
  <v-card :loading="isFetchLoading" variant="text">
    <v-card-title class="text-center">Станок {{ machine?.name }}</v-card-title>
    <div class="d-flex justify-end">
      <v-btn class="mx-3" @click="goBack">Назад</v-btn>
      <add-btn
        class="mx-3"
        :to="{ name: 'AddDefect', query: { machine: machineId } }"
      />
    </div>
    <defect-card v-for="defect in defects" :key="defect.id" :defect="defect" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Machine from "@/types/busnes/Machine";
import AddBtn from "@/components/ui/addBtn.vue";
import DefectCard from "@/components/defectCard.vue";
import Defect from "@/types/busnes/Defect";
import useNavigateTo from "@/hooks/useNavigateTo";

const store = useStore();
const route = useRoute();
const { goBack } = useNavigateTo();

const isFetchLoading = ref(false);

const machineId = computed(() => route.params.id);
const machine = computed<Machine | undefined>(() =>
  store.getters["machines/machines"].find(
    (m: Machine) => m.id == machineId.value
  )
);

const defects = computed<Defect[]>(() => store.getters["defects/defects"]);

onMounted(async () => {
  isFetchLoading.value = true;
  try {
    await store.dispatch("machines/fetch");
    await store.dispatch("defects/fetch", { machine: machineId.value });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе дефектов станка",
    });
  } finally {
    isFetchLoading.value = false;
  }
});
</script>

<style scoped></style>
