<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 800px"
    class="pa-4 ma-auto mt-lg-15 mt-xl-15 mt-sm-10 mt-md-10"
  >
    <v-card-title class="text-center">
      {{ isEdit ? "Редактирование цеха" : "Добавление цеха" }}</v-card-title
    >
    <v-form ref="departamentForm">
      <v-text-field
        class="my-2"
        :rules="[required]"
        variant="outlined"
        label="Название"
        color="primary"
        v-model="addDepartamentDto.name"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="add">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import useNavigateTo from "@/hooks/useNavigateTo";
import Loading from "@/components/loading.vue";
import { ref, defineProps, onMounted } from "vue";
import AddDepartamentDto from "@/types/dto/departaments/AddDepartamentDto";
import api from "@/api";
import UpdateDepartamentDto from "@/types/dto/departaments/UpdateDepartamentDto";
import { useRoute } from "vue-router";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const store = useStore();
const route = useRoute();
const { required } = useValidators();
const { goBack, goTo } = useNavigateTo();

const isLoading = ref(false);
const isEditLoading = ref(false);
const departamentForm = ref<any | null>(null);
const addDepartamentDto = ref<AddDepartamentDto>({ name: "" });

const add = async () => {
  if (!(await departamentForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;
  try {
    if (props.isEdit) {
      const updateMachineDto = {
        ...addDepartamentDto.value,
      } as UpdateDepartamentDto;
      await store.dispatch("departaments/update", updateMachineDto);
    } else {
      await store.dispatch("departaments/add", {
        ...addDepartamentDto.value,
      });
    }
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Цех успешно ${props.isEdit ? "обновлён" : "добавлен"}`,
    });
    goTo("Departaments");
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e.response.data.message ||
        `Произошла ошибка при ${
          props.isEdit ? "обновление" : "добавление"
        } цеха`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (props.isEdit && route.params.id.toString()) {
    isEditLoading.value = true;
    try {
      const response = await api.departaments.getById(
        route.params.id.toString()
      );
      addDepartamentDto.value = response.data;
    } catch {
      store.commit("snackbar/showSnackbarError", {
        message: `Произошла ошибка при запросе цеха`,
      });
      goBack();
    } finally {
      isEditLoading.value = false;
    }
  }
});
</script>

<style scoped></style>
