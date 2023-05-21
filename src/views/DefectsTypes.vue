<template>
  <div>
    <page-title>Типы неисправностей</page-title>
    <v-row class="ma-4" dense="dense">
      <v-col cols="6">
        <search v-model="searchParam" />
      </v-col>
      <v-col cols="6">
        <add-btn :to="{ name: 'AddDefectType' }" />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <defect-type-card
        v-for="type in filtredTypes"
        :key="type.id"
        :type="type"
      />
    </template>
    <loading v-else></loading>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/loading.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";
import deepObjectSearch from "@/utils/deepObjectSearch";
import DefectType from "@/types/busnes/DefectType";
import DefectTypeCard from "@/components/defectTypeCard.vue";
import PageTitle from "@/components/ui/pageTitle.vue";

const store = useStore();

const searchParam = ref("");
const isLoading = ref(false);

const types = computed<DefectType[]>(() => store.getters["defectTypes/types"]);
const filtredTypes = computed<DefectType[]>(() => {
  if (!searchParam.value) {
    return types.value;
  }
  return deepObjectSearch(types.value, searchParam.value);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("defectTypes/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе типов неисправностей",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
