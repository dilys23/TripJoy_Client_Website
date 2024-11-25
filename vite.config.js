import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://192.168.1.11:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["leaflet-geosearch", "leaflet-geosearch/dist/geosearch.css"], // Loại bỏ module khỏi quá trình build
    },
  },
});
