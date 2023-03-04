import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isEditLoading: false,
    departaments: [],
  },
  mutations: {
    setDepartament(state, departaments) {
      state.departaments = departaments;
    },
    pushDepartament(state, departament) {
      state.departaments.push(departament);
    },
    replaceDepartament(state, departament) {
      console.log(departament);
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
    setIsAddLoading(state, val) {
      state.isAddLoading = val;
    },
    setIsDeleteLoading(state, val) {
      state.isDeleteLoading = val;
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
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addDepartamentDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.departaments.add(addDepartamentDto);
        commit("pushDepartament", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async update({ commit }, updateDepartamentDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.departaments.update(updateDepartamentDto);
        commit("replaceDepartament", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async deletedepartaments({ commit }, departaments) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          departaments.forEach(async (id) => {
            await api.departaments.drop(id);
            commit("deleteDepartament", id);
          })
        );
      } finally {
        commit("setIsDeleteLoading", false);
      }
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isAddLoading(state) {
      return state.isAddLoading;
    },
    isDeleteLoading(state) {
      return state.isDeleteLoading;
    },
    departaments(state) {
      return state.departaments;
    },
  },
};
