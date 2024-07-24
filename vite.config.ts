/*
 * @Author: wway 951357249@qq.com
 * @Date: 2023-11-02 16:40:45
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-03-11 12:04:08
 * @FilePath: \manage-system\vite.config.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
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
    proxy: {
      "/apis": {
        // target: 'http://' + import.meta.env.VITE_BASE_URL,
        target: "https://34877b3d16.goho.co/", //
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ""),
      },
    }
  },
  build: {
    rollupOptions: {
      external: ['png'],
      output: {
        manualChunks: (file) => {
          if (file.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // 设置打包后的文件大小警告阈值
    assetsDir: "static",
    outDir: "dist",

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
        
      }
    }
  }
});
