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
