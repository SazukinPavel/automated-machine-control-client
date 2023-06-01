<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <v-card-title class="text-end text-wrap">
      <v-chip
        variant="outlined"
        :color="props.machine?.isActive ? 'green' : 'red'"
        >{{ props.machine.isActive ? "Исправен" : "Неисправен" }}
      </v-chip>
    </v-card-title>
    <v-card-title class="text-wrap"
      >{{ `${props.machine.name} (${props.machine.number})` }}
    </v-card-title>
    <v-card-text class="text-end"
      ><span class="mx-2 text-wrap"
        >Добавлен:{{ props.machine.createdAt }}</span
      >
      <span class="mx-2 text-wrap"> Обновлён:{{ props.machine.updateAt }}</span>
    </v-card-text>
    <v-expansion-panels>
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Описание:
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pa-0 text-wrap">
          <v-row
            class="pa-1 mt-lg-10"
            justify="end"
            align-content="end"
            align="end"
            dense
          >
            <confitm-dialog
              v-model="isDeleteDialog"
              :message="`Вы точно хотите удалить станок ${props.machine?.name}?`"
              @confirm="deleteMachine"
            >
              <v-btn
                class="mx-1 my-3 mx-lg-5"
                @click="isDeleteDialog = true"
                density="comfortable"
              >
                Удалить
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </confitm-dialog>
            <v-btn
              class="mx-1 my-3 mx-lg-5"
              :to="{
                name: 'MachinesDefects',
                params: { id: props.machine?.id },
              }"
              density="comfortable"
            >
              История
              <v-icon>mdi-arrow-right-bold-outline</v-icon>
            </v-btn>
            <v-btn
              density="comfortable"
              class="mx-1 mx-lg-5 my-3"
              :to="{ name: 'EditMachine', params: { id: props.machine?.id } }"
            >
              Изменить
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-row>
          <v-card-title class="text-wrap"
            >Модель: {{ props.machine.model || "-" }}
          </v-card-title>
          <v-card-title class="text-wrap"
            >Год ввода: {{ props.machine.startYear || "-" }}
          </v-card-title>
          <v-card-text v-if="props.machine?.description" class="text-wrap">
            <span class="v-card-subtitle ma-0 pa-0">Описание:</span
            >{{ props.machine.description }}
          </v-card-text>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row
      class="pa-1 mt-lg-10"
      justify="end"
      align-content="end"
      align="end"
      dense
    >
      <v-btn
        density="comfortable"
        class="mx-1 mx-lg-5 my-3"
        :to="
          props.machine?.isActive
            ? { name: 'AddDefect', query: { machine: props.machine?.id } }
            : {
                name: 'EditDefect',
                params: { id: props.machine?.defects[0]?.id },
              }
        "
      >
        Неисправен
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import Machine from "@/types/busnes/Machine";
import { PropType, defineProps, ref } from "vue";
import { useStore } from "vuex";
import ConfitmDialog from "@/components/confirmDialog.vue";

const props = defineProps({
  machine: { type: Object as PropType<Machine>, required: true },
});

const store = useStore();

const isDeleteLoading = ref(false);
const isDeleteDialog = ref(false);

const deleteMachine = () => {
  isDeleteLoading.value = true;
  try {
    store.dispatch("machines/deleteMachine", props.machine?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Станок ${props.machine?.name} успешно удалён.`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удалении станка ${props.machine?.name}.`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
