<template>
  <v-toolbar max-height="60px" class="px-5 align-center" color="primary">
    <v-btn v-if="isBackButtonShow" color="white" variant="text" @click="back"
      >back</v-btn
    >
    <v-spacer></v-spacer>
    <v-toolbar-items class="mr-5">
      <based-header />
      <authorizedHeader v-if="isLogedIn" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup lang="ts">
import authorizedHeader from "./authorizedHeader.vue";
import basedHeader from "./basedHeader.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const back = () => {
  router.go(-1);
};

const isBackButtonShow = computed(() => store.getters["app/isBackButtonShow"]);
const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);
</script>
