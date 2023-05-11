import * as types from "@/store/mutations-types/sidebar.types";
import MainWindow from "@/components/sidebarLayers/MainLayer.vue";
import { markRaw } from "vue";

export default {
  state: {
    currentComponent: markRaw(MainWindow),
  },
  actions: {
    toggleComponent({ commit }, { component }) {
      commit(types.SET_SIDEBAR_COMPONENT, component);
    },
  },
  mutations: {
    [types.SET_SIDEBAR_COMPONENT](state, component) {
      state.currentComponent = markRaw(component);
    },
  },
  getters: {
    sidebarComponent: (state) => state.currentComponent,
  },
};
