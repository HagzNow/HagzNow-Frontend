import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'; // ← ضيف السطر ده

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← وضيف Tailwind هنا كبلجن
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure service worker is in root
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          // Keep service worker in root
          if (assetInfo.name === 'sw.js') {
            return 'sw.js';
          }
          return 'assets/[name].[hash].[ext]';
        },
      },
    },
  },
  publicDir: 'public',
});
