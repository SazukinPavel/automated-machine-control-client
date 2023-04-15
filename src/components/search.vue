<template>
  <v-text-field
    density="compact"
    class="mr-2"
    label="Поиск.."
    :model-value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({ modelValue: { type: String, required: true } });
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
