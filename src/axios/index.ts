import axios from "axios";
// axios.defaults.baseURL = ;
console.log(import.meta.env.MODE == "prod");

axios.defaults.baseURL =
  import.meta.env.MODE == "prod"
    ? import.meta.env.VITE_BASE_URL + "api/"
    : "/apis/api";

console.log(axios.defaults.baseURL);

axios.defaults.timeout = 3000;
axios.defaults.method = "post";
axios.interceptors.request.use(
  (config: any) => {
    console.log(config);

    return config;
  },
  (err: any) => { }
);
axios.interceptors.response.use(
  (config: any) => {
    console.log(config);
    if (config.data.code == 0) {
      return config.data.result;
    }
    return config;
  },
  (err: any) => { }
);

export default axios;
