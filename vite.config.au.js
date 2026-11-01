import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renameSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/* governveil.com.au builds from the same repo as governveil.com, into its own
   dist-au and its own Cloudflare Pages project. Rollup names the output after
   the input, so index-au.html is renamed to index.html on the way out —
   Cloudflare's SPA fallback serves that file for every path, which is what
   makes BrowserRouter work without a _redirects file. */

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'au-entry-as-index',
      closeBundle() {
        const out = resolve(__dirname, 'dist-au')
        const built = resolve(out, 'index-au.html')
        if (existsSync(built)) renameSync(built, resolve(out, 'index.html'))
      },
    },
  ],
  publicDir: 'public-au',
  build: {
    outDir: 'dist-au',
    emptyOutDir: true,
    rollupOptions: { input: resolve(__dirname, 'index-au.html') },
  },
  preview: { port: 4181, headers: { 'Cache-Control': 'no-store' } },
})
