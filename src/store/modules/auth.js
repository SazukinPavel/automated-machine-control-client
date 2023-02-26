import api from "@/api";

export default {
  namespaced: true,
  state: {
    isLogedIn: false,
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLogedIn(state, val) {
      state.isLogedIn = val;
    },
    applyToken(_, token) {
      api.applyToken(token);
    },
  },
  actions: {
    async login({ dispatch }, loginDto) {
      await api.auth.login(loginDto);

      await dispatch("init");
    },
    async init({ commit }) {
      try {
        const me = await api.auth.me();
        commit("applyToken", me.data.token);

        commit("setUser", me.data.user);
        commit("setIsLogedIn", true);
      } catch {
        commit("setIsLogedIn", false);
        throw new Error();
      }
    },
    async logout({ commit }) {
      await api.auth.logout();

      commit("setUser", null);
      commit("setIsLogedIn", false);
    },
  },
  getters: {
    isLogedIn(state) {
      return state.isLogedIn;
    },
    user(state) {
      return state.user;
    },
    role(state) {
      return state.user?.role;
    },
  },
};
