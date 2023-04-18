<template>
  <v-btn class="mt-1" append-icon="mdi-plus" :to="props.to">Добавить </v-btn>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({ to: {} });
</script>

<style scoped></style>
