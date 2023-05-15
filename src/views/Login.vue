<template>
  <div class="d-flex justify-center align-center px-5">
    <v-form style="width: 500px; margin-top: 20vh" ref="loginForm">
      <v-card-title class="text-center text-h4 mb-5">Авторизация</v-card-title>
      <v-text-field
        class="my-5"
        :rules="[requiredRule]"
        label="Логин"
        v-model="loginDto.login"
      />
      <password-input
        class="my-5"
        label="Пароль"
        :rules="[requiredRule]"
        v-model="loginDto.password"
      />
      <div class="d-flex justify-end">
        <v-btn :loading="isLoading" color="primary" @click="login">Войти</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginDto from "@/types/dto/auth/LoginDto";
import { useStore } from "vuex";
import PasswordInput from "@/components/ui/passwordInput.vue";
import useValidators from "@/hooks/useValidators";

const loginForm = ref<any | null>(null);

const store = useStore();
const { requiredRule } = useValidators();

const loginDto = ref<LoginDto>({ login: "", password: "" });
const isLoading = ref(false);
const login = async () => {
  try {
    if (!(await loginForm.value?.validate()).valid) {
      return;
    }
    isLoading.value = true;
    await store.dispatch("auth/login", loginDto.value);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Такого пользователя нет",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
