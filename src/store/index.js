import { createStore } from "vuex";
import rightColumnModule from "./modules/rightColumn.module";
import sidebarModule from "./modules/sidebar.module";
import userModule from "./modules/user.module";

const store = createStore({
  modules: {
    userModule,
    sidebarModule,
    rightColumnModule,
  },
});

export default store;
