import { onAuthStateChanged } from "firebase/auth";
import Vue from "vue";
import App from "./App.vue";
import { auth } from "./firebase";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

let app;

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

// new Vue({
//   store,
//   router,
//   render: (h) => h(App),
// }).$mount("#app");
