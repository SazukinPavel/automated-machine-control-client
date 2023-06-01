<template>
  <div>
    <page-title>Специальности</page-title>
    <v-row class="ma-4" dense="dense">
      <v-col cols="6">
        <search v-model="searchParam" />
      </v-col>
      <v-col cols="6">
        <add-btn :to="{ name: 'AddSpecialization' }" />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <specialization-card
        v-for="s in filtredSpecializations"
        :specialization="s"
        :key="s.id"
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
import PageTitle from "@/components/ui/pageTitle.vue";
import SpecializationCard from "@/components/specializationCard.vue";
import Specialization from "@/types/busnes/Specialization";

const store = useStore();

const searchParam = ref("");
const isLoading = ref(false);

const specializations = computed<Specialization[]>(
  () => store.getters["specializations/specializations"]
);
const filtredSpecializations = computed<Specialization[]>(() => {
  if (!searchParam.value) {
    return specializations.value;
  }
  return deepObjectSearch(specializations.value, searchParam.value);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("specializations/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе специальностей",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
