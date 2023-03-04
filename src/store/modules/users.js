import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isEditLoading: false,
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    pushUsers(state, defect) {
      state.users.push(defect);
    },
    replaceUsers(state, defect) {
      state.users = state.users.map((d) => (d.id === defect.id ? defect : d));
    },
    deleteUsers(state, id) {
      state.users = state.users.filter((m) => m.id !== id);
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
        const users = await api.users.list();

        commit("setUsers", users.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addUsersDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.users.add(addUsersDto);
        commit("pushUsers", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async update({ commit }, updateUserDto) {
      commit("setIsAddLoading", true);
      try {
        const res = await api.users.update(updateUserDto);
        commit("replaceUsers", res.data);
      } finally {
        commit("setIsAddLoading", false);
      }
    },
    async deleteusers({ commit }, users) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          users.forEach(async (id) => {
            await api.users.drop(id);
            commit("deleteUsers", id);
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
    users(state) {
      return state.users;
    },
  },
};
