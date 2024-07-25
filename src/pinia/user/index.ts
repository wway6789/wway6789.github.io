/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-26 01:03:27
 * @FilePath: \manage-system\src\pinia\user\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { error } from "console";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { roleStore } from "../role";
export const userStore = defineStore("user", () => {
  let userInfo = ref({} as any);
  let isLogin = ref(false);
  let menuList = ref([] as any);
  const menu = roleStore().menu;
  const menuAdmin = roleStore().menuAdmin;
  const getUserName4bit = () => userInfo.value?.name?.slice(0, 4)
  const setUserInfo = (info: any) => { userInfo.value = info; isLogin.value = true; localStoreageFun([{ key: "userInfo", value: JSON.stringify(info) }, { key: "isLogin", value: JSON.stringify(true) }]) };
  const reset = () => { userInfo.value = {}; isLogin.value = false; localStorage.clear() };
  const getUserInfo = () => { userInfo.value = JSON.parse(localStorage.getItem("userInfo") || "{}"); isLogin.value = JSON.parse(localStorage.getItem("isLogin") || "false");menuList.value = JSON.parse(localStorage.getItem("menuList") || "[]") }
  const setUserMenu = () => { if (userInfo.value.role) { menuList.value = menuAdmin } else { menuList.value = menu } localStoreageFun([{ key: "menuList", value: JSON.stringify(menuList.value) }]) }
  const localStoreageFun = (params: any) => { params.map((item: any) => { localStorage.setItem(item.key, item.value) }) }
  return {
    userInfo,
    isLogin,
    menuList,
    getUserName4bit,
    setUserInfo,
    reset,
    localStoreageFun,
    getUserInfo,
    setUserMenu
  };
});
