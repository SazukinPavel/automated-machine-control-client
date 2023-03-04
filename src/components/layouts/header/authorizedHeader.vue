<template>
  <v-container class="ma-0 pa-0 ml-3" v-if="isLogoutButtonShow">
    <p
      style="width: 150px; cursor: pointer"
      class="mt-3 white--text text-sm-h6"
      @click="logout"
    >
      Выйти
      <v-icon color="white" icon="mdi-logout"></v-icon>
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const logout = () => {
  store.reset();
};

const isLogoutButtonShow = computed(() => store.getters["auth/isLogedIn"]);
</script>
