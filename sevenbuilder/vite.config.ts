import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable source maps in production for security
    minify: 'esbuild', // Fast and efficient minification
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'vendor': ['lz-string', 'html2canvas']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.log and debugger in production
  }
})
