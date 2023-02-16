import { createStore } from "vuex";
import userStore from "./modules/user.store";

const store = createStore({
  modules: {
    userStore,
  },
});

export default store;
