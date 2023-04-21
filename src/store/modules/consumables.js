import api from "@/api";
export default {
  namespaced: true,
  state: {
    consumables: [],
  },
  mutations: {
    setConsumables(state, consumables) {
      state.consumables = consumables;
    },
  },
  actions: {
    async fetch({ commit }) {
      const consumables = await api.consumables.list();

      commit("setConsumables", consumables.data);
    },
  },
  getters: {
    consumables(state) {
      return state.consumables;
    },
  },
};
