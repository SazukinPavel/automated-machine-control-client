<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-5">
    <div class="d-flex justify-space-between">
      <v-card-title>{{ props.defect?.name }}</v-card-title>
      <v-chip
        variant="outlined"
        :color="props.defect?.isResolved ? 'green' : 'red'"
        >{{ formatDateTime(props.defect?.decisionDate) }}</v-chip
      >
    </div>
    <v-expansion-panels>
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Описание:</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <v-card-title class="text-wrap">
            Тип неисправности: {{ props.defect?.type }}</v-card-title
          >
          <v-card-title class="text-wrap">
            Ответственный: {{ props.defect?.responsible?.login }}</v-card-title
          >
          <v-card-title class="text-wrap">
            Материалы: {{ props.defect?.consumable?.name }}</v-card-title
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row justify="end" class="mt-5" v-if="!props.defect?.isResolved">
      <v-spacer />
      <v-btn class="my-3 mx-2"
        >Передвинуть дату
        <v-dialog
          v-model="isChangeDateDialog"
          activator="parent"
          max-width="800"
        >
          <v-card class="pa-5">
            <v-form ref="changeDateForm">
              <v-card-title>Новая дата:</v-card-title>
              <v-text-field
                type="datetime-local"
                v-model="newDate"
                :rules="[required]"
              />
              <div class="d-flex justify-space-between">
                <v-btn
                  :disabled="isChangeDateLoading"
                  @click="isChangeDateDialog = false"
                  >Закрыть</v-btn
                >
                <v-btn @click="changeDate" :loading="isChangeDateLoading"
                  >Изменить</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-dialog></v-btn
      >
      <v-btn class="mt-3" @click="fixDefect" :loading="isFixDefectLoading"
        >Исправить</v-btn
      >
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import Defect from "@/types/Defect";
import useDateFormater from "@/hooks/useDateFormater";
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";

const props = defineProps({
  defect: { type: Object as PropType<Defect>, required: true },
});

const { formatDateTime } = useDateFormater();
const { required } = useValidators();
const store = useStore();

const isFixDefectLoading = ref(false);
const isChangeDateDialog = ref(false);
const isChangeDateLoading = ref(false);
const newDate = ref(null);
const changeDateForm = ref<any | null>(null);

const changeDate = async () => {
  if (!(await changeDateForm.value.validate()).valid) {
    return;
  }
  isChangeDateLoading.value = true;
  try {
    await store.dispatch("defects/update", {
      decisionDate: newDate.value,
      id: props.defect?.id,
    });
    isChangeDateDialog.value = false;
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Дата устранения неисправности успешна обновлена",
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при обновление неисправности",
    });
  } finally {
    isChangeDateLoading.value = false;
  }
};

const fixDefect = async () => {
  isFixDefectLoading.value = true;
  try {
    await store.dispatch("defects/update", {
      isResolved: true,
      id: props.defect?.id,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при обновление неисправности",
    });
  } finally {
    isFixDefectLoading.value = false;
  }
};
</script>

<style scoped></style>