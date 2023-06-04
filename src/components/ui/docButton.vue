<template>
  <v-btn class="mx-3" :loading="props.loading"
    >Отчёт
    <v-dialog v-model="dialog" activator="parent" width="80%" max-width="500px">
      <v-card class="pa-5">
        <v-card-title>Выберите даты</v-card-title>
        <v-text-field
          type="date"
          label="От"
          :max="endDate"
          v-model="startDate"
        ></v-text-field>
        <v-text-field
          type="date"
          label="До"
          :min="startDate"
          v-model="endDate"
        ></v-text-field>
        <v-row justify="end">
          <v-btn class="mx-3" density="comfortable" @click="download"
            >Скачать</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(["download"]);
const props = defineProps(["loading"]);

const dialog = ref(false);
const startDate = ref();
const endDate = ref();

const download = async () => {
  dialog.value = false;
  emit("download", { startDate: startDate.value, endDate: endDate.value });
};
</script>

<style scoped></style>
