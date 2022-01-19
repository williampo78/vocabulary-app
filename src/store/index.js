import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    overlay: false,
  },
  getters: {},
  mutations: {
    OVERLAY: (state, payload) => {
      state.overlay = payload;
    },
  },
  actions: {},
});
