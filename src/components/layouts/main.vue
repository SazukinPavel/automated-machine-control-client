<template>
  <right-menu v-if="isLogedIn" />
  <main style="margin-left: 60px">
    <slot></slot>
  </main>
  <snackbar />
</template>

<script setup lang="ts">
import snackbar from "../snackbar.vue";
import rightMenu from "./menu.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);
</script>
