<template>
  <v-text-field
    :model-value="props.value"
    @input="emit('update:value', $event.target.value)"
    :append-inner-icon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="rules"
    :type="isShow ? 'text' : 'password'"
    :label="label"
    @click:append-inner="isShow = !isShow"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  value: { type: String, required: true },
  rules: { type: Array, default: () => [], required: true },
  label: { type: String, default: "" },
});
const emit = defineEmits(["update:value"]);

const isShow = ref(false);
</script>

<style scoped></style>
