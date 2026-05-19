import {Suspense} from 'react';
import {Await} from 'react-router';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';

interface HomeProductsProps {
  products: Promise<RecommendedProductsQuery | null>;
}

/**
 * HomeProducts — deferred product grid with Evelyn-style script heading
 *
 * DESIGN REFERENCE: Evelyn "Latest on the blog" section — adapted for products.
 * The section heading uses Playfair Display italic, matching the Evelyn
 * script font style. We call it "Recently Added" to be commerce-accurate.
 *
 * WHY DEFERRED?
 * This section is below the fold. Loading it with `defer` means:
 * 1. The page sends HTML + above-fold content immediately (fast TTFB)
 * 2. The product grid streams in after — users see the hero instantly
 * 3. If the Shopify products query fails, the page still renders (no 500)
 *
 * The `<Suspense fallback={<ProductGridSkeleton />}` shows skeleton cards
 * while the deferred data loads, preventing layout shift.
 */
export function HomeProducts({products}: HomeProductsProps) {
  return (
    <section
      className="bg-cream py-16 lg:py-20"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — script-style italic heading (Evelyn pattern) */}
        <div className="text-center mb-10">
          <h2
            id="featured-products-heading"
            className="font-display text-display-sm italic text-charcoal"
          >
            Recently Added
          </h2>
          <div
            className="mx-auto mt-3 w-12 h-px bg-blush-dark"
            aria-hidden="true"
          />
        </div>

        {/* Deferred product grid */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <Await resolve={products}>
            {(response) =>
              response ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {response.products.nodes.map((product, i) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  ))}
                </div>
              ) : null
            }
          </Await>
        </Suspense>

      </div>
    </section>
  );
}

/**
 * ProductGridSkeleton — shown while deferred products load.
 *
 * WHY skeleton over a spinner?
 * Skeletons preserve the grid layout so there's no content jump
 * when real products arrive. The user's eye stays in the right place.
 */
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-blush rounded-card mb-3" />
          <div className="h-3 bg-blush rounded-pill w-3/4 mb-2" />
          <div className="h-3 bg-blush-light rounded-pill w-1/3" />
        </div>
      ))}
    </div>
  );
}
