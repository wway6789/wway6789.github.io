import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {} as any,
      isLogin:false
    };
  },
  getters: {
    getUserName: (state: any) => {
      return state.userInfo.name;
    },
    getUserId(): string {
      return this.userInfo.id;
    },
    checkLogin():boolean{
        return this.isLogin
    },
    getUserName4bit():string{
        return this.getUserName.substr(0,4)
    }
  },
  actions: {
    changeName(Name: any) {
      this.userInfo.name = Name;
    },
    saveUserInfo(params: object) {
      this.userInfo = params;
    },
  },
  persist: {
    enabled: true,
  },
});
