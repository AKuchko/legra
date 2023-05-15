import * as types from "@/store/mutations-types/rightColumn.types";
import { markRaw } from "vue";

const defaultState = () => ({
  rightColumnComponent: null,
  componentData: {},
  rightColumnState: false,
});

export default {
  state: {
    rightColumnComponent: null,
    componentData: {},
    rightColumnState: false,
  },
  actions: {
    setRightCompoent({ commit }, { component }) {
      commit(types.SET_RIGHT_COMPONET, component);
      commit(types.SET_RIGHT_STATE, true);
    },
    setRightColumnState({ commit }, { state }) {
      commit(types.SET_RIGHT_STATE, state);
    },
    setRightColumnData({ commit }, { data }) {
      commit(types.SET_RIGHT_DATA, data);
    },
    clearRightStore({ commit }) {
      commit(types.RESET_RIGHT_COLUMN);
    },
  },
  mutations: {
    [types.SET_RIGHT_COMPONET](state, component) {
      state.rightColumnComponent = markRaw(component);
    },
    [types.SET_RIGHT_STATE](state, newState) {
      state.rightColumnState = newState;
    },
    [types.SET_RIGHT_DATA](state, data) {
      state.componentData = data;
    },
    [types.RESET_RIGHT_COLUMN](state) {
      Object.assign(state, defaultState());
    },
  },
  getters: {
    rightColumnComponent: (state) => state.rightColumnComponent,
    rightColumnState: (state) => state.rightColumnState,
  },
};
