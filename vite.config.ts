
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
    dedupe: ['react', 'react-dom']
  },
  build: {
    minify: mode === 'production' ? 'terser' : false,
    sourcemap: mode === 'development',
    cssMinify: mode === 'production',
    target: 'es2020',
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 500, // 500kb
    cssCodeSplit: true,
    modulePreload: true,
    treeshake: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            return 'vendor';
          }
          
          // Feature chunks
          if (id.includes('/pages/') || id.includes('/views/')) {
            return 'pages';
          }
          if (id.includes('/components/product/')) {
            return 'product-components';
          }
          if (id.includes('/contexts/') || id.includes('/stores/')) {
            return 'state-management';
          }
          if (id.includes('/utils/') || id.includes('/services/')) {
            return 'utilities';
          }
        },
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.name || 'unknown';
          let extType = assetName.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.svg'],
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      mangle: {
        safari10: true,
      },
    } : undefined,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  preview: {
    port: 8080,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=86400',
    }
  },
  cacheDir: '.vite-cache',
}));
