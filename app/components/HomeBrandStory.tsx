import {Link} from 'react-router';

/**
 * HomeBrandStory — the "Welcome" collage section from the Evelyn theme
 *
 * DESIGN REFERENCE: Evelyn "Welcome!" section
 * Left:  overlapping image collage with rotated blush color blocks
 *        + handwritten-style script text floating over the stack
 * Right: heading, brand copy, CTA
 *
 * Layout reversal from Hero (collage right → collage left here) creates
 * a Z-pattern reading flow across the full homepage, which is standard
 * editorial magazine layout.
 *
 * Z-PATTERN READING:
 * Hero:        text LEFT  → image RIGHT
 * BrandStory:  image LEFT → text RIGHT   ← eye naturally follows the Z
 * Collections: centered grid
 *
 * The collage uses the same layering technique as HomeHero but with
 * stronger rotation and a script text overlay to match the Evelyn
 * "Hey there!" floating label.
 */
export function HomeBrandStory() {
  return (
    <section className="bg-cream py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT: Image collage ───────────────────────────── */}
          <div className="relative h-[420px] lg:h-[500px]">

            {/* Color block 1 — large blush, back-left */}
            <div className="
              absolute top-8 left-0
              w-[65%] h-[70%]
              bg-blush rounded-card
              rotate-[-3deg]
            " />

            {/* Color block 2 — small lavender, top-right accent */}
            <div className="
              absolute top-0 right-8
              w-[40%] h-[35%]
              bg-lavender-light rounded-card
              rotate-[2deg]
            " />

            {/* Main image — large, center-right */}
            <div className="
              absolute top-4 right-0
              w-[62%] h-[78%]
              rounded-card overflow-hidden
              shadow-card z-10
              border-4 border-cream
            ">
              {/* Placeholder — soft gradient until real photo is added */}
              <div className="w-full h-full bg-gradient-card" />
            </div>

            {/* Secondary image — smaller, bottom-left overlap */}
            <div className="
              absolute bottom-4 left-8
              w-[45%] h-[42%]
              rounded-card overflow-hidden
              shadow-card-hover z-20
              border-4 border-cream
            ">
              <div className="w-full h-full bg-blush-dark" />
            </div>

            {/* Script text overlay — "Hey there!" equivalent */}
            {/* font-display italic creates the handwritten editorial feel */}
            <div className="
              absolute bottom-0 right-4
              z-30
              font-display italic text-2xl text-charcoal/70
              select-none pointer-events-none
            " aria-hidden="true">
              Aesthetify ✦
            </div>

          </div>

          {/* ── RIGHT: Text content ───────────────────────────── */}
          <div className="flex flex-col gap-6 lg:pl-4">

            {/* Section eyebrow */}
            <span className="
              font-sans text-xs tracking-widest uppercase text-rose
            ">
              Our Story
            </span>

            {/* Heading — mix of regular and italic (Evelyn style) */}
            <h2 className="font-display text-display-sm text-charcoal">
              More than a case.{' '}
              <span className="italic">A statement.</span>
            </h2>

            {/* Body copy */}
            <div className="flex flex-col gap-4">
              <p className="font-sans text-base text-charcoal-soft leading-relaxed">
                Aesthetify started with a simple idea: your phone case sits
                in your hand every single day. It deserves to be beautiful.
              </p>
              <p className="font-sans text-base text-charcoal-soft leading-relaxed">
                We design accessories that feel like they belong on a flat lay,
                not just protecting a screen — because the details of your
                everyday life should feel intentional.
              </p>
            </div>

            {/* Secondary CTA — outline style (lighter weight than hero CTA) */}
            <Link
              to="/pages/about"
              prefetch="intent"
              className="
                self-start
                inline-flex items-center gap-2
                font-sans text-sm text-charcoal tracking-wide
                border-b border-charcoal pb-0.5
                hover:text-rose hover:border-rose
                transition-colors duration-200
              "
            >
              Read our story
              <span aria-hidden="true">→</span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
