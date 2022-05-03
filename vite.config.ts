import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
    'process.env': process.env,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['logo.svg', 'robots.txt'],
      manifest: {
        name: 'circles',
        short_name: 'circles',
        icons: [
          {
            src: 'logo_16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'logo_32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'logo_48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'logo_64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'logo_128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'logo_256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'logo_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'logo_1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
        ],
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#538fff',
      },
    }),
  ],
});
