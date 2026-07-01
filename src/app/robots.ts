/**
 * robots.ts — generates /robots.txt for Google, Bing, and all major crawlers.
 *
 * Production rules:
 *   • Allow crawl of all public pages
 *   • Disallow /account, /api, /_next, and staged paths
 *   • Explicitly point to the sitemap
 */

export default function robots(): {
  rules: { userAgent: string; allow: string[]; disallow: string[] }[];
  sitemap: string;
} {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/account/',
          '/api/',
          '/_next/',
          '/products_bak/',   // staged copy, keep out of index
          '/*?*sort=',        // filter/sort query strings
          '/checkout/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/account/', '/api/', '/_next/', '/products_bak/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/account/', '/api/', '/_next/', '/products_bak/'],
      },
    ],
    sitemap: 'https://devicedestination.com/sitemap.xml',
  };
}
