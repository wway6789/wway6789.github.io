/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-25 21:20:42
 * @FilePath: \manage-system\src\pinia\user\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {} as any,
      isLogin: false
    };
  },
  getters: {
    getUserName: (state: any) => {
      return state.userInfo.name;
    },
    getUserId(): string {
      return this.userInfo.id;
    },
    checkLogin(): boolean {
      return this.isLogin
    },
    getUserName4bit(): string {
      let str = this.getUserName
      return str.length > 3 ? str.substr(0, 4) : str
    }
  },
  actions: {
    changeName(Name: any) {
      this.userInfo.name = Name;
    },
    saveUserInfo(params: object) {
      this.userInfo = params;
      localStorage.setItem("userInfo", JSON.stringify(params));
    },
  }
});
