<template>
  <v-layout full-height>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-form style="width: 500px; margin-top: 20vh" ref="loginForm">
          <v-card-title class="text-center text-h4 mb-5">Login</v-card-title>
          <v-text-field
            class="my-5"
            color="primary"
            :rules="requiredRule"
            variant="outlined"
            label="Login:"
            v-model="loginDto.login"
          />
          <v-text-field
            class="my-5"
            label="Password:"
            color="primary"
            :rules="requiredRule"
            variant="outlined"
            v-model="loginDto.password"
          />
          <div class="d-flex justify-end">
            <v-btn color="primary" @click="login">Login</v-btn>
          </div>
        </v-form>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginDto from "@/types/dto/auth/LoginDto";
import { useStore } from "vuex";

const loginForm = ref<any | null>(null);

const store = useStore();

const requiredRule = [(val: string) => !!val || "Поле обязательно!"];
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
