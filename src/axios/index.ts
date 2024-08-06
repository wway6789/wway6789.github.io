/*
 * @Author: wway 951357249@qq.com
 * @Date: 2023-11-02 16:40:45
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-31 15:56:11
 * @FilePath: \manage-system\src\axios\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { userStore } from "@/pinia/user";
import axios from "axios";
import pinia from "@/pinia/index";
import router from "@/route";
import { Notice } from "view-ui-plus";
const that =this
axios.defaults.baseURL = import.meta.env.VITE_API_URL + 'api';
axios.defaults.withCredentials = false;
axios.defaults.timeout = 3000;
axios.defaults.method = "post";
axios.interceptors.request.use(
  (config: any) => {
    //console.log(config);
    const userState = userStore(pinia)
    const userInfo = userState.userInfo;
    if (userInfo) {
      config.headers['userid'] = userInfo.id;
    } else {
      return router.push('/login')
    }
    return config;
  },
  (err: any) => {
    debugger
  }
);
axios.interceptors.response.use(
  (config: any) => {
    //console.log(config);
    if (config.data.code == 0) {
      return config.data.result;
    }
    return config;
  },

  (err: any) => {
    console.error(err.code);
    if (err.code === 'ERR_NETWORK') {
      Notice.warning({
        title: '注意',
        desc: '登录信息已过期,请重新登录'
    });
      setTimeout(() => {
        const state = userStore();
        state.reset();
      }, 3000)
    }

  }
);

export default axios;
