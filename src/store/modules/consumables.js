import api from "@/api";
export default {
  namespaced: true,
  state: {
    consumables: [],
  },
  mutations: {
    set(state, consumables) {
      state.consumables = consumables;
    },
    push(state, type) {
      state.consumables.unshift(type);
    },
    replace(state, consumable) {
      state.consumables = state.consumables.map((d) =>
        d.id === consumable.id ? consumable : d
      );
    },
    delete(state, id) {
      state.consumables = state.consumables.filter((t) => t.id !== id);
    },
  },
  actions: {
    async fetch({ commit }) {
      const consumables = await api.consumables.list();

      commit("set", consumables.data);
    },
    async add({ commit }, dto) {
      const res = await api.consumables.add(dto);
      commit("push", res.data);
    },
    async delete({ commit }, id) {
      await api.consumables.drop(id);
      commit("delete", id);
    },
  },
  getters: {
    consumables(state) {
      return state.consumables;
    },
  },
};
