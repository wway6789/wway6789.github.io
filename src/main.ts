/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-31 17:41:53
 * @FilePath: \manage-system\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ViewUIPlus from "view-ui-plus";
import 'view-ui-plus/dist/styles/viewuiplus.css';
// import {locale} from 'view-ui-plus/dist/locale/en-US';
import router from "./route";
import pinia from "./pinia";
import axios from "./axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
app.config.globalProperties.$axios = axios
app.use(pinia).use(router).use(ElementPlus).use(ViewUIPlus).mount("#app");
