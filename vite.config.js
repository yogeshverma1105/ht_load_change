import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
   server:{
    proxy: {
      // 1. Proxy for: https://htsanyojan.mpcz.in:8089/api/*
      '/api': {
        target: 'https://htsanyojan.mpcz.in:8089',
        changeOrigin: true,
        secure: false, // if SSL is self-signed
      },

      // 2. Proxy for: https://htsanyojanuat.mpcz.in:8088/ht_load_change/*
      '/ht_load_change': {
        target: 'https://htsanyojanuat.mpcz.in:8088',
        changeOrigin: true,
        secure: false,
      },
      '/htngb_backend': {
        target: 'https://uathtngb.mpcz.in:8888',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
