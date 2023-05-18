<template>
  <div class="loader d-flex justify-center align-center">
    <v-progress-circular color="primary" indeterminate size="75" width="8" />
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  left: 10%;
  top: 0px;
  width: 90%;
  height: 100%;
  z-index: 9999;
}
</style>
