# Study Lesson 03: Component Architecture
## How to Structure a Page So a Design Pivot Costs Hours, Not Days

---

### What You're Learning

Why the design change from "minimal grid" to "Evelyn editorial" required
zero changes to our data layer, zero changes to our tokens, and only
touched files inside `app/components/` and `app/routes/_index.tsx`.

---

### The Architecture We Built

```
_index.tsx  (route — owns data fetching)
├── HomeHero.tsx            (presentational — receives collection prop)
├── HomeBrandStory.tsx      (presentational — no props, pure layout)
├── HomeFeaturedCollections.tsx  (presentational — receives collections[])
└── HomeProducts.tsx        (presentational — receives products Promise)
```

**Key rule**: Routes own data. Components display data.

`_index.tsx` is the only file that touches `context.storefront.query()`.
Every component just receives props and renders JSX.

---

### The Separation of Concerns Principle

Three things are always independent in Aesthetify:

| Layer | Where it lives | What it knows |
|---|---|---|
| Data | `loader()` in route files | GraphQL, Shopify API |
| Structure | Component files | Props, JSX, layout |
| Style | `tailwind.css` @theme | Colors, fonts, tokens |

**When the client changed the design:**
- Data layer: untouched. Same GraphQL queries.
- Style layer: untouched. Same brand tokens.
- Structure: new component files. Old ones can be deleted.

The pivot cost 4 new component files and a route rewrite.
It cost zero backend changes.

---

### Practice Exercise

Take the `HomeHero` component and rebuild it from scratch with a
**different layout** — same data, different structure.

Pick one of these layouts:

**Option A — Full-bleed image**
```
[Full width background image with text overlaid center-screen]
[Brand name large, CTA below, soft dark overlay on image]
```

**Option B — Minimal text-only**
```
[No image at all — just centered typography]
[Giant Playfair Display headline, thin divider, CTA]
```

**Option C — Split 50/50 with no overlap**
```
[Left half: solid blush background with text]
[Right half: image fills the entire half]
```

Write the JSX + Tailwind classes for your chosen option.
Same props interface (`{ collection: FeaturedCollectionFragment | null }`).
No new dependencies.

---

### Key Decisions Explained

#### WHY split homepage into 4 separate component files?

**Junior approach:**
```tsx
// _index.tsx — everything in one file
export default function Homepage() {
  return (
    <div>
      <section>/* hero JSX — 80 lines */</section>
      <section>/* brand story — 60 lines */</section>
      <section>/* collections — 70 lines */</section>
      <section>/* products — 40 lines */</section>
    </div>
  )
}
```

**Senior approach:** separate files.

Why it matters:
1. **Git blame**: when a bug is in the hero, `git log HomeHero.tsx` shows exactly what changed and when
2. **Parallel work**: two developers can work on `HomeBrandStory` and `HomeFeaturedCollections` simultaneously without merge conflicts
3. **Reuse**: `HomeFeaturedCollections` could be used on a `/collections` landing page too
4. **Test isolation**: you can unit-test `ProductItem` without rendering the entire homepage
5. **Design pivot cost**: as we just proved — you swap one file, not rewrite a 300-line route

---

#### WHY deferred loading for products?

```tsx
// loadDeferredData — products don't block first paint
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch(...)   // ← safe to fail

  return {recommendedProducts}   // ← returns a Promise, not resolved data
}

// loadCriticalData — collections block until resolved (hero needs them)
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(HOMEPAGE_COLLECTIONS_QUERY),
  ])
  return {collections}   // ← returns resolved data
}
```

**Critical vs deferred** decision tree:
- Is it above the fold? → Critical (await it)
- Does the layout shift if it's missing? → Critical
- Is it below the fold? → Deferred
- Can the page still render without it? → Deferred

The hero needs collection data to show the right image → Critical.
The product grid is below the fold and the page renders fine with a skeleton → Deferred.

---

#### WHY the overlapping card technique uses position:absolute?

```tsx
{/* The container is relative — sets the coordinate system */}
<div className="relative h-[480px]">

  {/* Each child is absolute — positioned within the container */}
  <div className="absolute top-6 right-0 w-[75%] h-[85%] bg-blush ..." />
  <div className="absolute top-4 right-[5%] w-[70%] h-[80%] ..." />
  <div className="absolute bottom-0 left-0 w-[45%] h-[48%] ..." />

</div>
```

**Alternative: CSS Grid overlap**
```tsx
<div className="grid" style={{gridTemplate: '1fr / 1fr'}}>
  <div style={{gridArea: '1/1'}} className="...bg-blush" />
  <div style={{gridArea: '1/1'}} className="...image" />
</div>
```

CSS Grid overlap works when elements share the same grid cell. It's cleaner for equal-size elements. We used `absolute` because our elements have different sizes and positions — absolute gives us precise pixel control.

**Another alternative: negative margins**
```tsx
<div className="flex">
  <div className="w-48 h-64 bg-blush" />
  <div className="-ml-16 w-48 h-64 bg-lavender" /> {/* overlaps by 64px */}
</div>
```

Negative margins work but only for simple horizontal/vertical overlaps.
Not flexible enough for the multi-directional Evelyn stacking effect.

---

### Resources

- [React Router Deferred Data](https://reactrouter.com/start/framework/data-loading#streaming-with-defer)
- [Tailwind position docs](https://tailwindcss.com/docs/position)
- [CSS Tricks — Absolute positioning](https://css-tricks.com/absolute-relative-fixed-positinoation-how-do-they-differ/)
- [Shopify Hydrogen — Caching](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/cache)

---

### Next Lesson Preview

**Lesson 04: Shopify Storefront API + GraphQL Basics**
Understanding the queries we're actually running — what `@inContext` does,
why we use fragments, and how to extend queries when you need new data fields.

---

*Lesson 03 of the Aesthetify Build Series | May 2026*
