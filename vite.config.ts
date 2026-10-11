import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig(({ command }) => ({
  // На GitHub Pages сайт лежит по адресу /games/
  base: command === 'build' ? '/games/' : '/',
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
}))
