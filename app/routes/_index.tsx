import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import {HeroSlider} from '~/components/HeroSlider';
import {HomeBrandStory} from '~/components/HomeBrandStory';
import {HomeFeaturedCollections} from '~/components/HomeFeaturedCollections';
import {HomeProducts} from '~/components/HomeProducts';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Aesthetify — Curate Your World'},
    {
      name: 'description',
      content:
        'Aesthetic phone cases and accessories for people who treat everyday objects as an extension of themselves.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Deferred (below-fold) data starts fetching immediately but doesn't
  // block the initial HTML response. Products stream in after first paint.
  const deferredData = loadDeferredData(args);

  // Critical (above-fold) data is awaited — the hero needs collection data.
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Critical data — blocks until resolved, used above the fold.
 * HeroSlider manages its own slide content, so we only need collections
 * for the HomeFeaturedCollections grid below the fold.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(HOMEPAGE_COLLECTIONS_QUERY),
  ]);

  return {
    collections: collections.nodes as FeaturedCollectionFragment[],
  };
}

/**
 * Deferred data — doesn't block HTML. Products grid streams in after load.
 * Safe to fail: a catch returns null and the section simply doesn't render.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {recommendedProducts};
}

export default function Homepage() {
  const {collections, recommendedProducts} = useLoaderData<typeof loader>();

  return (
    <>
      {/* 1. Hero slideshow — full-width, top of page */}
      <HeroSlider />

      {/* 2. Brand story — collage + copy */}
      <HomeBrandStory />

      {/* 3. Collections grid — 3 category cards */}
      <HomeFeaturedCollections collections={collections} />

      {/* 4. Product grid — deferred, streams in after first paint */}
      <HomeProducts products={recommendedProducts} />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * GRAPHQL QUERIES
 * ------------------------------------------------------------------ */

/**
 * Fetches 3 collections for the hero image (first) and collections grid.
 * Extended from the scaffold's single-collection query.
 * description is added for the collection cards.
 */
const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query HomepageCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
