import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/product': {
        target: 'https://api.upcdatabase.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/product/, '/product'),
        secure: false,
        headers: {
          'Authorization': `Bearer ${process.env.VITE_UPC_API_TOKEN}`
        }
      },
      '/upc': {
        target: 'https://api.upcdatabase.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upc/, '/product'),
        secure: false,
        headers: {
          'Authorization': `Bearer ${process.env.VITE_UPC_API_TOKEN}`
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
