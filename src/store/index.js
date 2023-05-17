import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";
import auth from "@/store/modules/auth";
import users from "@/store/modules/users";
import machines from "@/store/modules/machines";
import departaments from "@/store/modules/departaments";
import defects from "@/store/modules/defects";
import consumables from "@/store/modules/consumables";
import consumableTypes from "@/store/modules/consumableTypes";
import defectTypes from "@/store/modules/defectTypes";
import logs from "@/store/modules/logs";
import { createStore } from "vuex-extensions";
import { Store } from "vuex";

export default createStore(Store, {
  modules: {
    app,
    auth,
    snackbar,
    defects,
    machines,
    users,
    departaments,
    consumables,
    consumableTypes,
    defectTypes,
    logs,
  },
});
