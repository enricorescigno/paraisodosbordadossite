
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
          ui: ['@radix-ui/react-slot', '@radix-ui/react-separator'],
          components: ['@/components/ui/button', '@/components/ui/apple-button', '@/components/ui/card'],
          utils: ['@/lib/utils', '@/utils/imageUtils']
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
    // Configuração para CDN (descomente e ajuste para seu CDN real)
    // publicPath: 'https://cdn.paraisodosbordados.com.br/',
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
  cacheDir: '.vite-cache',
}));
