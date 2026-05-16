# Study Lesson 01: The Five Elements of UX Design
## Why This Is Your Development Roadmap

---

### What You're Learning

The Five Elements of UX Design (Jesse James Garrett, 2000) is a framework that breaks a product into 5 layers from most abstract → most concrete. We use it to plan Aesthetify commit by commit.

---

### The Five Layers (Bottom → Top)

```
┌─────────────────────────────────┐
│  5. SURFACE  — What it looks like │  ← Colors, fonts, icons, photos
│  4. SKELETON — How it's arranged  │  ← Wireframes, grid, nav placement
│  3. STRUCTURE— How it's organized │  ← Routes, IA, user flows
│  2. SCOPE    — What we build      │  ← Feature list, content plan
│  1. STRATEGY — Why we build it    │  ← User needs + business goals
└─────────────────────────────────┘
```

**Key insight**: You always design bottom → top, but users experience it top → bottom.

---

### Applied to Aesthetify

| Layer | Aesthetify Decision | Code Output |
|---|---|---|
| Strategy | Sell aesthetic phone cases to Gen Z women | Personas, brand guide |
| Scope | MVP: home, collection, PDP, cart, search | `PROJECT_OUTLINE.md` feature list |
| Structure | `/`, `/collections/:h`, `/products/:h`, `/cart` | Remix route files |
| Skeleton | 3-col product grid, slide-out cart, sticky nav | Component JSX + Tailwind layout |
| Surface | Pink/lavender palette, Playfair Display, soft shadows | Tailwind config tokens |

---

### Practice Exercise

**Goal**: Reproduce this planning process for a *different* product to own it yourself.

Pick any simple product (e.g., a coffee subscription service, a bookstore, a plant shop).

Fill in this template by hand in a new file (don't copy from Aesthetify — derive your own answers):

```markdown
# [Your Product Name] — UX Element Planning

## Strategy
- User need: ___________
- Business goal: ___________

## Scope
- Must-have features (list 5): ___________
- Content required: ___________

## Structure  
- Route map (draw it out):
  / (home)
  ├── ___________
  └── ___________

## Skeleton
- Describe the homepage layout in words (not code):
  ___________

## Surface
- Color palette (pick 3): ___________
- Font pairing: ___________
```

Write this out before looking at any code. The planning IS the skill.

---

### Why This Matters (The Senior Dev Perspective)

Junior devs open VSCode and start typing.

Senior devs ask: *"Which layer does this belong to?"*

Example: A client asks you to "make the button pink." That's a **Surface** request.
But if the button is buried where users can't find it — that's a **Skeleton** problem disguised as a Surface complaint.

Thinking in layers helps you:
1. Push back on wrong-layer fixes ("making it pink won't help if users can't find it")
2. Scope PRs cleanly (one PR per layer, not mixed)
3. Communicate with non-technical stakeholders (they understand "surface" and "structure")

---

### Key Decisions We Made (and Why)

#### Why Hydrogen V2 over Next.js Commerce?

**Our decision**: Hydrogen V2 (Remix-based)

**Alternative considered**: Next.js Commerce

| | Hydrogen V2 | Next.js Commerce |
|---|---|---|
| Framework | Remix | Next.js App Router |
| Shopify integration | First-party, maintained by Shopify | Third-party adapters |
| Data pattern | Loaders + Actions | Server Components + Server Actions |
| Cart handling | Built-in, pre-configured | Requires manual setup |
| Maturity | Production-proven | Cutting-edge (RSC risk) |

**Our reasoning**: Shopify owns Hydrogen and the Storefront API. When they're both from the same team, the integration is tighter and better documented. Less guessing.

**Alternative path**: You could build this with Next.js + `@shopify/hydrogen-react` (just the React components, not the full framework). Worth knowing exists.

---

#### Why Linux VPS over Oxygen (Shopify's free hosting)?

**Our decision**: Linux VPS + Nginx + PM2

**What Oxygen gives you**: Free hosting, automatic deploys from GitHub, zero config

**What we give up by skipping it**: Simplicity, free tier

**What we gain**: 
- Full server control (custom Nginx rules, SSL management, cron jobs)
- Portfolio story ("I configured a production Nginx server")
- Transferable skill (Nginx knowledge applies to any app, not just Hydrogen)
- $6/mo Hetzner > free Oxygen for learning purposes

**Alternative path**: Use Oxygen for speed, then migrate to VPS later. Completely valid.

---

### Resources to Study

1. **Jesse James Garrett's original article**: Search "Jesse James Garrett elements of user experience"
2. **Remix Docs — Philosophy**: https://remix.run/docs/en/main/pages/philosophy
3. **Shopify Hydrogen Docs**: https://shopify.dev/docs/custom-storefronts/hydrogen
4. **Conventional Commits spec**: https://www.conventionalcommits.org/en/v1.0.0/

---

### Next Lesson Preview

**Lesson 02: Remix Loaders and Actions**
The two concepts that make Hydrogen work. We'll build a product fetcher and a cart action from scratch before touching Hydrogen's built-in versions — so you understand what the framework is doing for you.

---

*Lesson 01 of the Aesthetify Build Series | May 2026*
