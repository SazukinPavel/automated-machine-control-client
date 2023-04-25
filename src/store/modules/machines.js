import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    machines: [],
  },
  mutations: {
    setMachines(state, machines) {
      state.machines = machines.map((m) => {
        m.isActive = m?.defects.every((d) => d.isResolved);
        return m;
      });
    },
    pushMachines(state, defect) {
      state.machines.push(defect);
    },
    replaceMachines(state, defect) {
      state.machines = state.machines.map((d) =>
        d.id === defect.id ? defect : d
      );
    },
    deleteMachine(state, id) {
      state.machines = state.machines.filter((m) => m.id !== id);
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

      const machines = await api.machines.list();

      commit("setMachines", machines.data);
      commit("setIsFetched", true);
    },
    async fetchByDepartamentId({ commit }, id) {
      const machines = await api.machines.list({ departament: id });
      commit("setMachines", machines.data);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addMachinesDto) {
      const res = await api.machines.add(addMachinesDto);
      commit("pushMachines", res.data);
    },
    async deleteMachine({ commit }, id) {
      await api.machines.drop(id);
      commit("deleteMachine", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    machines(state) {
      return state.machines;
    },
  },
};
