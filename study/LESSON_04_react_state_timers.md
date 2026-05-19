# Study Lesson 04: React State + Timer Management
## How to Build a Slider That Doesn't Fight the User

---

### What You're Learning

Why the HeroSlider uses `useRef` for the timer instead of `useState`,
why `useCallback` prevents stale closures, and how to think about
"pause on hover" as a user-intent problem, not a CSS problem.

---

### The Three State Decisions in HeroSlider

```tsx
const [current, setCurrent] = useState(0);        // which slide is active
const [isPaused, setIsPaused] = useState(false);   // is autoplay paused?
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // interval ID
```

#### WHY `useRef` for the timer, not `useState`?

`useState` triggers a re-render when it changes.
`useRef` does NOT trigger a re-render.

The interval ID is an internal implementation detail — the UI
doesn't need to re-render every time we clear and restart the timer.
Using `useState` for this would cause unnecessary re-renders on every
manual navigation click.

**Rule of thumb:**
- Does the UI need to react when this value changes? → `useState`
- Is it an internal handle you just need to hold onto? → `useRef`

---

### The Stale Closure Problem

```tsx
// BROKEN — stale closure
useEffect(() => {
  const id = setInterval(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  }, 5000);
  return () => clearInterval(id);
}, []); // ← empty dep array, runs once
```

This works for the basic timer. But add `isPaused`:

```tsx
useEffect(() => {
  if (isPaused) return;
  const id = setInterval(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  }, 5000);
  return () => clearInterval(id);
}, []); // ← BROKEN: isPaused is stale, always reads initial value (false)
```

The closure "captures" `isPaused` at the time the effect ran (once,
on mount). It never sees the updated value.

**Fix: declare `isPaused` as a dependency:**
```tsx
}, [isPaused]); // ← effect re-runs when isPaused changes
```

But now we want to ALSO reset the timer on manual navigation.
That's why we extracted `resetTimer` as a `useCallback`.

---

### The `useCallback` Pattern

```tsx
const resetTimer = useCallback(() => {
  if (timerRef.current) clearInterval(timerRef.current);  // kill old timer
  if (isPaused) return;                                    // don't restart if paused
  timerRef.current = setInterval(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, AUTOPLAY_DELAY);
}, [isPaused]); // ← re-creates when isPaused changes
```

`useCallback` memoizes the function. It only creates a new function
reference when `isPaused` changes — not on every render.

This matters because `resetTimer` is in the `useEffect` dependency array:

```tsx
useEffect(() => {
  resetTimer();
  return () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
}, [resetTimer]); // ← runs when resetTimer changes (= when isPaused changes)
```

Without `useCallback`, `resetTimer` would be a new function on every
render, causing the effect to re-run constantly — infinite timer restarts.

---

### The Pause-on-Hover Pattern

```tsx
<section
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
```

When `isPaused` becomes `true`:
1. `resetTimer`'s dependency (`isPaused`) changed → `useCallback` creates new function
2. `useEffect`'s dependency (`resetTimer`) changed → effect re-runs
3. `resetTimer()` is called → it checks `if (isPaused) return` → timer is cleared and NOT restarted

When `isPaused` becomes `false` (mouse leaves):
1. Same chain fires → `resetTimer()` → `isPaused` is false → timer restarts

This is the "reactive" mental model: instead of imperatively
saying "start timer, stop timer", you describe the state, and the
effects react to state changes automatically.

---

### Manual Navigation + Timer Reset

```tsx
const goTo = useCallback(
  (index: number) => {
    setCurrent(index);
    resetTimer(); // ← restart the 5s clock from THIS moment
  },
  [resetTimer],
);
```

Without `resetTimer()` here: if you click "next" at second 4.8,
the slide advances to slide 2, then 0.2 seconds later the autoplay
fires and advances to slide 3. The user barely saw slide 2.

With `resetTimer()`: the clock resets to 0 every time the user navigates.
Full 5 seconds on every slide, regardless of when they clicked.

This is "respecting user intent" — a UX principle, implemented in code.

---

### The Cross-Fade vs Slide Decision

The transition is purely CSS:

```tsx
// Active slide: visible, on top
className={`
  absolute inset-0
  transition-opacity duration-700 ease-aesthetic
  ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}
`}
```

Why `opacity` not `translateX`?

| Technique | Visual feel | When to use |
|---|---|---|
| `translateX` slide | Energetic, sequential, news-heavy | Content-dense UIs, app carousels |
| `opacity` crossfade | Calm, editorial, luxury | Brand pages, editorial, lookbooks |

Aesthetify brand = luxury aesthetic → crossfade.

The design decision lives in the CSS class choice.
The React code just toggles `isActive` — it doesn't know or care
whether the transition is a slide or a fade.

---

### Practice Exercise

Build a banner rotator that:
1. Cycles through 3 promo text strings (no images)
2. Auto-advances every 3 seconds
3. Does NOT pause on hover
4. Has no navigation controls (dots, arrows)

Use `useEffect` + `useRef`. Do NOT use `useCallback` — you don't
need to reset the timer manually here. Notice when you do and don't
need the extra abstraction.

---

### Key Vocabulary

| Term | What it means |
|---|---|
| Stale closure | A function that captured a variable's old value and never sees updates |
| `useRef` | Holds a value that persists across renders WITHOUT causing re-renders |
| `useCallback` | Memoizes a function so it only changes when its dependencies change |
| `useEffect` dependency array | Controls when the effect re-runs |
| Autoplay timer reset | Restarting the interval from 0 when the user manually navigates |

---

### Resources

- [React docs — useRef](https://react.dev/reference/react/useRef)
- [React docs — useCallback](https://react.dev/reference/react/useCallback)
- [React docs — useEffect](https://react.dev/reference/react/useEffect)
- [Dan Abramov — A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) (long but essential)

---

### Next Lesson Preview

**Lesson 05: Shopify Storefront API + GraphQL Basics**
What `@inContext` actually does, why we use fragments instead of
inline fields, and how to extend a query when the design asks for
a new piece of data.

---

*Lesson 04 of the Aesthetify Build Series | May 2026*
