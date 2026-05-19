# LinkedIn Post #4 — The Hero Slider

> Post this the day you push Commit 6. Attach a screen recording or GIF
> of the slider auto-advancing (even dev mode with gradients is great).

---

**DRAFT:**

---

I rebuilt the top of our e-commerce homepage today. Here's exactly what went into it.

The client's new reference — the Evelyn blogger theme — has a signature detail in its hero section:

A thin square, inset from the top-right corner of the image. Not a button. Not a label. Just a pure decorative square. Framing.

It costs zero functionality and makes the whole section feel intentional.

Here's what the hero actually does under the hood:

**Auto-advance** — slides rotate every 5 seconds.

**Pause on hover** — `onMouseEnter` sets a pause flag. Timer stops.

**Timer reset on manual nav** — if you click an arrow, the 5-second clock restarts from that moment. No jarring quick-advance 0.2s after you navigated.

```tsx
const resetTimer = useCallback(() => {
  if (timerRef.current) clearInterval(timerRef.current);
  if (isPaused) return;
  timerRef.current = setInterval(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, AUTOPLAY_DELAY);
}, [isPaused]);
```

**Cross-fade, not slide.** I made a deliberate choice here.

Slide transitions (translateX) feel like news sites. Fast. Information-heavy.

Fade transitions (opacity) feel editorial. Luxury. Considered.

Aesthetify is a brand for people who treat their phone case like a fashion accessory — it needed the fade.

**Dots:** active slide gets a pill shape (`w-5 h-1.5`). Inactive dots are small circles. One small visual cue tells you exactly where you are without being loud about it.

The gradients are placeholders. Real Shopify collection images come in a later sprint.

The architecture principle behind all of this: the slider manages its own state and timer internally. The route that renders the page doesn't need to know any of this exists.

That's what encapsulation actually looks like in practice.

---

**Hashtags:**
`#buildinpublic` `#webdevelopment` `#shopify` `#hydrogen` `#reactjs` `#frontend` `#tailwindcss` `#typescript` `#uxdesign`

---

**Post notes:**
- Screen recording of the slider auto-advancing hits harder than a static image
- The `useCallback` + `useRef` snippet is concrete and shows you know React hooks properly
- The fade vs slide design decision shows brand-aware thinking, not just technical execution
