import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true,
    hmr: {
      port: 80,
    },
    proxy: {
      '/auth': {
        target: 'https://auth-dev-1.app.toradev.net',
        changeOrigin: true,
      }
    }
  }
})