<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-5">
    <v-card-title class="text-wrap">{{ props.user?.login }}</v-card-title>
    <v-row justify="end">
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.user?.login}?`"
        @confirm="deleteUser"
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
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import ConfitmDialog from "@/components/confitmDialog.vue";
import { useStore } from "vuex";
import User from "@/types/busnes/User";

const props = defineProps({
  user: { type: Object as PropType<User>, required: true },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

const deleteUser = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("users/deleteUser", props.user?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.user?.login} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.user?.login}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
