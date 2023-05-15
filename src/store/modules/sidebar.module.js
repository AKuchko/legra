import * as types from "@/store/mutations-types/sidebar.types";
import MainWindow from "@/components/sidebarLayers/MainLayer.vue";
import { markRaw } from "vue";

export default {
  state: {
    currentComponent: markRaw(MainWindow),
    sidebarState: false,
  },
  actions: {
    toggleComponent({ commit }, { component }) {
      commit(types.SET_SIDEBAR_COMPONENT, component);
    },
    toggleBarState({ commit }, { state }) {
      commit(types.SET_SIDEBAR_STATE, state);
    },
  },
  mutations: {
    [types.SET_SIDEBAR_COMPONENT](state, component) {
      state.currentComponent = markRaw(component);
    },
    [types.SET_SIDEBAR_STATE](state, newState) {
      state.sidebarState = newState;
    },
  },
  getters: {
    sidebarComponent: (state) => state.currentComponent,
    sidebarState: (state) => state.sidebarState,
  },
};
