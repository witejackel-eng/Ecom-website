/**
 * ProductJsonLd — injects Product + BreadcrumbList structured data for a
 * product detail page.
 *
 * Accepts the raw product object and renders two JSON-LD script tags.
 */

'use client';

import { productSchema, breadcrumbSchema, buildCombinedSchema, type BreadcrumbItem, type JsonLdObject } from '@/lib/schemas';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductJsonLd({ product }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://devicedestination.com' },
    { name: 'Products', url: 'https://devicedestination.com/products' },
    { name: product.brand, url: `https://devicedestination.com/products?category=${encodeURIComponent(product.brand)}` },
    { name: product.category, url: `https://devicedestination.com/products?category=${encodeURIComponent(product.category)}` },
    { name: product.model, url: `https://devicedestination.com/products/${product.id}` },
  ];

  const schema: JsonLdObject = {
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.model,
    mpn: product.model,
    offers: {
      '@type': 'Offer',
      url: `https://devicedestination.com/products/${product.id}`,
      priceCurrency: 'INR',
      price: (product.price / 1).toFixed(2),
      availability: `https://schema.org/${product.inStock ? 'InStock' : 'OutOfStock'}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'DeviceDestination',
        url: 'https://devicedestination.com',
      },
    },
    image: product.images[0],
  };

  const combined = buildCombinedSchema([breadcrumbSchema(breadcrumbs), schema]);

  return (
    <script
      id="json-ld-product"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: combined }}
    />
  );
}
