import authService from "@/services/auth.service";

const defaultState = () => ({ user: {} });

export default {
  state: {
    user: {},
  },
  actions: {
    fetchUserInfo({ commit }) {
      return authService.fetchUserInfo().then((userInfo) => {
        commit("setUser", userInfo.data);
      });
    },
    updateUserInfo({ commit }, { field, value }) {
      commit("updateUser", { field, value });
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
    updateUser(state, { field, value }) {
      state.user[field] = value;
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
