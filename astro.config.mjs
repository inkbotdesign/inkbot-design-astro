import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  // Add your live URL here so the sitemap and RSS can generate correctly
  site: 'https://inkbot-design-astro.pages.dev', 
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      // This looks for the Cloudflare Variable first, then falls back to your ID
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vsozkoub',
      dataset: 'production',
      useCdn: false, 
      apiVersion: '2024-03-26',
    }),
  ],
});