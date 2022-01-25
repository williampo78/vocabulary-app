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
    path: "/favorite",
    name: "Favorite",
    component: Home,
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/learn",
        name: "Learn",
        component: () => import("@/views/Learn.vue"),
      },
    ],
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/addWords",
        name: "AddWords",
        component: () => import("@/views/AddWords.vue"),
      },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
