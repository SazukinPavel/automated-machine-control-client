<template>
  <v-main class="ma-0">
    <v-layout class="ma-0">
      <v-row class="ma-0">
        <v-container class="ma-0 pa-0">
          <slot></slot>
        </v-container>
      </v-row>
    </v-layout>
    <snackbar />
  </v-main>
</template>

<script>
import snackbar from "../snackbar.vue";

export default {
  name: "app-main",
  components: { snackbar },
};
</script>
