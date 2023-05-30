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
      <password-input
        label="Пароль"
        :rules="[requiredRule]"
        v-model="addUserDto.password"
      />
      <v-select
        label="Роль"
        :rules="[requiredRule]"
        :items="roles"
        item-title="title"
        item-value="value"
        v-model="addUserDto.role"
      />
      <v-select
        v-if="addUserDto.role === 'worker'"
        label="Специальность"
        :rules="[requiredRule]"
        :items="specializations"
        item-title="name"
        item-value="id"
        v-model="addUserDto.specializationId"
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
import { ref, onMounted, computed } from "vue";
import AddUserDto from "@/types/dto/users/AddUserDto";
import PageTitle from "@/components/ui/pageTitle.vue";
import PasswordInput from "@/components/ui/passwordInput.vue";

const store = useStore();
const { requiredRule } = useValidators();
const { goBack, goTo } = useNavigateTo();

const isLoading = ref(false);
const userForm = ref<any | null>(null);
const addUserDto = ref<AddUserDto>({ login: "", role: "worker", password: "" });
const roles = ref([
  { title: "Админ", value: "admin" },
  { title: "Работник", value: "worker" },
]);

const specializations = computed(
  () => store.getters["specializations/specializations"]
);

const add = async () => {
  if (!(await userForm.value?.validate()).valid) {
    return;
  }

  isLoading.value = true;
  try {
    await store.dispatch("users/add", {
      ...addUserDto.value,
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

onMounted(async () => {
  await store.dispatch("specializations/fetch");
});
</script>

<style scoped></style>
