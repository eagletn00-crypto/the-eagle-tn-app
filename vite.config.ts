import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // إضافة هذا السطر هو مفتاح الحل للمسارات في Vercel
  base: './', 
  server: {
    host: true,
    port: 5173
  }
})
