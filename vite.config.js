import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
      injectRegister: 'auto',
      registerType: "autoUpdate",
      manifest: {
        "background_color": "#ffffff",
        "theme_color": "#ffffff",
        "name": "Lista de Compras",
        "short_name": "Listpicker",
        "display": "standalone",
        "icons": []
    }
    })
  ]
})