<template>
  <div class="d-flex justify-center align-center">
    <v-form style="width: 500px; margin-top: 20vh" ref="loginForm">
      <v-card-title class="text-center text-h4 mb-5">Login</v-card-title>
      <v-text-field
        class="my-5"
        :rules="[required]"
        label="Login:"
        v-model="loginDto.login"
      />
      <password-input
        class="my-5"
        label="Password:"
        :rules="[required]"
        v-model="loginDto.password"
      />
      <div class="d-flex justify-end">
        <v-btn color="primary" @click="login">Login</v-btn>
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
const { required } = useValidators();

const loginDto = ref<LoginDto>({ login: "", password: "" });

const login = async () => {
  try {
    if (!(await loginForm.value?.validate()).valid) {
      return;
    }

    await store.dispatch("auth/login", loginDto.value);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Такого пользователя нет",
    });
  }
};
</script>
