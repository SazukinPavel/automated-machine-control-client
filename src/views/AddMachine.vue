<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <page-title>
      {{ isEdit ? "Редактирование станка" : "Добавление станка" }}</page-title
    >
    <v-form ref="machineForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Название"
        v-model="addMachineDto.name"
      />
      <v-text-field
        class="my-2"
        label="Инвентарный номер"
        v-model="addMachineDto.number"
      />
      <v-text-field class="my-2" label="Модель" v-model="addMachineDto.model" />
      <v-text-field
        class="my-2"
        label="Год ввода"
        :rules="[yearRule]"
        v-model="addMachineDto.startYear"
      />
      <v-textarea
        class="my-2"
        label="Описание"
        v-model="addMachineDto.description"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="addMachine">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import useValidators from "@/hooks/useValidators";
import AddMachineDto from "@/types/dto/machines/AddMachineDto";
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import api from "@/api";
import Loading from "@/components/loading.vue";
import UpdateMachineDto from "@/types/dto/machines/UpdateMachineDto";
import Machine from "@/types/busnes/Machine";
import PageTitle from "@/components/ui/pageTitle.vue";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const route = useRoute();
const store = useStore();
const { requiredRule, yearRule } = useValidators();
const { goTo, goBack } = useNavigateTo();

const addMachineDto = ref<AddMachineDto>({
  name: "",
  description: "",
});
const machineForm = ref<any | null>(null);
const realMachine = ref<Machine | null>(null);
const isLoading = ref(false);
const isEditLoading = ref(false);
const departament = ref();

const addMachine = async () => {
  if (!(await machineForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;

  try {
    if (props.isEdit) {
      const updateMachineDto = { ...addMachineDto.value } as UpdateMachineDto;
      await api.machines.update(updateMachineDto);
    } else {
      await store.dispatch("machines/add", {
        ...addMachineDto.value,
        departamentId: departament.value,
      });
    }

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Станок успешно ${props.isEdit ? "изменён" : "добавлен"}`,
    });
    goTo("Departament", { id: departament.value });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e.response?.data?.message ||
        `Произошла ошибка при ${
          props.isEdit ? "изменение" : "добавление"
        } станка`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  departament.value = route.query.departament?.toString() || "";
  if (props.isEdit) {
    isEditLoading.value = true;
    try {
      const response = await api.machines.getById(route.params.id.toString());
      addMachineDto.value = { ...response.data };
      realMachine.value = response.data;
      departament.value = realMachine.value.departament?.id;
    } catch {
      store.commit("snackbar/showSnackbarSuccess", {
        message: "Произошла ошибка при получение станка(",
      });
      goBack();
    } finally {
      isEditLoading.value = false;
    }
  }
});
</script>

<style scoped></style>
