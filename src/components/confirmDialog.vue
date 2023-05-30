<template>
  <slot></slot>
  <v-dialog
    @update:model-value="emit('update:modelValue', $event)"
    max-width="600"
    :model-value="modelValue"
  >
    <v-card class="py-10 px-5">
      <v-card-title class="text-wrap">{{ props.message }}</v-card-title>
      <div class="d-flex justify-center mt-4">
        <v-btn class="mx-2" @click="emit('update:modelValue', false)"
          >Отмена
        </v-btn>
        <v-btn class="mx-2" @click="emit('confirm')">Подтвердить</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  message: { type: String },
  modelValue: { type: Boolean, required: true },
});
const emit = defineEmits(["confirm", "update:modelValue"]);
</script>

<style scoped></style>
