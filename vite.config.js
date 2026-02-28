import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy TCGdex images so they load when the CDN blocks hotlinking (e.g. from localhost)
      '/tcgdex-assets': {
        target: 'https://assets.tcgdex.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tcgdex-assets/, ''),
      },
    },
  },
})
