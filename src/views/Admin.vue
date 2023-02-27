<template>
  <v-card color="primary" variant="flat" class="ma-0 pa-0" width="100vw">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab value="departaments"> Департаменты </v-tab>
      <v-tab value="machines"> Машины </v-tab>
      <v-tab value="workers"> Работники </v-tab>
      <v-tab value="defect"> Дефекты </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="departaments">
        <v-card flat>
          <v-card-title>Департаменты</v-card-title>
        </v-card>
      </v-window-item>
      <v-window-item value="machines">
        <v-card flat>
          <v-card-title>machines</v-card-title>
        </v-card>
      </v-window-item>
      <v-window-item value="workers">
        <v-card flat>
          <v-card-title>workers</v-card-title>
        </v-card>
      </v-window-item>
      <v-window-item value="defect">
        <v-card flat>
          <v-card-title>defect</v-card-title>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tab = ref(0);
</script>

<style scoped></style>
