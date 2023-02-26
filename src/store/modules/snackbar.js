export default {
  namespaced: true,
  state: {
    message: null,
    timeout: 3000,
    color: "",
    buttonColor: "primary",
    visibility: false,
    top: false,
  },
  mutations: {
    showSnackbar(
      state,
      { message, timeout = 3000, color = "", buttonColor = "primary" }
    ) {
      state.message = message;
      state.timeout = timeout;
      state.visibility = true;
      state.color = color;
      state.buttonColor = buttonColor;
    },
    hideSnackbar(state) {
      state.visibility = false;
    },
    setVisibility(state, val) {
      state.visibility = val;
    },
    showSnackbarError(_, { message, timeout }) {
      const opts = {
        message,
        timeout,
        color: "red darken-3",
        buttonColor: "white",
      };

      this.commit("snackbar/showSnackbar", opts);
    },
    showSnackbarSuccess(_, { message, timeout }) {
      const opts = {
        message,
        timeout,
        color: "green darken-3",
        buttonColor: "white",
      };

      this.commit("snackbar/showSnackbar", opts);
    },
    setTop(state, val) {
      state.top = val;
    },
  },
  actions: {},
  getters: {
    visibility(state) {
      return state.visibility;
    },
    message(state) {
      return state.message;
    },
    timeout(state) {
      return state.timeout;
    },
    color(state) {
      return state.color;
    },
    buttonColor(state) {
      return state.buttonColor;
    },
    top(state) {
      return state.top;
    },
  },
};
