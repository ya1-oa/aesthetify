import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

interface HomeHeroProps {
  collection: FeaturedCollectionFragment | null;
}

/**
 * HomeHero — editorial 2-column hero section
 *
 * DESIGN REFERENCE: Evelyn theme hero
 * Left:  brand statement + eyebrow tag + CTA
 * Right: overlapping image cards with blush/lavender color blocks
 *
 * THE OVERLAPPING CARD TECHNIQUE:
 * We layer three elements inside a `relative` container using `absolute`
 * positioning. Each layer has a different offset + z-index to create depth.
 *
 *  Layer 1 (bottom): blush color block — slightly rotated, behind everything
 *  Layer 2 (middle): main image card — full size, fills the column
 *  Layer 3 (top):    second smaller card — offset bottom-left, border-white
 *
 * WHY this works without JavaScript:
 * Pure CSS stacking via z-index. No carousel library needed for the hero
 * — movement comes from the visual tension between the offset elements.
 *
 * GRACEFUL DEGRADATION:
 * If no Shopify collection is connected yet, gradient placeholder divs
 * fill the image slots so the layout never breaks during development.
 */
export function HomeHero({collection}: HomeHeroProps) {
  const heroImage = collection?.image ?? null;

  return (
    <section className="bg-gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ───────────────────────────── */}
          <div className="flex flex-col gap-6 lg:pr-8">

            {/* Eyebrow tag — thin pill label above headline */}
            <span className="
              inline-flex self-start items-center
              px-4 py-1.5 rounded-pill
              bg-blush border border-blush-dark
              font-sans text-xs tracking-widest uppercase text-rose
            ">
              New Arrivals
            </span>

            {/* Main headline in Playfair Display */}
            <h1 className="font-display text-display-lg text-charcoal leading-none">
              Curate{' '}
              <span className="italic text-rose">Your</span>
              <br />
              World
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base text-charcoal-soft leading-relaxed max-w-sm">
              Aesthetic phone cases and accessories designed for people who
              treat their everyday objects as an extension of themselves.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/collections/all"
                prefetch="intent"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-pill
                  bg-rose text-cream
                  font-sans text-sm tracking-wide
                  hover:bg-rose-dark
                  transition-colors duration-slow ease-aesthetic
                  shadow-card hover:shadow-card-hover
                "
              >
                Shop Now
                <ArrowRight />
              </Link>
              <Link
                to="/pages/about"
                prefetch="intent"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-pill
                  border border-blush-dark text-charcoal
                  font-sans text-sm tracking-wide
                  hover:bg-blush hover:border-blush
                  transition-colors duration-slow ease-aesthetic
                "
              >
                Our Story
              </Link>
            </div>

          </div>

          {/* ── RIGHT: Overlapping image stack ───────────────── */}
          <div className="relative h-[480px] lg:h-[560px]">

            {/* Layer 1 — blush color block (bottom, rotated) */}
            <div className="
              absolute top-6 right-0
              w-[75%] h-[85%]
              bg-blush rounded-card
              rotate-[3deg]
            " />

            {/* Layer 2 — lavender accent block */}
            <div className="
              absolute top-0 right-[15%]
              w-[55%] h-[45%]
              bg-lavender rounded-card
              rotate-[-2deg]
            " />

            {/* Layer 3 — main image card (front center) */}
            <div className="
              absolute top-4 right-[5%]
              w-[70%] h-[80%]
              rounded-card overflow-hidden
              shadow-card-hover
              z-10
            ">
              {heroImage ? (
                <Image
                  data={heroImage}
                  aspectRatio="3/4"
                  sizes="(min-width: 1024px) 400px, 70vw"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder gradient — shown until Shopify is connected */
                <div className="w-full h-full bg-gradient-card" />
              )}
            </div>

            {/* Layer 4 — second smaller card (bottom-left, overlaps) */}
            <div className="
              absolute bottom-0 left-0
              w-[45%] h-[48%]
              rounded-card overflow-hidden
              shadow-card
              border-4 border-cream
              z-20
            ">
              <div className="w-full h-full bg-blush-dark" />
            </div>

            {/* Decorative dot cluster */}
            <div className="
              absolute bottom-12 right-0
              flex flex-col gap-1.5
              z-0
            " aria-hidden="true">
              {[...Array(3)].map((_, row) => (
                <div key={row} className="flex gap-1.5">
                  {[...Array(3)].map((_, col) => (
                    <div
                      key={col}
                      className="w-1.5 h-1.5 rounded-full bg-rose/30"
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
