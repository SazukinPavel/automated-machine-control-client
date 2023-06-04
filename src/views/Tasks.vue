<template>
  <div v-if="!isFetchLoading" variant="text">
    <page-title>Мои задачи</page-title>
    <div class="mx-3">
      <search v-model="searchValue" />
    </div>
    <defect-card
      v-for="defect in filtredDefects"
      :key="defect.id"
      :defect="defect"
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
import DefectCard from "@/components/defectCard.vue";
import Search from "@/components/search.vue";
import Loading from "@/components/loading.vue";
import PageTitle from "@/components/ui/pageTitle.vue";

const store = useStore();
const { formatDateTime } = useDateFormater();

const searchValue = ref("");
const isFetchLoading = ref(false);

const defects = computed<Defect[]>(() =>
  store.getters["defects/defects"]?.map((d: Defect) => ({
    ...d,
    decisionDate: formatDateTime(d.decisionDate),
  }))
);
const filtredDefects = computed<Defect[]>(() => {
  if (!searchValue.value) {
    return defects.value;
  }
  return deepObjectSearch(defects.value, searchValue.value);
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
