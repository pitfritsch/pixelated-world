import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/pixelencounter": {
        target: "https://app.pixelencounter.com/api/basic",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/pixelencounter", ""),
      },
    },
  },
});
