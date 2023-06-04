<template>
  <div v-if="!isFetchLoading" variant="text">
    <page-title
      >Неисправности станка
      {{ `${machine?.name} (${machine?.number})` }}</page-title
    >
    <div class="mx-3">
      <search v-model="searchValue" />
    </div>
    <div class="d-flex justify-end">
      <v-btn class="mx-3" @click="goBack">Назад</v-btn>
      <doc-button @download="downloadXlsx" />
      <add-btn
        class="mx-3"
        :to="{ name: 'AddDefect', query: { machine: machineId } }"
      />
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
import { useRoute } from "vue-router";
import Machine from "@/types/busnes/Machine";
import AddBtn from "@/components/ui/addBtn.vue";
import DefectCard from "@/components/defectCard.vue";
import Defect from "@/types/busnes/Defect";
import useNavigateTo from "@/hooks/useNavigateTo";
import Search from "@/components/search.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";
import PageTitle from "@/components/ui/pageTitle.vue";
import useSeo from "@/hooks/useSeo";
import useDateFormater from "@/hooks/useDateFormater";
import Loading from "@/components/loading.vue";
import XlsxService from "@/services/XlsxService";
import DocButton from "@/components/ui/docButton.vue";
import moment from "moment";

const store = useStore();
const route = useRoute();
const { goBack } = useNavigateTo();
const { setTitle } = useSeo();
const { formatDateTime } = useDateFormater();

const searchValue = ref("");
const isFetchLoading = ref(false);

const machineId = computed(() => route.params.id);
const machine = computed<Machine | undefined>(
  () =>
    store.getters["machines/machines"].find(
      (m: Machine) => m.id == machineId.value
    ) || defects.value.find((d) => d.machine)?.machine
);

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

const downloadXlsx = ({ endDate, startDate }) => {
  const filtredDefects = defects.value.filter((d) => {
    return (
      !endDate ||
      !startDate ||
      (moment(endDate) >= moment(d.createdAt) &&
        moment(startDate) <= moment(d.createdAt))
    );
  });

  return XlsxService.downloadXlsx(filtredDefects);
};

onMounted(async () => {
  isFetchLoading.value = true;
  try {
    await store.dispatch("machines/fetch");
    setTitle(`Неисправности ${machine.value?.name} (${machine.value?.number})`);
    await store.dispatch("defects/fetch", { machine: machineId.value });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе неисправностей станка",
    });
  } finally {
    isFetchLoading.value = false;
  }
});
</script>

<style scoped></style>
