export default {
  namespaced: true,
  state: {
    isBackButtonShow: false,
  },
  mutations: {
    setIsBackButtonShow(state, bool) {
      state.isBackButtonShow = bool;
    },
  },
  getters: {
    isBackButtonShow(state) {
      return state.isBackButtonShow;
    },
  },
};
