import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://jobnow-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
    historyApiFallback: true,
  },
})
