import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    overlay: false,
    popUp: null,
  },
  mutations: {
    OVERLAY: (state, payload) => {
      state.overlay = payload;
    },
    CALL_POPUP: (state, payload) => {
      state.popUp = payload;
    },
  },
  actions: {},
});
