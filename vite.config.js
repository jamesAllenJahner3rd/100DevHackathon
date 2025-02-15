import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Change this to your desired host
    port: 3000, // You can also change the port if needed
  },
})