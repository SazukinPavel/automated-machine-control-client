<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <v-card-title class="text-center text-wrap">
      {{
        isEdit ? "Редактирование материалы" : "Добавление материала"
      }}</v-card-title
    >
    <v-form ref="consumableForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Название"
        v-model="addConsumableDto.name"
      />
      <v-select
        class="my-2"
        :rules="[requiredRule]"
        label="Тип"
        :items="types"
        item-title="name"
        item-value="id"
        v-model="addConsumableDto.type"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="addConsumable">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, computed } from "vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import Loading from "@/components/loading.vue";
import ConsumableType from "@/types/busnes/ConsumableType";
import AddConsumableDto from "@/types/dto/consumables/AddConsumableDto";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const store = useStore();
const { requiredRule } = useValidators();
const { goTo, goBack } = useNavigateTo();

const addConsumableDto = ref<AddConsumableDto>({});
const consumableForm = ref<any | null>(null);
const isLoading = ref(false);
const isEditLoading = ref(false);

const addConsumable = async () => {
  if (!(await consumableForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;

  try {
    await store.dispatch("consumables/add", {
      ...addConsumableDto.value,
    });

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Материал успешно ${props.isEdit ? "изменён" : "добавлен"}`,
    });
    goTo("Consumables");
  } catch (e: any) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message:
        e.response.data.message ||
        `Произошла ошибка при ${
          props.isEdit ? "изменение" : "добавление"
        }  материала`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  isEditLoading.value = true;
  try {
    await store.dispatch("consumableTypes/fetch");
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Произошла ошибка при получение типов материала",
    });
  } finally {
    isEditLoading.value = false;
  }
});

const types = computed<ConsumableType[]>(
  () => store.getters["consumableTypes/types"]
);
</script>

<style scoped></style>
