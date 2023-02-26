<template>
  <v-app>
    <app-header />
    <app-main>
      <router-view />
    </app-main>
  </v-app>
</template>

<script setup lang="ts">
import appHeader from "@/components/layouts/header/header.vue";
import appMain from "@/components/layouts/main.vue";
import { computed, ComputedRef, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  switch (role.value) {
    case "admin": {
      router.replace({ name: "Admin" });
      break;
    }
    case "manager": {
      router.replace({ name: "Manager" });
      break;
    }
    case "client": {
      router.replace({ name: "Client" });
      break;
    }
    default: {
      router.push({ name: "Login" });
      break;
    }
  }
  try {
    await authorize();
  } catch {
    redirectToLogin();
  }

  setupRouter();
});

const setupRouter = () => {
  if (
    route.matched.some((el: any) => !el.meta.isAdminRoute) &&
    role.value === "admin"
  ) {
    router.replace({ name: "Admin" });
  } else if (
    route.matched.some((el: any) => !el.meta.isManagerRoute) &&
    role.value === "manager"
  ) {
    router.replace({ name: "Manager" });
  } else if (isLogedIn.value && role.value === "client") {
    router.replace({ name: "Client" });
  }
  router.beforeEach((to: any, from: any, next: any) => {
    if (!isLogedIn.value && to.path !== "/login") {
      redirectToLogin();
    } else if (
      (!to.matched.some((el: any) => el.meta.isAdminRoute) &&
        role.value === "admin") ||
      (!to.matched.some((el: any) => el.meta.isManagerRoute) &&
        role.value === "manager") ||
      (!to.matched.some((el: any) => el.meta.isClientRoute) &&
        role.value === "client")
    ) {
      next(from);
    } else {
      next();
    }
  });
  router.afterEach((to: any) => {
    setTitle(to.name);
  });
};
const setTitle = (value: string) => {
  document.title = `${value} | Fitness`;
};
const authorize = async () => {
  await store.dispatch("auth/init");
};
const redirectToLogin = () => {
  if (route.name !== "Login") {
    router.replace({ name: "Login" });
  }
};

const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);
const role: ComputedRef<Role> = computed(() => store.getters["auth/role"]);

watch(
  () => role.value,
  () => {
    switch (role.value) {
      case "admin": {
        router.replace({ name: "Admin" });
        break;
      }
      case "manager": {
        router.replace({ name: "Manager" });
        break;
      }
      case "client": {
        router.replace({ name: "Client" });
        break;
      }
      default: {
        router.push({ name: "Login" });
        break;
      }
    }
  }
);
// const isLogedInPage = computed(() => route.name === "Login");
</script>
