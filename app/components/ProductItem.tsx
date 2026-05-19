import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

/**
 * ProductItem — brand-styled product card
 *
 * Uses Aesthetify design tokens throughout.
 * Image zooms on hover via `group` + `group-hover:scale-105`.
 *
 * WHY group hover on the parent Link instead of on the image directly?
 * The `group` utility lets child elements respond to the parent's
 * hover state. This means the shadow lifts AND the image zooms together
 * when the user hovers anywhere on the card — not just the image.
 */
export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <Link
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      className="
        group block
        bg-cream-dark rounded-card overflow-hidden
        shadow-card hover:shadow-card-hover
        transition-shadow duration-slow ease-aesthetic
      "
    >
      {/* Image container — overflow-hidden clips the zoom */}
      <div className="aspect-square overflow-hidden bg-blush-light">
        {image ? (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 50vw"
            className="
              w-full h-full object-cover
              transition-transform duration-slower ease-aesthetic
              group-hover:scale-105
            "
          />
        ) : (
          /* No-image fallback — blush gradient placeholder */
          <div className="w-full h-full bg-gradient-card" />
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h4 className="
          font-sans text-sm font-medium text-charcoal
          leading-snug line-clamp-2 mb-1
        ">
          {product.title}
        </h4>
        <p className="font-sans text-xs text-charcoal-soft">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
      </div>
    </Link>
  );
}
