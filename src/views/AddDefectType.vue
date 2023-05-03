<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <page-title>
      {{
        isEdit
          ? "Редактирование типа неисправности"
          : "Добавление типа неисправности"
      }}</page-title
    >
    <v-form ref="typeForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Название"
        v-model="addTypeDto.name"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="addType">{{
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
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import api from "@/api";
import Loading from "@/components/loading.vue";
import AddDefectTypeDto from "@/types/dto/defectTypes/AddDefectTypeDto";
import UpdateDefectTypeDto from "@/types/dto/defectTypes/UpdateDefectTypeDto";
import PageTitle from "@/components/ui/pageTitle.vue";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const route = useRoute();
const store = useStore();
const { requiredRule } = useValidators();
const { goTo, goBack } = useNavigateTo();

const addTypeDto = ref<AddDefectTypeDto>({});
const typeForm = ref<any | null>(null);
const isLoading = ref(false);
const isEditLoading = ref(false);

const addType = async () => {
  if (!(await typeForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;

  try {
    if (props.isEdit) {
      const dto = { ...addTypeDto.value } as UpdateDefectTypeDto;
      await store.dispatch("defectTypes/update", dto);
    } else {
      await store.dispatch("defectTypes/add", {
        ...addTypeDto.value,
      });
    }

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Тип материала успешно ${props.isEdit ? "изменён" : "добавлен"}`,
    });
    goTo("DefectTypes");
  } catch (e: any) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message ||
        `Произошла ошибка при ${
          props.isEdit ? "изменение" : "добавление"
        } типа неисправности`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (props.isEdit) {
    isEditLoading.value = true;
    try {
      const response = await api.defectTypes.getById(
        route.params.id.toString()
      );
      addTypeDto.value = { ...response.data };
    } catch {
      store.commit("snackbar/showSnackbarSuccess", {
        message: "Произошла ошибка при получение типа неисправности",
      });
      goBack();
    } finally {
      isEditLoading.value = false;
    }
  }
});
</script>

<style scoped></style>
