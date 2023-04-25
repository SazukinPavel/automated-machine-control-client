import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    types: [],
  },
  mutations: {
    set(state, types) {
      state.types = types;
    },
    push(state, type) {
      state.types.push(type);
    },
    replace(state, type) {
      state.types = state.types.map((d) => (d.id === type.id ? type : d));
    },
    delete(state, id) {
      state.types = state.types.filter((t) => t.id !== id);
    },
    setIsFetched(state, val) {
      state.isFetched = val;
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      const machines = await api.consumableTypes.list();

      commit("set", machines.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, dto) {
      const res = await api.consumableTypes.add(dto);
      commit("push", res.data);
    },
    async update({ commit }, dto) {
      const res = await api.consumableTypes.update(dto);
      commit("replace", res.data);
    },
    async delete({ commit }, id) {
      await api.consumableTypes.drop(id);
      commit("delete", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    types(state) {
      return state.types;
    },
  },
};
