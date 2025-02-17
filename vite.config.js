import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/product': {
        target: 'https://api.upcdatabase.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/product/, '/product'),
        secure: false,
        headers: {
          'Authorization': 'Bearer DD29C03F5CD23BF4C7C3060F5AFA7BC4'
        }
      },
      '/upcapi': {
        target: 'https://api.upcdatabase.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upcapi/, ''),
        secure: false, // Added to handle HTTPS
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
        headers: {
          'Authorization': 'Bearer DD29C03F5CD23BF4C7C3060F5AFA7BC4'
        }
      },
      '/upc': {
        target: 'https://api.upcdatabase.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upc/, '/product'),
        secure: false,
        headers: {
          'Authorization': 'Bearer DD29C03F5CD23BF4C7C3060F5AFA7BC4'
        }
      }
    },
  },
});
