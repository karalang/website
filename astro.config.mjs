// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://karalang.org',
	integrations: [
		starlight({
			title: 'Kāra',
			description:
				'Kāra is a compiled programming language with automatic parallelization, LLVM-backed native code, and WebAssembly support.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/karalang/kara' },
			],
			head: [
				// PNG fallbacks for the SVG favicon + social-card image.
				// Sources for the rendered PNGs live in brand/.
				{ tag: 'link', attrs: { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://karalang.org/og.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://karalang.org/og.png' } },
			],
			editLink: {
				baseUrl: 'https://github.com/karalang/website/edit/main/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [{ label: 'Getting Started', slug: 'guides/getting-started' }],
				},
				{
					label: 'The Kāra Book',
					// Rendered by mdBook from the compiler repo (kara/docs/book)
					// into public/book/ at deploy time — see .github/workflows/deploy.yml.
					link: '/book/',
				},
			],
		}),
	],
});
