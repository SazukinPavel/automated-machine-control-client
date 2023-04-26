<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
      </v-col>
      <v-col>
        <add-btn :to="{ name: 'AddConsumableType' }" />
      </v-col>
    </v-row>
    <consumable-type-card
      v-for="type in filtredTypes"
      :key="type.id"
      :type="type"
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
import ConsumableType from "@/types/busnes/ConsumableType";
import ConsumableTypeCard from "@/components/consumableTypeCard.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";

const store = useStore();

const searchParam = ref("");
const isLoading = ref(false);

const types = computed<ConsumableType[]>(
  () => store.getters["consumableTypes/types"]
);
const filtredTypes = computed<ConsumableType[]>(() => {
  if (!searchParam.value) {
    return types.value;
  }
  return deepObjectSearch(types.value, searchParam.value);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("consumableTypes/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе типов материалов",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
