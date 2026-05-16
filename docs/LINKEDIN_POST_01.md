# LinkedIn Post #1 — Project Announcement

> Post this the day you push Commit 1 to GitHub. Include a screenshot of your Canva wireframe or one of your Pinterest mood board images.

---

**DRAFT (edit in your voice before posting):**

---

I'm building an e-commerce shop from scratch and documenting every commit.

Meet **Aesthetify** — an online store for people who think their phone case should be as curated as their entire personality.

Phone cases. Tablet cases. Aesthetic everything.

Here's why I'm doing this in public:

✦ I want to prove I can take a product from wireframe → live production deployment
✦ I want to show the actual engineering decisions, not just the pretty screenshots
✦ I want to learn by teaching — so I'll be breaking down one concept per post

**The stack I chose:**
→ Shopify Hydrogen V2 (built on Remix)
→ Sanity CMS for editorial content
→ TailwindCSS for styling
→ Linux VPS for deployment (full DevOps control)

Why Hydrogen over Next.js Commerce? That's tomorrow's post.

For now — here's my wireframe. Pink. Minimal. Aesthetic.

Follow along if you're building something too, or just want to see how the sausage is made 🎀

---

**Hashtags:**
`#buildinpublic` `#webdevelopment` `#shopify` `#hydrogen` `#ecommerce` `#frontend` `#reactjs` `#remix` `#devjourney` `#portfolio`

---

**Post Notes:**
- Attach: screenshot of your Canva wireframe (the pink grid layout)
- Best time to post: Tuesday–Thursday, 8–10am your timezone
- Reply to every comment within the first hour (boosts algorithm)
- Pin this post to your profile after publishing

---

# LinkedIn Post #2 — Tech Stack Decision (draft for tomorrow)

---

I almost used Next.js Commerce for my new shop. Here's why I switched.

When I started researching how to build **Aesthetify** (my aesthetic e-commerce shop), Next.js Commerce was the obvious choice. I use Next.js all the time.

But then I found out Shopify bought Remix.

And built Hydrogen V2 on top of it.

If you haven't used Remix yet — the mental model is different from Next.js in a way that actually makes more sense for e-commerce:

**Loaders** → server-side data fetching per route
**Actions** → form mutations (add to cart, search, etc.)
**No useEffect for data** → everything is either a loader or an action

For a shop where you're constantly fetching products, updating carts, and running searches — this pattern is really clean.

Next.js Commerce uses App Router + React Server Components, which is great tech, but still cutting-edge. I wanted something production-proven.

Hydrogen gives you:
→ Pre-built cart logic
→ Pre-built product/collection routes
→ Shopify's own team maintaining the integration

So I went with Hydrogen. And I haven't looked back.

What stack would you have chosen?

---

**Hashtags:**
`#webdevelopment` `#shopify` `#hydrogen` `#remix` `#nextjs` `#frontend` `#javascript` `#buildinpublic`
