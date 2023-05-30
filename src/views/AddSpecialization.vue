<template>
  <v-container
    v-if="!isEditLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <page-title>
      {{
        isEdit ? "Редактирование специальности" : "Добавление специальности"
      }}</page-title
    >
    <v-form ref="specializationForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Название"
        v-model="addSpecializationDto.name"
      />
      <v-autocomplete
        class="my-2"
        :rules="[requiredRule]"
        :items="types"
        multiple
        item-title="name"
        item-value="id"
        label="Разряды"
        v-model="addSpecializationDto.types"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="addSpecialization">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, computed } from "vue";
import { useRoute } from "vue-router";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import api from "@/api";
import Loading from "@/components/loading.vue";
import PageTitle from "@/components/ui/pageTitle.vue";
import AddSpecializationDto from "@/types/dto/specializations/AddSpecializationDto";
import Specialization from "@/types/busnes/Specialization";
import UpdateSpecializationDto from "@/types/dto/specializations/UpdateSpecializationDto";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const route = useRoute();
const store = useStore();
const { requiredRule } = useValidators();
const { goTo, goBack } = useNavigateTo();

const addSpecializationDto = ref<AddSpecializationDto>({
  name: "",
  types: [],
});
const specializationForm = ref<any | null>(null);
const realSpecialization = ref<Specialization | null>(null);
const isLoading = ref(false);
const isEditLoading = ref(false);

const types = computed(() => store.getters["defectTypes/types"]);

const addSpecialization = async () => {
  if (!(await specializationForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;

  try {
    if (props.isEdit) {
      const dto = {
        ...addSpecializationDto.value,
        id: realSpecialization.value?.id,
      } as UpdateSpecializationDto;
      await api.specializations.update(dto);
    } else {
      await store.dispatch("specializations/add", addSpecializationDto.value);
    }

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Специализация успешно ${
        props.isEdit ? "изменена" : "добавлена"
      }`,
    });
    goTo("Specializations");
  } catch (e) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при ${
        props.isEdit ? "изменение" : "добавление"
      } специализации`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await store.dispatch("defectTypes/fetch");

  if (props.isEdit) {
    isEditLoading.value = true;
    try {
      const response = await api.specializations.getById(
        route.params.id.toString()
      );
      addSpecializationDto.value = {
        ...response.data,
        types: response.data.types.map((d) => d.id),
      };
      realSpecialization.value = response.data;
    } catch {
      store.commit("snackbar/showSnackbarSuccess", {
        message: "Произошла ошибка при получение специализации",
      });
      goBack();
    } finally {
      isEditLoading.value = false;
    }
  }
});
</script>

<style scoped></style>
