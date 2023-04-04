import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import compress from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compress()
  ],
  root: 'src',
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/endpoint': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'esnext',
    emptyOutDir: true,
    outDir: '../build',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
});
