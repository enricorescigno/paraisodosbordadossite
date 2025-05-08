
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    allowedHosts: 'all',
    host: "0.0.0.0",
    port: 8880,
    strictPort: true,
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
  css: {
    preprocessorOptions: {
      // Fix for CSS @import error
      order: 'preAndPostParsing'
    }
  },
  build: {
    minify: true,
    sourcemap: true, // Enable sourcemaps for debugging
    cssMinify: true,
    reportCompressedSize: false, // Disable size reporting to optimize build time
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          framer: ['framer-motion'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tooltip', '@radix-ui/react-avatar', '@radix-ui/react-select', '@radix-ui/react-tabs', '@radix-ui/react-dropdown-menu'],
        },
        assetFileNames: assetInfo => {
          const assetName = assetInfo.name || 'unknown';
          let extType = assetName.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/${assetName.replace(/\.[^/.]+$/, '')}-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    target: 'es2020',
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000, // 1000kb
    cssCodeSplit: true,
    modulePreload: true,
    treeshake: true,
    // Image compression settings (max compression level)
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.svg'],
  },
  define: { 
    "process.env": {} // Add process.env define for compatibility
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-error-boundary'],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  preview: {
    port: 8880,
    host: true,
    headers: {
      // Add cache control headers for better performance
      'Cache-Control': 'public, max-age=86400',
    }
  },
  cacheDir: '.vite-cache',
}));
