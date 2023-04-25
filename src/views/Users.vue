<template>
  <div v-if="!isLoading">
    <v-row class="ma-4" dense="dense">
      <v-col style="min-width: 150px" cols="3">
        <search v-model="searchParam" />
      </v-col>
      <v-col>
        <add-btn :to="{ name: 'AddUser' }" />
      </v-col>
    </v-row>
    <user-card v-for="user in filtredUsers" :key="user.id" :user="user" />
  </div>
  <loading v-else></loading>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AddBtn from "@/components/ui/addBtn.vue";
import Loading from "@/components/loading.vue";
import Search from "@/components/search.vue";
import { useStore } from "vuex";
import User from "@/types/busnes/User";
import UserCard from "@/components/userCard.vue";

const store = useStore();

const isLoading = ref(false);
const searchParam = ref("");

const users = computed<User[]>(() => store.getters["users/users"]);
const filtredUsers = computed<User[]>(() => {
  if (!searchParam.value) {
    return users.value;
  }
  return users.value.filter((u) =>
    u.login.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("users/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при запросе ответственных",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
