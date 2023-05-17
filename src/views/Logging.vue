<template>
  <v-container class="ma-0 pa-0">
    <v-card-title>Логирование</v-card-title>
    <template v-if="!isFetching">
      <log-card v-for="log in logs" :key="log.id" :log="log" />
      <v-pagination
        density="compact"
        v-model="page"
        rounded="circle"
        color="primary"
        :length="paginationLength"
      ></v-pagination>
    </template>
    <loading v-else />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import LogCard from "@/components/logCard.vue";
import Loading from "@/App.vue";

const store = useStore();

const page = ref(1);
const limit = ref(10);
const isFetching = ref(false);

const logs = computed(() => store.getters["logs/logs"]);
const count = computed(() => store.getters["logs/count"]);
const paginationLength = computed(() => Math.ceil(count.value / limit.value));
const fetchLogs = async () => {
  isFetching.value = true;
  try {
    if (!count.value) {
      await store.dispatch("logs/count");
    }

    await store.dispatch("logs/fetch", {
      limit: limit.value,
      page: page.value,
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
  fetchLogs();
});

watch(page, async () => {
  fetchLogs();
});
</script>

<style scoped></style>
