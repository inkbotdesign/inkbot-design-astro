import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  // Your live URL for SEO & Sitemap generation
  site: 'https://inkbot-design-astro.pages.dev',
  
  // Astro 6 now defaults to 'static', but since you have a CMS and likely 
  // want dynamic features later, we'll keep it on 'server' mode.
  output: 'server',

  adapter: cloudflare({
    // CRITICAL FOR ASTRO 6: 
    // This resolves the "Cloudflare does not support sharp" warning from your logs.
    // 'compile' optimizes images at build time so they are instant on the live site.
    imageService: 'compile',
    
    // This allows your local 'npm run dev' to use real Cloudflare 
    // features like KV and Environment variables.
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vsozkoub',
      dataset: 'production',
      useCdn: false, // Recommended for the main site to ensure content is always fresh
      apiVersion: '2024-03-26',
      // Visual Editing is a 2026 standard - this keeps your studio stable
      stega: {
        enabled: false, 
      },
    }),
  ],
});