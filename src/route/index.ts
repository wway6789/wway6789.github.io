import { userStore } from "@/pinia/user";
const route = useRouter();
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRouter,
} from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/news",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/pages/main/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/pages/user/index.vue"),
  },
  {
    path: "/suggest",
    name: "suggest",
    component: () => import("@/pages/suggest/index.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("@/pages/calendar/index.vue"),
  },
  {
    path: "/*",
    component: () => import("@/pages/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to,from,next) => {

  if (!userStore().checkLogin) {
    if (to.name == "login") {
      next();
    } else {
      next("login");
    }
  } else {
    next();
  }
});
export default router;
