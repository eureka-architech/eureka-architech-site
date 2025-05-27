import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // We handle this manually for better control
    })
  ],
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    }
  }),
  site: 'https://eureka-products-services.vercel.app',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  server: {
    port: 4321,
    host: true
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate critical scripts from main bundle
            'critical': ['astro/jsx-runtime'],
            'vendor': ['tailwindcss']
          }
        }
      },
      cssCodeSplit: true,
      assetsInlineLimit: 4096, // Inline small assets
      minify: 'esbuild'
    },
    ssr: {
      noExternal: ['tailwindcss']
    },
    optimizeDeps: {
      include: ['tailwindcss']
    }
  },
  experimental: {
    contentCollectionCache: true
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  }
});