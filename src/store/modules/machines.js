import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isEditLoading: false,
    machines: [],
  },
  mutations: {
    setMachines(state, machines) {
      state.machines = machines;
    },
    pushMachines(state, defect) {
      state.machines.push(defect);
    },
    replaceMachines(state, defect) {
      state.machines = state.machines.map((d) =>
        d.id === defect.id ? defect : d
      );
    },
    deleteMachines(state, id) {
      state.machines = state.machines.filter((m) => m.id !== id);
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
        const machines = await api.machines.list();

        commit("setMachines", machines.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addMachinesDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.machines.add(addMachinesDto);
        commit("pushMachines", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async update({ commit }, updateMachineDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.machines.update(updateMachineDto);
        commit("replaceMachines", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async deletemachines({ commit }, machines) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          machines.forEach(async (id) => {
            await api.machines.drop(id);
            commit("deleteMachines", id);
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
    machines(state) {
      return state.machines;
    },
  },
};
