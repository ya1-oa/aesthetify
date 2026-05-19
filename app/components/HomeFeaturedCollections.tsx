import {Link} from 'react-router';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

interface HomeFeaturedCollectionsProps {
  collections: FeaturedCollectionFragment[];
}

/**
 * HomeFeaturedCollections — 3-column minimal collection cards
 *
 * DESIGN REFERENCE: Evelyn "Beauty / Lifestyle / Planning" category section
 *
 * Each card:
 * - Thin blush border (not heavy shadow — this section should feel light)
 * - Small decorative icon above the title
 * - Uppercase tracking-widest title (Evelyn uses ALL CAPS for categories)
 * - Short description in body font
 * - Arrow link — NOT a full button (keeps the section feeling editorial
 *   rather than sales-y)
 *
 * WHY minimal cards here instead of image cards?
 * The hero and brand story sections already carry the visual weight.
 * The collections grid needs to be fast and scannable — customers who
 * reach this section already want to browse, so friction = bad.
 * Text + icon + arrow is the lowest-friction navigation pattern.
 *
 * FALLBACK:
 * When fewer than 3 collections exist in Shopify (or no store connected),
 * the FALLBACK_COLLECTIONS fill the grid so the layout never breaks.
 */
export function HomeFeaturedCollections({
  collections,
}: HomeFeaturedCollectionsProps) {
  const displayCollections =
    collections.length > 0 ? collections.slice(0, 3) : FALLBACK_COLLECTIONS;

  return (
    <section className="bg-blush-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs tracking-widest uppercase text-rose block mb-3">
            Shop by Category
          </span>
          <h2 className="font-display text-display-sm text-charcoal">
            Find Your <span className="italic">Aesthetic</span>
          </h2>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayCollections.map((collection, i) => (
            <CollectionCard
              key={collection.id ?? i}
              collection={collection}
              icon={COLLECTION_ICONS[i % COLLECTION_ICONS.length]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  icon,
}: {
  collection: FeaturedCollectionFragment | FallbackCollection;
  icon: string;
}) {
  const href =
    'handle' in collection
      ? `/collections/${collection.handle}`
      : (collection as FallbackCollection).href;

  return (
    <div className="
      bg-cream rounded-card
      border border-blush
      p-8 flex flex-col gap-4
      hover:border-blush-dark hover:shadow-card
      transition-all duration-slow ease-aesthetic
      group
    ">

      {/* Icon */}
      <span className="text-2xl select-none" aria-hidden="true">{icon}</span>

      {/* Title — uppercase, tracked out (matches Evelyn category style) */}
      <h3 className="
        font-sans text-xs tracking-widest uppercase
        text-charcoal font-medium
      ">
        {collection.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-charcoal-soft leading-relaxed flex-1">
        {'description' in collection && collection.description
          ? collection.description
          : (collection as FallbackCollection).description}
      </p>

      {/* Arrow link */}
      <Link
        to={href}
        prefetch="intent"
        className="
          inline-flex items-center gap-1.5
          font-sans text-xs tracking-wide text-charcoal-soft
          hover:text-rose group-hover:text-rose
          transition-colors duration-200
          self-start border-b border-transparent
          hover:border-rose
        "
      >
        Shop{' '}
        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Link>

    </div>
  );
}

/* Icons for the first 3 collection cards */
const COLLECTION_ICONS = ['📱', '📲', '✨'];

/* ------------------------------------------------------------------ *
 * Fallback data — shown until Shopify collections are created.
 * Remove once your store has real collections.
 * ------------------------------------------------------------------ */
type FallbackCollection = {
  id: string;
  title: string;
  description: string;
  href: string;
};

const FALLBACK_COLLECTIONS: FallbackCollection[] = [
  {
    id: 'fallback-1',
    title: 'Cases',
    description:
      'Phone cases designed to make your daily carry feel intentional. Soft, minimal, and made for the aesthetic-first generation.',
    href: '/collections/cases',
  },
  {
    id: 'fallback-2',
    title: 'Tablet Cases',
    description:
      'Protect your iPad or tablet without sacrificing style. Clean shapes, soft tones, editorial details.',
    href: '/collections/tablet-cases',
  },
  {
    id: 'fallback-3',
    title: 'Accessories',
    description:
      'The finishing touches. Charms, straps, and add-ons that turn your device into a full aesthetic moment.',
    href: '/collections/accessories',
  },
];
