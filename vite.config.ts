import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [react()],
  base: '/',
  // أضفنا هذا الجزء لحل مشكلة الـ Host
  preview: {
    allowedHosts: ['the-eagle-tn-app.onrender.com'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'
            }
            if (id.includes('@supabase/supabase-js')) {
              return 'supabase'
            }
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false
  }
})
