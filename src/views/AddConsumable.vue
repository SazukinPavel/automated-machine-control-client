<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <page-title>{{
      isEdit ? "Редактирование комплектующего" : "Добавление комплектующего"
    }}</page-title>
    <v-form ref="consumableForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Название"
        v-model="addConsumableDto.name"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Инвентарный номер"
        v-model="addConsumableDto.number"
      />
      <v-select
        v-if="!props.isEdit"
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
import PageTitle from "@/components/ui/pageTitle.vue";
import api from "@/api";
import { useRoute } from "vue-router";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const store = useStore();
const route = useRoute();
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
    if (props.isEdit) {
      const consumable = await api.consumables.update({
        ...addConsumableDto.value,
      });
      store.commit("consumables/replace", consumable);
    } else {
      await store.dispatch("consumables/add", {
        ...addConsumableDto.value,
      });
    }

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Комплектующий успешно ${props.isEdit ? "изменён" : "добавлен"}`,
    });
    goTo("Consumables");
  } catch (e: any) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message:
        e.response.data.message ||
        `Произошла ошибка при ${
          props.isEdit ? "изменение" : "добавление"
        }  комплектующего`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  isEditLoading.value = true;
  try {
    await store.dispatch("consumableTypes/fetch");
    if (props.isEdit) {
      const real = await api.consumables.getById(route.params.id.toString());
      addConsumableDto.value = {
        ...addConsumableDto.value,
        ...(real.data as AddConsumableDto),
      };
    }
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Произошла ошибка при получение типов комплектующих",
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
