import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    overlay: false,
    popUp: null,
    cardsDisplay: 0, // 0:格狀 1:條狀
  },
  mutations: {
    OVERLAY: (state, payload) => {
      state.overlay = payload;
    },
    CALL_POPUP: (state, payload) => {
      state.popUp = payload;
    },
    CHANGE_DISPLAY: (state, payload) => {
      state.cardsDisplay = payload;
    },
  },
  actions: {},
});
