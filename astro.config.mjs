import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: 'vsozkoub',
      dataset: 'production',
      useCdn: false, // Better for local development so you see changes instantly
      apiVersion: '2024-03-26',
    }),
  ],
});