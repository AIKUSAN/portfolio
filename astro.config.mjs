import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lorenztazan.com',
  devToolbar: { enabled: false },
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  integrations: [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/blog')
  })],
  redirects: {
    '/projects': '/work',
    '/skills': '/experience',
    '/education': '/about',
    '/Lorenz_Tazan_Resume.pdf': '/resume/lorenz-tazan-systems-cloud.pdf',
    '/resume.pdf': '/resume/lorenz-tazan-systems-cloud.pdf'
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro/assets/services/noop']
    },
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
