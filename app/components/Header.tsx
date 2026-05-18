import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {SocialIcons} from '~/components/SocialIcons';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

/**
 * LAYOUT DECISION — 3-column header
 *
 * [Left nav]  [✦ AESTHETIFY ✦]  [Right nav + actions]
 *
 * WHY 3-column instead of logo-left?
 * Centered wordmarks read as more editorial/luxury — matches the
 * Bloom & Ruby and Astra references in the design brief.
 * The two nav groups flanking it create natural visual balance.
 *
 * On mobile we collapse to: [☰]  [✦ AESTHETIFY ✦]  [Search][Cart]
 */
export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;

  return (
    <header className="
      sticky top-0 z-50
      bg-cream/95 backdrop-blur-sm
      border-b border-blush
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── LEFT NAV (desktop only) ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              side="left"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>

          {/* ── BRAND MARK (always visible, centered on desktop) ── */}
          <NavLink
            prefetch="intent"
            to="/"
            end
            aria-label={`${shop.name} — home`}
            className="flex-shrink-0 flex items-center gap-1.5 group"
          >
            {/* Decorative star — matches Canva wireframe */}
            <span
              className="text-rose text-xs leading-none select-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="
              font-display text-lg tracking-widest uppercase
              text-charcoal group-hover:text-rose
              transition-colors duration-slow ease-aesthetic
            ">
              {shop.name}
            </span>
            <span
              className="text-rose text-xs leading-none select-none"
              aria-hidden="true"
            >
              ✦
            </span>
          </NavLink>

          {/* ── RIGHT NAV + ACTIONS (desktop) / ACTIONS (mobile) ── */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {/* Desktop-only nav items */}
            <div className="hidden md:flex items-center gap-6">
              <HeaderMenu
                menu={menu}
                viewport="desktop"
                side="right"
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            </div>

            {/* Social icons — desktop only */}
            <div className="hidden md:flex">
              <SocialIcons />
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-4 bg-blush-dark"
              aria-hidden="true"
            />

            {/* Search + Cart — always visible */}
            <SearchToggle />
            <CartToggle cart={cart} />

            {/* Mobile hamburger */}
            <HeaderMenuMobileToggle />
          </div>

        </div>
      </div>
    </header>
  );
}

/**
 * HeaderMenu — renders nav items for one side of the header.
 *
 * WHY split left/right?
 * The fallback menu has 4 items. We put the first 2 on the left
 * (shop-facing: Cases, Shop All) and last 2 on the right
 * (brand-facing: About, Contact). When Shopify is connected the
 * split reflects however the merchant configures their menu.
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  side = 'left',
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  side?: 'left' | 'right';
}) {
  const {close} = useAside();
  const allItems = (menu || FALLBACK_HEADER_MENU).items;

  // Desktop: split items left/right. Mobile: show all.
  const items =
    viewport === 'desktop'
      ? side === 'left'
        ? allItems.slice(0, 2)
        : allItems.slice(2)
      : allItems;

  const navLinkClass = ({isActive}: {isActive: boolean}) =>
    `font-sans text-sm tracking-wide transition-colors duration-200 ease-aesthetic
     ${isActive
       ? 'text-rose font-medium'
       : 'text-charcoal-soft hover:text-charcoal'
     }`;

  if (viewport === 'mobile') {
    return (
      <nav
        className="flex flex-col gap-4 px-6 pt-4 pb-8"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
          className={navLinkClass}
        >
          Home
        </NavLink>
        {items.map((item) => {
          if (!item.url) return null;
          const url = resolveUrl(item.url, publicStoreDomain, primaryDomainUrl);
          return (
            <NavLink
              end
              key={item.id}
              onClick={close}
              prefetch="intent"
              to={url}
              className={navLinkClass}
            >
              {item.title}
            </NavLink>
          );
        })}
        {/* Social icons in mobile drawer */}
        <div className="pt-4 border-t border-blush">
          <SocialIcons iconClassName="text-charcoal-soft hover:text-rose" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="flex items-center gap-6"
      role="navigation"
      aria-label={`${side} navigation`}
    >
      {items.map((item) => {
        if (!item.url) return null;
        const url = resolveUrl(item.url, publicStoreDomain, primaryDomainUrl);
        return (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className={navLinkClass}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="
        md:hidden flex flex-col gap-1.5 p-1
        text-charcoal hover:text-rose
        transition-colors duration-200
      "
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <span className="block w-5 h-px bg-current" />
      <span className="block w-5 h-px bg-current" />
      <span className="block w-3.5 h-px bg-current" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="
        p-1 text-charcoal-soft hover:text-charcoal
        transition-colors duration-200
      "
      onClick={() => open('search')}
      aria-label="Open search"
    >
      {/* Search icon — inline SVG, no dependency */}
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="
        relative p-1
        text-charcoal-soft hover:text-charcoal
        transition-colors duration-200
      "
      aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      {/* Bag icon */}
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
          strokeLinejoin="round"
        />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Badge — only shows when cart has items */}
      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            min-w-4 h-4 px-1
            bg-rose text-cream text-[10px] font-medium
            rounded-pill flex items-center justify-center
            leading-none
          "
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/**
 * FALLBACK_HEADER_MENU
 *
 * Used when no Shopify store is connected (local dev without .env).
 * Matches the Aesthetify navigation from the Canva wireframe:
 *   Left:  Cases | Shop All
 *   Right: About | Contact
 *
 * Once connected, this is replaced by your Shopify "main-menu" handle.
 */
const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/1',
      resourceId: null,
      tags: [],
      title: 'Cases',
      type: 'HTTP',
      url: '/collections/cases',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/2',
      resourceId: null,
      tags: [],
      title: 'Shop All',
      type: 'HTTP',
      url: '/collections/all',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/3',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/4',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'PAGE',
      url: '/pages/contact',
      items: [],
    },
  ],
};

/** Strips the Shopify domain from internal URLs so NavLink works correctly. */
function resolveUrl(
  url: string,
  publicStoreDomain: string,
  primaryDomainUrl: string,
) {
  return url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
    ? new URL(url).pathname
    : url;
}
