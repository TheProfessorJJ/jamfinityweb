import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// site and base are driven by environment variables so switching from
// the GitHub Pages project URL to a custom domain requires zero code changes.
// Default: https://TheProfessorJJ.github.io + /jamfinityweb
const site = process.env.SITE ?? 'https://TheProfessorJJ.github.io';
const base = process.env.BASE ?? '/jamfinityweb';

export default defineConfig({
  site,
  base,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
