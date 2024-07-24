import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ViewUIPlus from "view-ui-plus";
import 'view-ui-plus/dist/styles/viewuiplus.css';
// import {locale} from 'view-ui-plus/dist/locale/en-US';
import router from "./route";
import pinia from "./pinia";
import axios from "./axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios
app.use(pinia).use(router).use(ViewUIPlus).mount("#app");
