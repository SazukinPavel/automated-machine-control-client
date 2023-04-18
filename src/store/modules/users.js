import api from "@/api";
export default {
  namespaced: true,
  state: {
    isFetched: false,
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
    deleteUser(state, id) {
      state.users = state.users.filter((m) => m.id !== id);
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

      const users = await api.users.list();

      commit("setUsers", users.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addUsersDto) {
      const res = await api.users.add(addUsersDto);
      commit("pushUsers", res.data);
    },
    async update({ commit }, updateUserDto) {
      const res = await api.users.update(updateUserDto);
      commit("replaceUsers", res.data);
    },
    async deleteUser({ commit }, id) {
      await api.users.drop(id);
      commit("deleteUser", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    users(state) {
      return state.users;
    },
  },
};
