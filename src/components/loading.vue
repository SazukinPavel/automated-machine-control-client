<template>
  <div
    :class="`${
      allSpace ? 'full-loader' : 'loader'
    } d-flex justify-center align-center`"
  >
    <v-progress-circular color="primary" indeterminate size="75" width="8" />
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({ allSpace: { type: Boolean, default: false } });

const { allSpace } = toRefs(props);
</script>

<style scoped>
.loader {
  position: fixed;
  left: 10%;
  top: 0px;
  width: 90%;
  height: 100%;
}

.full-loader {
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100%;
}
</style>
