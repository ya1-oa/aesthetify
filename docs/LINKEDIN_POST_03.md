# LinkedIn Post #3 — Design Pivot & The Evelyn Reference

> Post this the day you push Commit 5. Attach a side-by-side of the Evelyn
> reference image and a screenshot of your new homepage (even dev mode is fine).

---

**DRAFT:**

---

The client changed the design reference. Here's how I handled it as a developer.

We started Aesthetify with a minimal, clean direction — soft colors, simple grid.

Then the client sent a new reference: the Evelyn theme. Editorial. Overlapping images. Magazine-style collage layouts. Totally different visual language.

My first instinct was to panic a little.
My second instinct was to open a new component file.

Here's what a design pivot actually looks like at the code level:

**What changed:**
→ Hero: was "image right of text" → now overlapping stacked cards with rotation
→ Collections: was a standard grid → now minimal outline cards (Evelyn category style)
→ Products section: now has a Playfair italic script heading instead of plain h2

**What stayed the same:**
→ All our design tokens (colors, fonts, shadows) — not one hex code changed
→ The Shopify data layer — same GraphQL queries, same deferred loading
→ Component architecture — we just swapped what renders, not how data flows

That last point is the real lesson.

Good architecture means a design pivot is a frontend problem, not a backend problem.

The Shopify queries don't care what your hero looks like.
The cart doesn't know you rotated an image 3 degrees.
The Tailwind tokens don't know you're rebuilding the layout.

The "surface layer" changes. The layers underneath don't.

This is exactly why the Five Elements of UX framework has been our guide — each layer is independent. Change the surface without touching the structure.

What does your process look like when a client changes direction mid-build?

---

**Hashtags:**
`#buildinpublic` `#webdevelopment` `#shopify` `#hydrogen` `#uxdesign` `#frontend` `#reactjs` `#designsystems` `#tailwindcss`

---

**Post notes:**
- Side-by-side image: Evelyn reference (left) + your browser screenshot (right)
- This post teaches a real lesson (design independence from data layer)
- Ends with a question to drive comments
