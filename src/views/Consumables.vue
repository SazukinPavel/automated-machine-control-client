<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px">
        <search v-model="searchParam" />
      </v-col>
      <v-col style="min-width: 180px">
        <v-select
          density="compact"
          item-title="title"
          item-value="value"
          v-model="availableType"
          :items="availableTypes"
        />
      </v-col>
      <v-col>
        <add-btn :to="{ name: 'AddConsumable' }" />
      </v-col>
    </v-row>
    <consumable-card
      v-for="consumable in filtredConsumables"
      :key="consumable.id"
      :consumable="consumable"
    />
  </div>
  <loading v-else></loading>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/loading.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";
import Consumable from "@/types/busnes/Consumable";
import ConsumableCard from "@/components/consumableCard.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";

const store = useStore();

const searchParam = ref("");
const isLoading = ref(false);
const availableTypes = ref([
  { title: "Не списанные", value: true },
  { title: "Списанные", value: false },
  { title: "Все", value: "null" },
]);
const availableType = ref<string | boolean>(true);

const consumables = computed<Consumable[]>(
  () => store.getters["consumables/consumables"]
);
const filtredConsumables = computed<Consumable[]>(() => {
  const filtred =
    availableType.value === null
      ? consumables.value
      : consumables.value.filter(
          (c) =>
            availableType.value === "null" ||
            c.isAvailable == availableType.value
        );

  if (!searchParam.value) {
    return filtred;
  }
  return deepObjectSearch(filtred, searchParam.value);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("consumables/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе материалов",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
