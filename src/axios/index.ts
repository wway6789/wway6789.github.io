/*
 * @Author: wway 951357249@qq.com
 * @Date: 2023-11-02 16:40:45
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-26 00:30:08
 * @FilePath: \manage-system\src\axios\index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL+'api';
axios.defaults.withCredentials = false;
axios.defaults.timeout = 3000;
axios.defaults.method = "post";
axios.interceptors.request.use(
  (config: any) => {
    //console.log(config);

    return config;
  },
  (err: any) => { }
);
axios.interceptors.response.use(
  (config: any) => {
    //console.log(config);
    if (config.data.code == 0) {
      return config.data.result;
    }
    return config;
  },
  (err: any) => { }
);

export default axios;
