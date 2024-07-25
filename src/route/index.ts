/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-26 01:11:47
 * @FilePath: \manage-system\src\route\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { userStore } from "@/pinia/user";
import ViewUIPlus from 'view-ui-plus';

const route = useRouter();
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRouter,
} from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "index",
    alias: "/",
    meta: { name: '首页' },
    component: () => import("@/pages/welcome/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { name: '登录' },
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/news",
    name: "news",
    meta: { name: '新闻' },
    component: () => import("@/pages/main/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: { name: '用户' },
    component: () => import("@/pages/user/index.vue"),
  },
  {
    path: "/suggest",
    name: "suggest",
    meta: { name: '建议' },
    component: () => import("@/pages/suggest/index.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: { name: '日历' },
    component: () => import("@/pages/calendar/index.vue"),
  },
  {
    path: "/*",
    name: "404",
    component: () => import("@/pages/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  const state = userStore();
  state.getUserInfo()
  ViewUIPlus.LoadingBar.start();
  if (!state.isLogin || !state) {
    if (to.name == "login") {
      next();
    } else {
      next("login");
    }
  } else {
    if (!state.menuList.find((item: { path: string; }) => item.path == to.path) && to.path !='/') {
      next(from.path);
    }else{
      next();
    }
  }
});
router.afterEach(route => {
  ViewUIPlus.LoadingBar.finish();
});
export default router;
