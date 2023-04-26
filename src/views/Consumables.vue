<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
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

const store = useStore();

const searchParam = ref("");
const isLoading = ref(false);

const consumables = computed<Consumable[]>(
  () => store.getters["consumables/consumables"]
);
const filtredConsumables = computed<Consumable[]>(() => {
  if (!searchParam.value) {
    return consumables.value;
  }
  return consumables.value.filter((d) =>
    d.name?.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
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
