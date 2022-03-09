import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    overlay: false,
    popUp: null,
    sidebar: false,
    cards: [],
  },
  mutations: {
    OVERLAY: (state, payload) => {
      state.overlay = payload;
    },
    CALL_POPUP: (state, payload) => {
      state.popUp = payload;
    },
    TOGGLE_SIDEBAR: (state, payload) => {
      state.sidebar = payload;
    },
    GET_WORDS: (state, payload) => {
      state.cards = payload;
    },
  },
  actions: {},
});
