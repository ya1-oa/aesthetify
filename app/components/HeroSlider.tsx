import {useState, useEffect, useCallback, useRef} from 'react';
import {Link} from 'react-router';

/**
 * HeroSlider — full-width editorial image slideshow
 *
 * DESIGN REFERENCE: Evelyn theme top hero section
 *
 * Three signature design details from the reference:
 *
 *  1. CORNER SQUARE — a thin-bordered square inset from the
 *     top-right corner of the image. Pure decorative geometry.
 *     Creates a "framed photo" depth effect without using a real frame.
 *
 *  2. TEXT CARD — a cream/white card floating over the bottom-left
 *     of the image. NOT a full-width overlay. It sits ON the image
 *     like a sticky note, with its own shadow.
 *
 *  3. CHEVRON ARROWS — small `‹` `›` buttons on the right side,
 *     vertically centered. Minimal, not big bold buttons.
 *
 * ANIMATION DECISION — cross-fade (opacity), not slide (translateX):
 * Slide transitions feel energetic / news-heavy.
 * Fade transitions feel editorial / luxury.
 * Aesthetify is a luxury-feel brand → fade.
 *
 * AUTO-ADVANCE:
 * - 5 second interval
 * - Pauses when user hovers (respects user intent)
 * - Resumes when mouse leaves
 * - Resets the timer on manual navigation (prevents jarring quick-advance)
 *
 * PLACEHOLDER SLIDES:
 * Using CSS gradient backgrounds until Shopify images are connected.
 * Each slide gets a unique gradient so the transition is visible in dev.
 * When you connect Shopify, replace `gradient` with `imageUrl` in each slide.
 */

interface Slide {
  id: number;
  headline: string;
  subtext: string;
  cta: {label: string; href: string};
  /** Tailwind gradient classes — replace with real image url once connected */
  gradient: string;
  /** Accent color class for the eyebrow tag */
  accent: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    headline: 'Curate Your World',
    subtext: 'New arrivals — phone cases designed for the aesthetic-first generation.',
    cta: {label: 'Shop New Arrivals', href: '/collections/all'},
    gradient: 'from-blush via-lavender-light to-cream',
    accent: 'text-rose',
  },
  {
    id: 2,
    headline: 'Cases That Speak',
    subtext: 'Soft. Minimal. Yours. Explore the full cases collection.',
    cta: {label: 'Shop Cases', href: '/collections/cases'},
    gradient: 'from-lavender via-blush to-cream',
    accent: 'text-charcoal-soft',
  },
  {
    id: 3,
    headline: 'The Details Matter',
    subtext: 'Accessories and add-ons to complete your aesthetic moment.',
    cta: {label: 'Shop Accessories', href: '/collections/accessories'},
    gradient: 'from-cream via-lavender-light to-blush-light',
    accent: 'text-rose',
  },
];

const AUTOPLAY_DELAY = 5000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Clears and restarts the autoplay timer.
   * Called on manual navigation so the interval resets from that moment —
   * prevents a slide advancing 0.5s after you just clicked next.
   */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);
  }, [isPaused]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      resetTimer();
    },
    [resetTimer],
  );

  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo],
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo],
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-cream"
      style={{height: 'clamp(480px, 82vh, 760px)'}}
      aria-label="Featured collections slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* ── SLIDES STACK ───────────────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <SlidePanel
          key={slide.id}
          slide={slide}
          isActive={i === current}
        />
      ))}

      {/* ── CORNER SQUARE (Evelyn signature element) ───────────── *
       * Two thin-bordered squares, slightly offset from each other.
       * The offset gives it a double-frame layered depth.
       * Positioned inset from the top-right corner.
       * ─────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-7 right-7 w-20 h-20 border border-white/50 z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-20 h-20 border border-white/25 z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── CHEVRON ARROWS (right side, vertically centered) ───── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <ChevronButton direction="up" onClick={prev} label="Previous slide" />
        <ChevronButton direction="down" onClick={next} label="Next slide" />
      </div>

      {/* ── DOT INDICATORS (bottom center) ────────────────────── */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`
              rounded-full transition-all duration-slow ease-aesthetic
              ${i === current
                ? 'w-5 h-1.5 bg-rose'
                : 'w-1.5 h-1.5 bg-rose/30 hover:bg-rose/60'}
            `}
          />
        ))}
      </div>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────────────────────────── */

function SlidePanel({slide, isActive}: {slide: Slide; isActive: boolean}) {
  return (
    <div
      className={`
        absolute inset-0
        transition-opacity duration-700 ease-aesthetic
        ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}
      `}
      aria-hidden={!isActive}
    >
      {/* ── Background image (gradient placeholder) ─────────── *
       * FUTURE: replace the gradient div with an <Image> component
       * once Shopify collections have images:
       *
       *   <Image
       *     data={slide.image}
       *     sizes="100vw"
       *     className="absolute inset-0 w-full h-full object-cover"
       *   />
       *
       * The gradient div below gets removed at that point.
       * ─────────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

      {/* Optional: soft vignette at bottom to improve text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      {/* ── Text card — floats over bottom-left (Evelyn style) ─ *
       * This is NOT a full-width overlay. It's a card that sits
       * ON the image like a sticky note, with padding and shadow.
       * The white/cream background gives it lift off the image.
       * ─────────────────────────────────────────────────────── */}
      <div className="
        absolute bottom-10 left-6 sm:left-10 lg:left-16
        max-w-xs sm:max-w-sm
        bg-cream/92 backdrop-blur-[2px]
        px-6 py-5 sm:px-8 sm:py-6
        shadow-card
      ">
        {/* Eyebrow */}
        <span className={`
          block font-sans text-xs tracking-widest uppercase mb-2
          ${slide.accent}
        `}>
          Aesthetify
        </span>

        {/* Headline */}
        <h2 className="font-display text-xl sm:text-2xl text-charcoal leading-snug mb-2">
          {slide.headline}
        </h2>

        {/* Subtext */}
        <p className="font-sans text-xs text-charcoal-soft leading-relaxed mb-4">
          {slide.subtext}
        </p>

        {/* CTA */}
        <Link
          to={slide.cta.href}
          prefetch="intent"
          className="
            inline-flex items-center gap-1.5
            font-sans text-xs tracking-wide text-charcoal
            border-b border-charcoal pb-0.5
            hover:text-rose hover:border-rose
            transition-colors duration-200
          "
        >
          {slide.cta.label}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

    </div>
  );
}

/**
 * ChevronButton — the `‹` `›` arrows from the Evelyn reference.
 *
 * Direction "up" = previous (‹), "down" = next (›).
 * Small, minimal — not big bold buttons. The Evelyn arrows are subtle.
 */
function ChevronButton({
  direction,
  onClick,
  label,
}: {
  direction: 'up' | 'down';
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="
        w-8 h-8 flex items-center justify-center
        bg-cream/80 hover:bg-cream
        text-charcoal hover:text-rose
        transition-all duration-200 ease-aesthetic
        shadow-card
      "
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === 'up' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}
