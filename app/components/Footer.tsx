import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {SocialIcons} from '~/components/SocialIcons';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

const CURRENT_YEAR = new Date().getFullYear();

/**
 * LAYOUT DECISION — soft 3-row footer
 *
 * Row 1: Brand mark + tagline
 * Row 2: Policy links from Shopify footer menu
 * Row 3: Social icons + copyright
 *
 * WHY soft cream background instead of dark?
 * The original scaffold uses a black footer. For Aesthetify the dark
 * footer clashes with the blush/cream palette and feels heavy.
 * A blush-light footer keeps the page feeling light end-to-end.
 */
export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="
            mt-auto
            bg-blush-light border-t border-blush
          ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

              {/* Row 1 — Brand */}
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-rose text-xs" aria-hidden="true">✦</span>
                  <span className="font-display text-xl tracking-widest uppercase text-charcoal">
                    {header.shop.name}
                  </span>
                  <span className="text-rose text-xs" aria-hidden="true">✦</span>
                </div>
                <p className="font-sans text-sm text-charcoal-soft tracking-wide italic">
                  Curate Your World
                </p>
              </div>

              {/* Row 2 — Policy links */}
              {footer?.menu && header.shop.primaryDomain?.url && (
                <FooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}

              {/* Row 3 — Social + copyright */}
              <div className="
                flex flex-col sm:flex-row items-center justify-between
                gap-4 mt-8 pt-8 border-t border-blush
              ">
                <SocialIcons
                  iconClassName="text-charcoal-soft hover:text-rose"
                />
                <p className="font-sans text-xs text-charcoal-soft">
                  &copy; {CURRENT_YEAR} {header.shop.name}. All rights reserved.
                </p>
              </div>

            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  const linkClass = ({isActive}: {isActive: boolean}) =>
    `font-sans text-xs tracking-wide transition-colors duration-200
     ${isActive ? 'text-charcoal font-medium' : 'text-charcoal-soft hover:text-charcoal'}`;

  return (
    <nav
      className="flex flex-wrap justify-center gap-x-6 gap-y-2"
      role="navigation"
      aria-label="Footer navigation"
    >
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');

        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className="font-sans text-xs text-charcoal-soft hover:text-charcoal transition-colors duration-200"
          >
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className={linkClass}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
