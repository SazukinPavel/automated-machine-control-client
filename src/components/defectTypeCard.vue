<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <v-card-title class="text-wrap">{{ props.type.name }}</v-card-title>
    <v-row justify="end" class="pa-3">
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.type?.name}, все неисправности с типом ${props.type?.name} будут удалены ?`"
        @confirm="deleteType"
      >
        <v-btn
          density="comfortable"
          :loading="isDeleteLoading"
          class="mx-1 my-2 mx-lg-5"
          @click="isDeleteDialog = true"
        >
          Удалить
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
      <v-btn
        density="comfortable"
        class="mx-1 my-2 mx-lg-5"
        :disabled="isDeleteLoading"
        :to="{ name: 'EditDefectType', params: { id: props.type?.id } }"
      >
        Изменить
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import ConfitmDialog from "@/components/confirmDialog.vue";
import { useStore } from "vuex";
import DefectType from "@/types/busnes/DefectType";

const props = defineProps({
  type: { type: Object as PropType<DefectType>, required: true },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

const deleteType = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("defectTypes/delete", props.type?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.type?.name} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.type?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
