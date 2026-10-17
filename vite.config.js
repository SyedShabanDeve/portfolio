import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  // three.js lives in its own lazily loaded chunk, so its size never blocks first paint
  build: { chunkSizeWarningLimit: 700 },
})
