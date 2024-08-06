/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-08-06 14:18:21
 * @FilePath: \manage-system\src\route\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { tabStore } from "@/pinia/tabs";
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
    meta: { name: '热点新闻' },
    component: () => import("@/pages/main/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: { name: '用户管理' },
    component: () => import("@/pages/user/index.vue"),
  },
  {
    path: "/suggest",
    name: "suggest",
    meta: { name: '反馈建议' },
    component: () => import("@/pages/suggest/index.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: { name: '日历日程' },
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
  const usestate = userStore();
  const tabState = tabStore();
  usestate.getUserInfo()
  ViewUIPlus.LoadingBar.start();
  if (!usestate.isLogin || !usestate) {
    if (to.name == "login") {
      next();
    } else {
      next("login");
    }
  } else {
    tabState.addTab({
      path: to.path,
      name: to.name,
      meta: to.meta.name,
      color:'success'
    });
    if (!usestate.menuList.find((item: { path: string; }) => item.path == to.path) && to.path != '/') {
    
      next(from.path);
    } else {
      next();
    }
  }
});
router.afterEach(route => {
  ViewUIPlus.LoadingBar.finish();
});
export default router;
