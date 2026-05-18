# Study Lesson 02: Design Tokens
## The One Config File That Changes Everything

---

### What Are Design Tokens?

A **design token** is a named value for a design decision.

Instead of:
```tsx
<div className="bg-[#FFD6E0]">        // ❌ magic number
<div style={{ background: '#FFD6E0' }} // ❌ inline style, no reuse
```

You write:
```tsx
<div className="bg-blush">            // ✅ named, semantic, reusable
```

The name `blush` lives in one place: `tailwind.config.ts`. Change it there → changes everywhere.

---

### Three Types of Tokens We Use in Aesthetify

**1. Color tokens** — Named with intent, not hue
```
blush.DEFAULT   → primary background/chip color
rose.DEFAULT    → CTA color (buttons, icons)
charcoal        → text color
```

Why not `pink-300` or `purple-200`? Because Tailwind's default scale is generic. `rose` means something specific to Aesthetify. `pink-300` could mean anything.

**2. Typography tokens** — Named with role
```
font-display    → headings, hero text (Playfair Display)
font-sans       → body, labels, nav (DM Sans)
```

**3. Spacing tokens** — Named with context
```
p-section       → 5rem — standard section padding
p-section-lg    → 8rem — hero section padding
```

---

### Practice Exercise

Build this component using ONLY Aesthetify design tokens (no raw hex values, no arbitrary Tailwind values like `bg-[#xxx]`):

**Target**: A product card with:
- Soft background
- Rounded corners
- A title in display font
- A price in body font
- A blush-tinted shadow on hover

Write the JSX + Tailwind classes from scratch. Don't look at the tailwind.config yet — first try to guess the token names from memory, then check.

```tsx
// practice/ProductCard.tsx
// Try to write this without looking at tailwind.config.ts first

export function ProductCard({ title, price, image }: {
  title: string
  price: string
  image: string
}) {
  return (
    <div className="???">
      <img src={image} alt={title} className="???" />
      <div className="???">
        <h3 className="???">{title}</h3>
        <p className="???">{price}</p>
      </div>
    </div>
  )
}
```

**After writing it**, compare to the reference below.

---

### Reference Solution (don't peek until you've tried)

<details>
<summary>Click to reveal</summary>

```tsx
export function ProductCard({ title, price, image }: {
  title: string
  price: string
  image: string
}) {
  return (
    <div className="
      bg-cream-dark           {/* card background from token */}
      rounded-card            {/* 20px radius from token */}
      overflow-hidden
      shadow-card             {/* blush-tinted shadow from token */}
      hover:shadow-card-hover {/* deeper on hover */}
      transition-shadow
      duration-slow           {/* 400ms from token */}
      ease-aesthetic          {/* cubic bezier from token */}
      group                   {/* enables group-hover on children */}
    ">
      <div className="overflow-hidden aspect-square">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-slower ease-aesthetic
          "
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-charcoal">{title}</h3>
        <p className="font-sans text-sm text-charcoal-soft mt-1">{price}</p>
      </div>
    </div>
  )
}
```

Notice: Not a single hex code. Every value has a name with meaning.
</details>

---

### The Senior Dev Perspective on Design Tokens

**Junior approach**: "I'll just hard-code the color, I can change it later."

**Senior approach**: "Later" usually means "never, and now there are 40 hex values I have to hunt down."

Design tokens pay off the first time you need to:
1. Rebrand (change all blush to mint in one line)
2. Add dark mode (map tokens to CSS variables)
3. Hand off to another dev (they read `bg-rose` not `bg-[#C9919E]`)
4. Audit the design (grep for `blush` to find every blush usage)

---

### Key Decision: Tailwind Config vs CSS Variables

We used `tailwind.config.ts` for our tokens. Alternative: CSS custom properties.

**Tailwind config** (our choice):
```ts
// tailwind.config.ts
colors: { blush: '#FFD6E0' }
```
```tsx
<div className="bg-blush">  // IntelliSense ✅
```

**CSS variables** (alternative):
```css
/* app.css */
:root { --color-blush: #FFD6E0; }
```
```tsx
<div style={{ background: 'var(--color-blush)' }}>  // No IntelliSense ❌
// OR configure Tailwind to read CSS vars:
// colors: { blush: 'var(--color-blush)' }       // IntelliSense ✅
```

**When to use CSS variables instead:**
- Dark mode (swap the variable value at `:root[data-theme='dark']`)
- Runtime theming (customer-selectable themes)
- Design tool exports CSS variables natively

We'll add dark mode support in a later sprint using CSS variables. For now, Tailwind config is simpler and gives us full IntelliSense.

---

### Resources

- [Tailwind docs: Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind docs: Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Smashing Magazine: Design Tokens](https://www.smashingmagazine.com/2019/11/smashing-podcast-episode-3/)
- [Google Fonts: Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Google Fonts: DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

### Next Lesson Preview

**Lesson 03: Remix Loaders and Actions**
The mental model behind how Hydrogen fetches products and handles cart mutations. We'll build both from scratch before touching the pre-built Hydrogen versions.

---

*Lesson 02 of the Aesthetify Build Series | May 2026*
