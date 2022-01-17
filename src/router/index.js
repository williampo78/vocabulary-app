import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/learn",
    name: "Learn",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "LearnIndex",
        component: () => import("@/views/Learn.vue"),
      },
    ],
  },
  {
    path: "",
    name: "AddWords",
    component: Layout,
    children: [
      {
        path: "/addWordsqq",
        name: "AddWordqqs",
        component: () => import("@/components/AddWords.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
