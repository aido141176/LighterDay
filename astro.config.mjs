// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || `https://${process.env.VERCEL_URL}`,
	integrations: [mdx(), sitemap(), react(), tinaDirective()],
	vite: {
		 plugins: [tailwindcss()],
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					// Suppress TinaCMS generated file warning
					// TODO: Relevant issue to follow and remove when that is fixed: https://github.com/tinacms/tinacms/issues/6386
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && 
						warning.exporter === 'tinacms/dist/client') {
						return;
					}
					warn(warning);
				}
			}
		}
	},
	  experimental: {
    // In 5.16.16, fonts MUST be inside experimental
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'Poppins',
        cssVariable: '--font-poppins',
        weights: [900], // Must be an array of numbers
      },
      {
        provider: fontProviders.fontsource(),
        name: 'Merriweather',
        cssVariable: '--font-merriweather',
        weights: [400],
      },
    ],
  },
});
