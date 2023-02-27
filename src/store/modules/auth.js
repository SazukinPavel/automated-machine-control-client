import CookiesService from "@/services/CookiesService";
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
    logout(state) {
      CookiesService.resetToken();
      state.isLogedIn = false;
      state.user = null;
    },
    applyToken(_, token) {
      api.applyToken(token);
    },
  },
  actions: {
    async login({ dispatch }, loginDto) {
      const data = await api.auth.login(loginDto);
      CookiesService.setToken(data.data.accessToken);
      await dispatch("init");
    },
    async init({ commit }) {
      const tokenCookie = CookiesService.getToken();
      if (tokenCookie === "") {
        throw new Error("Token is empty!");
      }

      try {
        commit("applyToken", tokenCookie);
        const me = await api.auth.me();

        CookiesService.setToken(me.data.accessToken);
        commit("applyToken", me.data.accessToken);

        commit("setUser", me.data.user);
        commit("setIsLogedIn", true);
      } catch {
        commit("setIsLogedIn", false);
        CookiesService.resetToken();
        throw new Error();
      }
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
