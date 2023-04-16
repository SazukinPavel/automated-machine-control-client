<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-5">
    <v-card-title class="text-end">
      <v-chip
        variant="outlined"
        :color="props.machine?.isActive ? 'green' : 'red'"
        >{{ props.machine.isActive ? "Активен" : "Не активен" }}</v-chip
      >
    </v-card-title>
    <v-card-title>{{ props.machine.name }}</v-card-title>
    <v-card-text class="text-end"
      ><span class="mx-2"
        >Создан:{{ formatDateTime(props.machine.createdAt) }}</span
      >
      <span class="mx-2">
        Обновлён:{{ formatDateTime(props.machine.updateAt) }}</span
      >
    </v-card-text>
    <v-expansion-panels v-if="props.machine?.description">
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Описание:</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          {{ props.machine.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="mt-3 mt-lg-10 d-flex justify-end">
      <v-btn
        class="mx-1 mx-lg-5"
        :to="{ name: 'EditMachine', params: { id: props.machine?.id } }"
      >
        Изменить <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить станок ${props.machine?.name}?`"
        @confirm="deleteMachine"
      >
        <v-btn class="mx-1 mx-lg-5" @click="isDeleteDialog = true">
          Удалить <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import Machine from "@/types/Machine";
import { PropType, defineProps, ref } from "vue";
import useDateFormater from "@/hooks/useDateFormater";
import { useStore } from "vuex";
import ConfitmDialog from "@/components/confitmDialog.vue";

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

const { formatDateTime } = useDateFormater();
</script>

<style scoped></style>
