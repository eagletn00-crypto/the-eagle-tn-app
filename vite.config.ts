import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // أضف هذا السطر في الأعلى

export default defineConfig({
  // ... (الإعدادات الحالية كما هي)
  plugins: [react()],
  
  // أضف هذا الجزء الجديد تماماً
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // ... (باقي الإعدادا
  define: {
    global: 'globalThis',
  },
  // ... إلخ
});
