import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isEditLoading: false,
    defects: [],
  },
  mutations: {
    setDefect(state, defects) {
      state.defects = defects;
    },
    pushDefect(state, defect) {
      state.defects.push(defect);
    },
    replaceDefect(state, defect) {
      state.defects = state.defects.map((d) =>
        d.id === defect.id ? defect : d
      );
    },
    deleteDefect(state, id) {
      state.defects = state.defects.filter((m) => m.id !== id);
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
        const defects = await api.defects.list();

        commit("setDefect", defects.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addDefectDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.defects.add(addDefectDto);
        commit("pushDefect", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async update({ commit }, updateDefectDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.defects.update(updateDefectDto);
        commit("replaceDefect", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async deletedefects({ commit }, defects) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          defects.forEach(async (id) => {
            await api.defects.drop(id);
            commit("deleteDefect", id);
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
    defects(state) {
      return state.defects;
    },
  },
};
