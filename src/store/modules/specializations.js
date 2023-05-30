import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    specializations: [],
  },
  mutations: {
    set(state, specializations) {
      state.specializations = specializations;
    },
    push(state, specialization) {
      state.specializations.unshift(specialization);
    },
    replace(state, specialization) {
      state.specializations = state.specializations.map((d) =>
        d.id === specialization.id ? specialization : d
      );
    },
    delete(state, id) {
      state.specializations = state.specializations.filter((t) => t.id !== id);
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

      const specializations = await api.specializations.list();

      commit("set", specializations.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, dto) {
      const res = await api.specializations.add(dto);
      commit("push", res.data);
    },
    async update({ commit }, dto) {
      const res = await api.specializations.update(dto);
      commit("replace", res.data);
    },
    async delete({ commit }, id) {
      await api.specializations.drop(id);
      commit("delete", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    specializations(state) {
      return state.specializations;
    },
  },
};
