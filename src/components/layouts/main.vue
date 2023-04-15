<template>
  <right-menu />
  <main style="margin-left: 60px">
    <slot></slot>
  </main>
  <snackbar />
</template>

<script setup lang="ts">
import snackbar from "../snackbar.vue";
import rightMenu from "./menu.vue";
</script>
