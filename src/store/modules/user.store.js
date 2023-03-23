import authService from "@/services/auth.service";
import postService from "@/services/post.service";

export default {
  state: {
    user: {},
    posts: [],
  },
  actions: {
    fetchUserInfo(context) {
      return authService.fetchUserInfo().then((userInfo) => {
        context.commit("setUser", userInfo.data);
      });
    },
    fetchUserPosts(context) {
      return postService.fetchUserPosts().then((userPosts) => {
        context.commit("setPosts", userPosts.data);
      });
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    removeUser(state) {
      state.user = {};
    },
  },
  getters: {
    userInfo(state) {
      return state.user;
    },
    userId(state) {
      return state.user.id;
    },
    userPosts(state) {
      return state.posts;
    },
    isUserStored(state) {
      return Object.keys(state.user).length !== 0;
    },
  },
};
