<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-5">
    <v-card-title>{{ props.departament.name }}</v-card-title>
    <v-row justify="end">
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.departament?.name}, станки в этом цеху тоже будут удалены?`"
        @confirm="deleteDepartament"
      >
        <v-btn
          density="comfortable"
          :loading="isDeleteLoading"
          class="mx-1 my-2 mx-lg-5"
          @click="isDeleteDialog = true"
        >
          Удалить <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
      <v-btn
        density="comfortable"
        class="mx-1 my-2 mx-lg-5"
        :disabled="isDeleteLoading"
        :to="{ name: 'EditDepartament', params: { id: props.departament?.id } }"
      >
        Изменить <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        density="comfortable"
        :disabled="isDeleteLoading"
        class="mx-1 my-2 mx-lg-5"
        :to="{ name: 'Departament', params: { id: props.departament?.id } }"
      >
        Перейти <v-icon>mdi-arrow-right-bold-outline</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import Departament from "@/types/busnes/Departament";
import ConfitmDialog from "@/components/confitmDialog.vue";
import { useStore } from "vuex";

const props = defineProps({
  departament: { type: Object as PropType<Departament>, required: true },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

const deleteDepartament = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch(
      "departaments/deleteDepartament",
      props.departament?.id
    );
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.departament?.name} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.departament?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
