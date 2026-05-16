# Aesthetify ✦

> *Curate Your World* — An aesthetic e-commerce shop for phone cases, tablet cases, and lifestyle accessories.

Built with **Shopify Hydrogen V2** (Remix), **Sanity CMS**, and **TailwindCSS**. Deployed on a Linux VPS with Nginx.

---

## Stack

| | Technology |
|---|---|
| Frontend | Shopify Hydrogen V2 (Remix) |
| Commerce | Shopify Storefront API |
| CMS | Sanity v3 |
| Styling | TailwindCSS |
| Language | TypeScript |
| Deployment | Linux VPS + Nginx + PM2 |
| CI/CD | GitHub Actions |

## Design Methodology

We use the **Five Elements of UX Design** (Jesse James Garrett) as our development framework, building from Strategy → Scope → Structure → Skeleton → Surface, one sprint at a time.

See [`docs/PROJECT_OUTLINE.md`](docs/PROJECT_OUTLINE.md) for the full project scope and commit roadmap.

## Development Setup

### Prerequisites

1. Node.js v20+ — `winget install OpenJS.NodeJS.LTS`
2. Shopify Partner account + development store
3. Shopify Storefront API access token
4. Sanity account

### Quick Start

```bash
npm install
cp .env.example .env
# Fill in your Shopify and Sanity credentials in .env
npm run dev
```

## Opinions

Following the [hydrogen-sanity demo](https://github.com/sanity-io/hydrogen-sanity-demo) approach:

- **Shopify** is the primary source of truth for products and collections
- **Sanity** is the primary source of truth for editorial content
- Product pages can be enhanced with content managed in Sanity

## Project Structure

```
aesthetify/
├── app/
│   ├── components/      # Reusable UI components
│   ├── routes/          # Remix file-based routing
│   ├── styles/          # Global CSS + Tailwind base
│   └── lib/             # Utilities, types, helpers
├── docs/                # Project outline, LinkedIn posts
├── study/               # Learning notes and practice exercises
├── server.ts            # Remix server entry
└── sanity/              # Sanity schema definitions
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `chore:` — setup, config, dependencies
- `feat:` — new feature or component
- `fix:` — bug fix
- `style:` — visual/CSS changes only
- `docs:` — documentation
- `refactor:` — restructure without behavior change

## Resources

- [Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [hydrogen-sanity](https://github.com/sanity-io/hydrogen-sanity)
- [Marco Heine's Tutorial](https://marcoheine.com/blog/e-commerce-website-with-shopify-hydrogen)
- [Project Outline](docs/PROJECT_OUTLINE.md)
- [Study Lessons](study/)

---

*Building in public. Follow along on LinkedIn.*
