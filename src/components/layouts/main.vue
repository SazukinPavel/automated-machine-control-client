<template>
  <v-main>
    <v-layout>
      <v-row>
        <v-container class="mt-5">
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
