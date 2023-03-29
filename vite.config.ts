import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: { "@": path.join(__dirname, "src/") },
  },
  publicDir: "public",
  server: {
   proxy:{
    "/apis": {
      // target: 'http://' + import.meta.env.VITE_BASE_URL,
      target: "https://api.wwabc.top/", //
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/apis/, ""),
    },
   }
  },
});
