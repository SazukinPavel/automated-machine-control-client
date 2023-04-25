<template>
  <v-container
    v-if="!isFetchLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <v-card-title class="text-center">
      {{
        isEdit ? "Редактирование неисправности" : "Добавление неисправности"
      }}</v-card-title
    >
    <v-form ref="defectForm">
      <v-select
        v-model="addDefectDto.machineId"
        :items="machines"
        label="Станок"
        item-value="id"
        item-title="name"
        :rules="[requiredRule]"
      />
      <v-autocomplete
        v-model="addDefectDto.responsibleId"
        :items="users"
        label="Ответственный"
        :rules="[requiredRule]"
        item-value="id"
        item-title="login"
      />
      <v-select
        v-model="addDefectDto.type"
        :items="types"
        label="Тип"
        :rules="[requiredRule]"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        variant="outlined"
        label="Название"
        color="primary"
        v-model="addDefectDto.name"
      />
      <v-textarea
        class="my-2"
        variant="outlined"
        label="Описание"
        color="primary"
        v-model="addDefectDto.description"
      />
      <v-autocomplete
        :single-line="false"
        class="my-2"
        variant="outlined"
        label="Материалы"
        :items="fullConsumables"
        @blur="setUserConsumable"
        item-title="name"
        item-value="name"
        :rules="[requiredRule]"
        color="primary"
        v-model="addDefectDto.consumable"
      />
      <v-text-field
        type="datetime-local"
        v-model="addDefectDto.decisionDate"
        :rules="[requiredRule]"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isAddLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isAddLoading" @click="add">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import Loading from "@/components/loading.vue";
import { onMounted, defineProps, ref, computed } from "vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import { useRoute } from "vue-router";
import AddDefectDto from "@/types/dto/defects/AddDefectDto";
import Machine from "@/types/busnes/Machine";
import User from "@/types/busnes/User";
import Consumable from "@/types/busnes/Consumable";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const store = useStore();
const route = useRoute();
const { goBack } = useNavigateTo();
const { requiredRule } = useValidators();

const addDefectDto = ref<AddDefectDto>({});
const isAddLoading = ref(false);
const isFetchLoading = ref(false);
const types = ref(["Слесарная", "Электронная"]);
const defectForm = ref<any | null>(null);
const userConsumable = ref("");

const machines = computed<Machine[]>(() => store.getters["machines/machines"]);
const users = computed<User[]>(() => store.getters["users/users"]);
const consumables = computed<Consumable[]>(
  () => store.getters["consumables/consumables"]
);
const fullConsumables = computed<Consumable[]>(() => {
  if (userConsumable.value) {
    return consumables.value.concat([
      { name: userConsumable.value } as Consumable,
    ]);
  }

  return consumables.value;
});

const setUserConsumable = (e: any) => {
  userConsumable.value = e.target.value || "";
  addDefectDto.value.consumable = userConsumable.value;
};

const add = async () => {
  if (!(await defectForm.value.validate()).valid) {
    return;
  }
  isAddLoading.value = true;
  try {
    store.dispatch("defects/add", addDefectDto.value);
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Дефект добавлен успешно",
    });
    goBack();
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при создании дефекта",
    });
  } finally {
    isAddLoading.value = false;
  }
};

onMounted(async () => {
  isFetchLoading.value = true;
  await Promise.all([
    store.dispatch("machines/fetch"),
    store.dispatch("users/fetch"),
    store.dispatch("consumables/fetch"),
  ]);

  if (route.query.machine) {
    addDefectDto.value.machineId = route.query.machine.toString();
  }

  isFetchLoading.value = false;
});
</script>

<style scoped></style>
