<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <page-title>Типы неисправностей</page-title>
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
      </v-col>
      <v-col>
        <add-btn :to="{ name: 'AddDefectType' }" />
      </v-col>
    </v-row>
    <defect-type-card
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
