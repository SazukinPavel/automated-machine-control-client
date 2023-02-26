import { createApp } from "vue";
import App from "./App.vue";
import "v-calendar/dist/style.css";
// @ts-ignore
import VCalendar from "v-calendar";

import router from "@/router";
import store from "@/store";
import vuetify from "@/vuetify";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);
app.use(VCalendar, {});

app.mount("#app");
