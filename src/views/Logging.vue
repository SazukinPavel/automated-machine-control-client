<template>
  <div class="ma-0 pa-0">
    <page-title>Логирование</page-title>
    <v-expansion-panels class="mx-1">
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Дополнительные опции:
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-wrap pa-4">
          <v-card variant="text">
            <v-card-title class="text-subtitle-1 text-wrap"
              >Колличество записей на странице</v-card-title
            >
            <v-text-field
              type="number"
              min="1"
              max="100"
              v-model="logsCopyDTO.limit"
            ></v-text-field>
            <v-card-title class="text-subtitle-1 text-wrap">Дата</v-card-title>
            <v-text-field
              type="datetime-local"
              v-model="logsCopyDTO.startDate"
              label="От"
            ></v-text-field>
            <v-text-field
              type="datetime-local"
              v-model="logsCopyDTO.endDate"
              label="До"
            ></v-text-field>
            <div class="d-flex justify-end">
              <v-btn class="mx-2" density="comfortable" @click="resetOptions"
                >Сбросить</v-btn
              >
              <v-btn class="mx-2" density="comfortable" @click="setOptions"
                >Искать</v-btn
              >
            </div>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <template v-if="!isFetching">
      <log-card v-for="log in logs" :key="log.id" :log="log" />
      <v-pagination
        density="compact"
        v-model="logsDTO.page"
        rounded="circle"
        color="primary"
        :length="paginationLength"
      ></v-pagination>
    </template>
    <loading v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import LogCard from "@/components/logCard.vue";
import Loading from "@/components/loading.vue";
import PageTitle from "@/components/ui/pageTitle.vue";
import GetLogsDto from "@/types/dto/logs/GetLogsDto";

const store = useStore();

const isFetching = ref(false);
const logsCopyDTO = ref<GetLogsDto>({ page: 1, limit: 10 });
const logsDTO = ref<GetLogsDto>({ page: 1, limit: 10 });

const logs = computed(() => store.getters["logs/logs"]);
const count = computed(() => store.getters["logs/count"]);
const paginationLength = computed(() =>
  Math.ceil(count.value / logsDTO.value.limit)
);
const fetchLogs = async (withCount: boolean = false) => {
  isFetching.value = true;
  try {
    if (withCount) {
      await store.dispatch("logs/count", { ...logsDTO.value });
    }

    await store.dispatch("logs/fetch", {
      ...logsDTO.value,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение логов",
    });
  } finally {
    isFetching.value = false;
  }
};

onMounted(() => {
  fetchLogs(true);
});

watch(
  logsDTO,
  (newValue, oldValue) => {
    if (
      newValue.endDate != oldValue.endDate ||
      newValue.startDate != oldValue.startDate
    ) {
      fetchLogs(true);
    } else {
      fetchLogs();
    }
  },
  { deep: true }
);

const setOptions = () => {
  logsDTO.value = { ...logsCopyDTO.value };
};

const resetOptions = () => {
  logsCopyDTO.value = { page: 1, limit: 10 };
  setOptions();
};
</script>

<style scoped></style>
