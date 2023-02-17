import authService from "@/services/auth.service";

export default {
  state: {
    user: {},
  },
  actions: {
    fetchUserInfo(context) {
      return authService.fetchUserInfo().then((userInfo) => {
        context.commit("setUser", userInfo.data);
      });
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = {};
    },
  },
  getters: {
    userInfo(state) {
      return state.user;
    },
    isUserStored(state) {
      return Object.keys(state.user).length !== 0;
    },
  },
};
