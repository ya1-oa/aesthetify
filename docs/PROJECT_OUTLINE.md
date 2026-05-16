# Aesthetify — Project Outline & Scope
> A production-grade aesthetic e-commerce shop built with Shopify Hydrogen V2, Sanity CMS, and TailwindCSS

---

## 1. Brand Identity

| Attribute | Value |
|---|---|
| **Brand Name** | Aesthetify |
| **Tagline** | *Curate Your World* |
| **Category** | Aesthetic accessories — phone cases, tablet cases, lifestyle products |
| **Target Audience** | Gen Z / Millennial women, 16–30, visual-first social media users |
| **Tone** | Soft, elevated, minimal, feminine but not childish |
| **Color Palette** | Blush pink `#FFD6E0`, Soft lavender `#E8D5F5`, Cream `#FFF8F5`, Dusty rose `#C9919E`, Dark charcoal `#1A1A2E` |
| **Typography** | Display: *Playfair Display* (serif, editorial) — Body: *DM Sans* (clean, modern) |
| **Social** | Instagram, TikTok, X, Pinterest |

---

## 2. Design Methodology: Five Elements of UX (Jesse James Garrett)

We use the **Five Elements of UX Design** as our commit-by-commit development framework. Each layer maps to a sprint phase and a LinkedIn content series.

```
Surface  ← Visual polish, animations, brand feel        [Sprint 4+]
Skeleton ← Components, layout, navigation               [Sprint 3]
Structure← Routes, information architecture             [Sprint 2]
Scope    ← Feature list, content requirements           [Sprint 1 ←YOU ARE HERE]
Strategy ← User needs + business goals                  [Sprint 0 ✓]
```

Why this pattern?
- It builds from abstract → concrete, matching how Hydrogen + Sanity layers work
- Each LinkedIn post teaches one layer, making it a 5-part series
- It produces visible progress every sprint (great for portfolio)
- It prevents scope creep by forcing "does this belong in this layer?" thinking

---

## 3. Tech Stack Decision

| Layer | Technology | Why |
|---|---|---|
| **Frontend Framework** | Shopify Hydrogen V2 (Remix) | Built-in cart, product, collection handling; Remix loaders/actions are clean |
| **Commerce Backend** | Shopify Storefront API | Industry standard, handles inventory, checkout, payments |
| **CMS** | Sanity v3 | Structured content, real-time preview, Shopify product sync |
| **Styling** | TailwindCSS | Utility-first, fast iteration, great with design tokens |
| **Language** | TypeScript | Type safety catches bugs early, required for senior dev portfolio |
| **Deployment** | Linux VPS + Nginx + PM2 | Full DevOps control (better for portfolio than Oxygen) |
| **CI/CD** | GitHub Actions | Auto-deploy on push to `main` |
| **Version Control** | GitHub | Public repo (portfolio signal) |

**On skipping Oxygen:** The tutorial uses Shopify's free Oxygen hosting. We deliberately skip it for the Linux VPS because:
1. It shows DevOps skill (Nginx config, process management, SSL)
2. You own the infrastructure (no vendor lock-in)
3. Better story for LinkedIn + resume

---

## 4. Project Scope (MVP)

### In Scope
- [ ] Homepage with hero, featured products, brand story
- [ ] Product listing page (all products / by collection)
- [ ] Product detail page (images, variants, add to cart)
- [ ] Cart (slide-out drawer)
- [ ] Search
- [ ] About page (Sanity-powered)
- [ ] Mobile responsive (all pages)
- [ ] SEO meta tags
- [ ] GitHub Actions deploy pipeline
- [ ] Nginx + SSL on VPS

### Out of Scope (Post-MVP)
- Account/login pages
- Wishlist
- Product reviews
- Blog
- Analytics dashboard

---

## 5. Information Architecture

```
/ (Home)
├── /collections
│   └── /collections/:handle
├── /products
│   └── /products/:handle
├── /cart
├── /search
├── /about
└── /contact
```

Navigation (matching your Canva wireframe):
- `Cases` → `/collections/cases`
- `Aesthetify It` → `/collections/all` (hero collection)
- `About` → `/about`
- `Contact US` → `/contact`

---

## 6. Commit Strategy (Production Lifecycle)

We follow **Conventional Commits** (`type: description`) for clean git history.

| Type | When |
|---|---|
| `chore:` | Setup, config, tooling |
| `feat:` | New feature/component |
| `fix:` | Bug fixes |
| `style:` | CSS/visual changes only |
| `docs:` | Documentation |
| `refactor:` | Code restructure, no behavior change |
| `test:` | Tests |

### Commit Roadmap

**Sprint 0 — Foundation (this session)**
- `docs: initialize Aesthetify project outline and brand guide`
- `chore: scaffold Hydrogen V2 project with TypeScript and Tailwind`
- `chore: configure Aesthetify design tokens and brand colors`

**Sprint 1 — Structure**
- `feat: add Layout, Header, and Footer shell components`
- `feat: implement responsive navigation with mobile menu`
- `feat: add social icon links (Instagram, TikTok, X)`

**Sprint 2 — Skeleton**
- `feat: build homepage hero section`
- `feat: add product grid component`
- `feat: add product card with hover states`

**Sprint 3 — Surface**
- `style: apply Aesthetify brand typography and spacing`
- `feat: animate hero entrance with CSS transitions`
- `style: add gradient backgrounds and soft shadows`

**Sprint 4 — Commerce**
- `feat: connect Shopify Storefront API`
- `feat: implement cart drawer`
- `feat: add collection and product detail pages`

**Sprint 5 — CMS + Deploy**
- `feat: integrate Sanity for editorial content`
- `chore: configure Nginx and PM2 on VPS`
- `chore: add GitHub Actions deploy workflow`

---

## 7. LinkedIn Content Calendar

| Day | Post Topic | Maps To |
|---|---|---|
| Day 1 | "I'm building an aesthetic e-commerce shop from scratch" | Project announcement |
| Day 2 | "Why I chose Shopify Hydrogen over Next.js Commerce" | Tech stack decision |
| Day 3 | "The 5 Elements of UX: how I plan every frontend project" | Design methodology |
| Day 4 | "Setting up Hydrogen V2: what they don't tell you" | Sprint 0 |
| Day 5 | "Design tokens: the one config file that changes everything" | Brand tokens |
| Day 6 | "Building a Header component in Remix: loaders vs props" | Sprint 1 |
| Day 7 | "Week 1 recap: what I shipped and what I'd do differently" | Weekly review |

---

## 8. Prerequisites Checklist

Before first code commit:

- [ ] Install Node.js v20+ (`winget install OpenJS.NodeJS.LTS`)
- [ ] Create Shopify Partner account (free at partners.shopify.com)
- [ ] Create a development store in Shopify
- [ ] Install Hydrogen app on the store
- [ ] Get Storefront API access token
- [ ] Create Sanity account (free at sanity.io)
- [ ] Create GitHub account + public repo `aesthetify`
- [ ] Set up SSH key for GitHub
- [ ] Provision Linux VPS (DigitalOcean, Hetzner, or Vultr — ~$6/mo)

---

## 9. Resources

| Resource | Link |
|---|---|
| Hydrogen Docs | https://shopify.dev/docs/custom-storefronts/hydrogen |
| Remix Docs | https://remix.run/docs |
| Sanity Docs | https://www.sanity.io/docs |
| hydrogen-sanity integration | https://github.com/sanity-io/hydrogen-sanity |
| Hydrogen Sanity Demo | https://github.com/sanity-io/hydrogen-sanity-demo |
| TailwindCSS Docs | https://tailwindcss.com/docs |
| Conventional Commits | https://www.conventionalcommits.org |
| Marco Heine Tutorial | https://marcoheine.com/blog/e-commerce-website-with-shopify-hydrogen |

---

*Last updated: May 2026 | Sprint: 0*
