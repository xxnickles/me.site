import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '0.0.0')
  },
  resolve: {
    alias: {
      // lucide package.json `module` field points to a wrong path
      'lucide': path.resolve(__dirname, 'node_modules/lucide/dist/esm/lucide/src/lucide.js')
    }
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: 'Alex Flechas — Software Engineer',
        short_name: 'Alex F.',
        theme_color: '#008080',
        icons: [
          { src: '/favicon.png', sizes: '192x192', type: 'image/png' }
        ]
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  build: {
    target: 'ES2022'
  }
});
