<template>
  <v-container
    v-if="!isFetchLoading"
    style="max-width: 800px"
    class="pa-4 ma-auto mt-lg-15 mt-xl-15 mt-sm-10 mt-md-10"
  >
    <page-title>
      {{ props.isEdit ? "Изменение" : "Добавление" }}
      ответственного</page-title
    >
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
        v-if="!isEdit"
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
  <loading v-else />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import useNavigateTo from "@/hooks/useNavigateTo";
import { ref, onMounted, computed, defineProps } from "vue";
import AddUserDto from "@/types/dto/users/AddUserDto";
import PageTitle from "@/components/ui/pageTitle.vue";
import PasswordInput from "@/components/ui/passwordInput.vue";
import api from "@/api";
import { useRoute } from "vue-router";
import Loading from "@/components/loading.vue";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const route = useRoute();
const store = useStore();
const { requiredRule } = useValidators();
const { goBack, goTo } = useNavigateTo();

const isLoading = ref(false);
const isFetchLoading = ref(false);
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
    if (props.isEdit) {
      await store.dispatch("users/update", {
        ...addUserDto.value,
      });
    } else {
      await store.dispatch("users/add", {
        ...addUserDto.value,
      });
    }

    store.commit("snackbar/showSnackbarSuccess", {
      message: `Ответственный успешно ${props.isEdit ? "изменён" : "добавлен"}`,
    });
    goTo("Users");
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e.response?.data?.message ||
        `Произошла ошибка при ${
          props.isEdit ? "добавлении" : "изменении"
        } ответсвенного`,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  isFetchLoading.value = true;
  try {
    await store.dispatch("specializations/fetch");
    if (props.isEdit) {
      const { data } = await api.users.getById(route.params.id.toString());
      addUserDto.value = {
        ...data,
        specializationId: data.specialization.id,
      };
      if (data.specialization.isHide) {
        store.commit("specializations/push", data.specialization);
      }
    }
  } catch (e) {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при получении ответсвенного`,
    });
  } finally {
    isFetchLoading.value = false;
  }
});
</script>

<style scoped></style>
