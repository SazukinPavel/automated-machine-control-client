<template>
  <v-container
    style="max-width: 800px"
    class="pa-4 ma-auto mt-lg-15 mt-xl-15 mt-sm-10 mt-md-10"
  >
    <page-title> Добавление ответственного</page-title>
    <v-form ref="userForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        variant="outlined"
        label="Имя"
        color="primary"
        v-model="addUserDto.login"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isLoading" @click="add">Добавить</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import useNavigateTo from "@/hooks/useNavigateTo";
import { ref, onMounted } from "vue";
import AddUserDto from "@/types/dto/users/AddUserDto";
import PageTitle from "@/components/ui/pageTitle.vue";

const store = useStore();
const { requiredRule } = useValidators();
const { goBack, goTo } = useNavigateTo();

const isLoading = ref(false);
const userForm = ref<any | null>(null);
const addUserDto = ref<AddUserDto>({ login: "", role: "user" });

const add = async () => {
  if (!(await userForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;
  try {
    await store.dispatch("users/add", {
      ...addUserDto.value,
      password: addUserDto.value.login,
    });
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Ответсвенный успешно добавлен`,
    });
    goTo("Users");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при добавление ответсвенного`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {});
</script>

<style scoped></style>
