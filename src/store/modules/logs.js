import api from "@/api";
export default {
  namespaced: true,
  state: {
    logs: [],
    count: 0,
  },
  mutations: {
    setLogs(state, logs) {
      state.logs = logs;
    },
    setCount(state, count) {
      state.count = count;
    },
  },
  actions: {
    async fetch({ commit }, params) {
      const logs = await api.logs.list(params);

      commit("setLogs", logs.data);
    },
    async count({ commit }, params) {
      const count = await api.logs.count(params);

      commit("setCount", count.data);
    },
  },
  getters: {
    logs(state) {
      return state.logs;
    },
    count(state) {
      return state.count;
    },
  },
};
