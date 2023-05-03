import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    departaments: [],
  },
  mutations: {
    setDepartament(state, departaments) {
      state.departaments = departaments;
    },
    pushDepartament(state, departament) {
      state.departaments.unshift(departament);
    },
    replaceDepartament(state, departament) {
      state.departaments = state.departaments.map((d) =>
        d.id === departament.id ? departament : d
      );
    },
    deleteDepartament(state, id) {
      state.departaments = state.departaments.filter((m) => m.id !== id);
    },
    setIsFetched(state, val) {
      state.isFetched = val;
    },
    setIsLoading(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      commit("setIsLoading", true);
      try {
        const departaments = await api.departaments.list();

        commit("setDepartament", departaments.data);
        commit("setIsFetched", true);
      } catch {
        commit("setIsFetched", false);
        throw new Error("");
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addDepartamentDto) {
      const res = await api.departaments.add(addDepartamentDto);
      commit("pushDepartament", res.data);
    },
    async update({ commit }, updateDepartamentDto) {
      const res = await api.departaments.update(updateDepartamentDto);
      commit("replaceDepartament", res.data);
    },
    async deleteDepartament({ commit }, id) {
      await api.departaments.drop(id);
      commit("deleteDepartament", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    isLoading(state) {
      return state.isLoading;
    },
    departaments(state) {
      return state.departaments;
    },
  },
};
