import authService from "@/services/auth.service";

const defaultState = () => ({ user: {} });

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
    resetUser({ commit }) {
      commit("resetUserStore");
    },
  },
  mutations: {
    setUserBIO(state, { user_name, profile_name, description }) {
      state.user.user_name = user_name;
      state.user.profile_name = profile_name;
      state.user.description = description;
    },
    setUserImage(state, new_media) {
      state.user.profile_image.push(new_media);
    },
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    resetUserStore(state) {
      Object.assign(state, defaultState());
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
