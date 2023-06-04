<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <div class="d-flex justify-end">
      <v-chip
        variant="outlined"
        :color="props.defect?.isResolved ? 'green' : 'red'"
        >{{ props.defect?.decisionDate }}
      </v-chip>
    </div>
    <v-card-title class="text-wrap">{{
      props.defect?.name?.defectName
    }}</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Описание:
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pa-1">
          <v-card-title class="text-wrap">
            Тип неисправности: {{ props.defect?.type.name }}
          </v-card-title>
          <v-card-title class="text-wrap"> Ответственные:</v-card-title>
          <v-list density="comfortable" v-if="props.defect?.responsible">
            <v-list-item-title
              v-for="responsible in props.defect.responsible"
              class="text-wrap ml-2"
              :key="responsible.id"
              >{{ responsible.login }}
            </v-list-item-title>
          </v-list>
          <v-card-title class="text-wrap"> Комплектуюшие:</v-card-title>
          <v-list
            density="comfortable"
            v-if="props.defect?.consumables"
            item-title="name"
          >
            <v-list-item-title
              v-for="consumable in props.defect.consumables"
              class="text-wrap ml-2"
              :key="consumable.id"
              >{{ consumable.name }}
            </v-list-item-title>
          </v-list>
          <v-card-title class="text-wrap"> Подробнее:</v-card-title>
          <v-card-text v-if="props.defect?.description">
            {{ props.defect?.description }}
          </v-card-text>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row justify="end" class="pa-3" v-if="!props.defect?.isResolved">
      <v-spacer />
      <v-btn class="mt-3 mx-3" density="comfortable"
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
                :rules="[requiredRule]"
              />
              <div class="d-flex justify-space-between">
                <v-btn
                  :disabled="isChangeDateLoading"
                  @click="isChangeDateDialog = false"
                  >Закрыть
                </v-btn>
                <v-btn @click="changeDate" :loading="isChangeDateLoading"
                  >Изменить
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-dialog>
      </v-btn>
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.defect?.name?.defectName}, все использованые матрериалы будут возвращены?`"
        @confirm="deleteDefect"
      >
        <v-btn
          density="comfortable"
          :loading="isDeleteLoading"
          class="mt-3 mx-3"
          @click="isDeleteDialog = true"
        >
          Удалить
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
      <v-btn
        density="comfortable"
        class="mt-3 mx-3"
        :to="{ name: 'EditDefect', params: { id: props.defect?.id } }"
        >Редактировать
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        density="comfortable"
        class="mt-3 mx-3"
        @click="fixDefect"
        :loading="isFixDefectLoading"
        >Исправить
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref } from "vue";
import Defect from "@/types/busnes/Defect";
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import useDateFormater from "@/hooks/useDateFormater";
import ConfitmDialog from "@/components/confirmDialog.vue";

const props = defineProps({
  defect: { type: Object as PropType<Defect>, required: true },
});

const { requiredRule } = useValidators();
const { formatToInput } = useDateFormater();
const store = useStore();

const isFixDefectLoading = ref(false);
const isChangeDateDialog = ref(false);
const isChangeDateLoading = ref(false);
const newDate = ref<string>("");
const changeDateForm = ref<any | null>(null);
const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

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

const deleteDefect = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("defects/delete", props.defect?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.defect?.name?.defectName} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.defect?.name?.defectName}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

onMounted(() => {
  newDate.value = formatToInput(props.defect?.decisionDate);
});
</script>

<style scoped></style>
