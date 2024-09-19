import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7100', // URL của backend
        changeOrigin: true,
        secure: false, // Nếu HTTPS là self-signed, đặt false
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
