import api from "@/api";
export default {
  namespaced: true,
  state: {
    defects: [],
  },
  mutations: {
    setDefects(state, defects) {
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
  },
  actions: {
    async fetch({ commit }, params) {
      const defects = await api.defects.list(params);

      commit("setDefects", defects.data);
    },
    async add({ commit }, addDefectDto) {
      const res = await api.defects.add(addDefectDto);
      commit("pushDefect", res.data);
    },
    async update({ commit }, updateDefectDto) {
      const res = await api.defects.update(updateDefectDto);
      commit("replaceDefect", res.data);
    },
    async deleteDefect({ commit }, id) {
      await api.defects.drop(id);
      commit("deleteDefect", id);
    },
  },
  getters: {
    defects(state) {
      return state.defects;
    },
  },
};
