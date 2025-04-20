
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: true,
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          framer: ['framer-motion'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-separator']
        },
        // Add compression to assets
        assetFileNames: assetInfo => {
          if (!assetInfo.name) return 'assets/unknown/[hash][extname]';
          
          let extType = assetInfo.name.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        // Add hashing to chunk names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    target: 'es2020',
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000, // 1000kb
    // Enable these for production
    cssCodeSplit: true,
    modulePreload: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  preview: {
    port: 8080,
    host: true,
  },
  // Add better file change detection
  cacheDir: '.vite-cache',
}));
