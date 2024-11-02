import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7100",
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['leaflet-geosearch'], // Loại bỏ module khỏi quá trình build
    },
  },
});
