/**
 * sitemap.ts — generates a fully inclusive /sitemap.xml for search engines.
 *
 * Every public static route plus every product page is listed individually
 * so crawlers discover all deep product URLs without extra round-trips.
 */

import { products } from '@/data/products';

const SITE_URL = 'https://devicedestination.com';

/**
 * Static routes — change these if you add or remove top-level pages.
 */
const STATIC_ROUTES: Array<{
  url: string;
  lastModified?: Date;
  changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}> = [
  { url: '/',                   changeFrequency: 'daily',   priority: 1.0 },
  { url: '/products',           changeFrequency: 'daily',   priority: 0.9 },
  { url: '/contact',            changeFrequency: 'monthly', priority: 0.6 },
  { url: '/about',              changeFrequency: 'monthly', priority: 0.6 },
  { url: '/terms',              changeFrequency: 'yearly',  priority: 0.3 },
  { url: '/refund-policy',      changeFrequency: 'yearly',  priority: 0.3 },
  { url: '/support',            changeFrequency: 'monthly', priority: 0.5 },
  { url: '/downloads',          changeFrequency: 'monthly', priority: 0.5 },
  { url: '/login',              changeFrequency: 'yearly',  priority: 0.2 },
  { url: '/signup',             changeFrequency: 'yearly',  priority: 0.2 },
];

export default function sitemap() {
  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75 as const,
  }));

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.url}`,
      lastModified: r.lastModified ?? new Date(),
      changeFrequency: r.changeFrequency ?? 'weekly',
      priority: r.priority ?? 0.5,
    })),
    ...productEntries,
  ];
}
