import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/Layout.vue";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

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
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "",
    component: Layout,
    beforeEnter: requireAuth,
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
    beforeEnter: requireAuth,
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
