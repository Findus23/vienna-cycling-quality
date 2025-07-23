import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      preact(),
      tailwindcss(),
  ],
  assetsInclude:["**/*.pmtiles"]
})
