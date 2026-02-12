import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';
import path from 'node:path';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '0.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __GIT_HASH__: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim())
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
    target: 'ES2022',
    rollupOptions: {
      output: {
        manualChunks: {
          'win-window': ['src/components/win-window.ts'],
          'win-dialog': ['src/components/win-dialog.ts'],
          'tb-clock':   ['src/components/tb-clock.ts'],
          'tb-theme':   ['src/components/tb-theme.ts'],
          'tb-version': ['src/components/tb-version.ts'],
          'tb-status':  ['src/components/tb-status.ts'],
        }
      }
    }
  }
});
