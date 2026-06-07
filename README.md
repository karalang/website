# karalang.org

Source for [karalang.org](https://karalang.org) — the website for the
[Kāra programming language](https://github.com/karalang/kara).

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build),
deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main` (plus a daily scheduled rebuild — see below).

## Editing the site

Pages are Markdown/MDX under `src/content/docs/`:

- `index.mdx` — the landing page (splash template)
- `guides/` — guide pages, listed in the sidebar configured in `astro.config.mjs`

Local development:

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## The Kāra Book (`/book/`)

The book's **source does not live in this repo**. It is an mdBook in the
compiler repo at [`karalang/kara`](https://github.com/karalang/kara) under
`docs/book/`, kept next to the compiler so language changes and their
documentation land in the same PR.

At deploy time the workflow checks out that repo (sparse, `docs/book` only),
renders it with a pinned mdBook release into `public/book/`, and Astro ships
the result verbatim at [karalang.org/book/](https://karalang.org/book/).
`public/book/` is gitignored here — never commit rendered book output.

Because the book is rendered from `karalang/kara@main`, book edits reach the
live site on the next deploy after they're pushed there: any website push, a
manual `workflow_dispatch`, or the daily scheduled rebuild.

## Custom domain notes

`public/CNAME` pins the `karalang.org` custom domain. Two GitHub Pages
behaviours that have bitten before:

- Switching the Pages build type (legacy ↔ workflow) **silently clears the
  custom domain** — re-set it afterwards.
- Re-setting the custom domain resets *Enforce HTTPS* to off — re-enable it
  once the certificate validates.
