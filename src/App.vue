<template>
  <v-app>
    <app-main>
      <router-view />
    </app-main>
  </v-app>
</template>

<script setup lang="ts">
import appMain from "@/components/layouts/main.vue";
import { computed, ComputedRef, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Role from "@/types/utils/Role";
import useSeo from "@/hooks/useSeo";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { setTitle } = useSeo();

const isAuthLoading = ref(false);

onMounted(async () => {
  isAuthLoading.value = true;
  try {
    await authorize();
  } catch {
    redirectToLogin();
  } finally {
    isAuthLoading.value = false;
  }

  setupRouter();
});

const setupRouter = () => {
  router.beforeEach((to: any, from: any, next: any) => {
    if (!isLogedIn.value && to.path !== "/login") {
      redirectToLogin();
    } else if (
      !to.matched.some((el: any) => el.meta.isAdminRoute) &&
      role.value === "admin"
    ) {
      next(from);
    } else {
      next();
    }
  });
  router.afterEach((to: any) => {
    setTitle(to.meta.title);
  });
  setTitle(router.currentRoute.value.meta.title as string);
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

const redirect = () => {
  switch (role.value) {
    case "admin": {
      router.replace({ name: "LastDepartament" });
      break;
    }
    default: {
      router.push({ name: "Login" });
      break;
    }
  }
};

watch(
  () => role.value,
  () => {
    if (!isAuthLoading.value) {
      redirect();
    }
  }
);

watch(isLogedIn, (newVal) => {
  if (newVal) {
    store.dispatch("departaments/fetch");
  }
});
</script>
