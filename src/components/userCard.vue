<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <v-card-title class="text-wrap">{{ props.user?.login }}</v-card-title>
    <v-row justify="end" class="pa-3">
      <v-btn
        density="comfortable"
        :loading="isGeneratePassLoading"
        class="mx-1 my-2 mx-lg-5"
        @click="generatePass"
      >
        Сгенерировать пароль
        <v-icon>mdi-lock-reset</v-icon>
      </v-btn>
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
          Удалить
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
    </v-row>
  </v-card>
  <v-dialog persistent v-model="isGeneratePassDialog">
    <v-card>
      <v-card-title
        >Новый пароль пользователя {{ props.user.login }}</v-card-title
      >
      <v-card-title>{{ newPassword }}</v-card-title>
      <div class="d-flex justify-end my-4">
        <v-btn class="mx-3" @click="closePassDialog">Закрыть</v-btn>
        <v-btn class="mx-3" @click="copyPass"
          >Скопировать <v-icon class="ml-2">mdi-content-copy</v-icon></v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import ConfitmDialog from "@/components/confitmDialog.vue";
import { useStore } from "vuex";
import User from "@/types/busnes/User";
import api from "@/api";

const props = defineProps({
  user: { type: Object as PropType<User>, required: true },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);
const isGeneratePassDialog = ref(false);
const isGeneratePassLoading = ref(false);
const newPassword = ref("");

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
const generatePass = async () => {
  try {
    isGeneratePassLoading.value = true;
    const res = await api.users.regeneratePass({ userId: props.user?.id });
    newPassword.value = res.data?.newPassword || "";
    isGeneratePassDialog.value = true;
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при создание нового пароля для пользователя ${props.user?.login}`,
    });
  } finally {
    isGeneratePassLoading.value = false;
  }
};

const closePassDialog = () => {
  newPassword.value = "";
  isGeneratePassDialog.value = false;
};

const copyPass = () => {
  navigator.clipboard.writeText(newPassword.value);
};
</script>

<style scoped></style>
