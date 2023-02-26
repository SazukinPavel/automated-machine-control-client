import { createStore } from "vuex";
import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";
import auth from "@/store/modules/auth";

export default createStore({
  modules: {
    app,
    auth,
    snackbar,
  },
});
