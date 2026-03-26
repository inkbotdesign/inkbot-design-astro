import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react'; // Required for the embedded Sanity Studio

export default defineConfig({
  // Your live URL for SEO, Sitemap, and Canonical generation
  site: 'https://inkbot-design-astro.pages.dev',

  // Astro 6 defaults to 'static'. We use 'server' to allow for 
  // dynamic Sanity content and the embedded Studio.
  output: 'server',

  adapter: cloudflare({
    /**
     * IMAGE OPTIMIZATION (Astro 6 + Cloudflare v13)
     * 'compile' uses Sharp at build-time to optimize images for your static routes.
     * This fixes the "Cloudflare does not support sharp at runtime" error.
     */
    imageService: 'compile',

    /**
     * PLATFORM PROXY
     * Enables local access to Cloudflare features (KV, D1, Vars) during 'npm run dev'.
     */
    platformProxy: {
      enabled: true,
    },

    /**
     * RUNTIME CONFIG
     * Setting mode to 'off' prevents the build from failing if it can't find 
     * a "SESSION" KV binding, which is a common breaking change in v13.
     */
    runtime: {
      mode: 'off',
    },
  }),

  integrations: [
    // Support for MDX content and technical SEO sitemaps
    mdx(),
    sitemap(),
    
    // Required to render the Sanity Studio interface within Astro
    react(),

    sanity({
      // Uses Cloudflare Environment Variables first, falls back to your ID
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vsozkoub',
      dataset: 'production',
      useCdn: false, // Ensures branding content is always fresh
      apiVersion: '2024-03-26',

      /**
       * EMBEDDED STUDIO
       * This allows you to access your CMS at /admin on your live site.
       */
      studioBasePath: '/admin',

      /**
       * VISUAL EDITING (2026 Standard)
       * We keep stega disabled for now to ensure maximum build stability.
       */
      stega: {
        enabled: false,
      },
    }),
  ],

  // Optimization: Ensures Node.js built-ins don't crash the Cloudflare build
  vite: {
    ssr: {
      external: ['node:buffer', 'node:stream'],
    },
  },
});