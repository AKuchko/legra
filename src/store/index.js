import { createStore } from "vuex";
import userStore from "./modules/user.store";
import sidebarStore from "./modules/sidebar.store";

const store = createStore({
  modules: {
    userStore,
    sidebarStore,
  },
});

export default store;
