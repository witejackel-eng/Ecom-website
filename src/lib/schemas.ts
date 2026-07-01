/**
 * Structured data (JSON-LD) generators for DeviceDestination.
 *
 * All schemas are returned as plain objects (not serialised strings)
 * so that Next.js can inject them via dangerouslySetInnerHTML.
 */

export type JsonLdObject = Record<string, unknown>;

export function toJsonLd(obj: JsonLdObject): string {
  return JSON.stringify(obj, null, 2);
}

const JSON_LD_BASE = {
  '@context': 'https://schema.org' as const,
};

export const SITE_URL = 'https://devicedestination.com';

// ─── BreadcrumbList ────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQPage ───────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─── WebSite + SearchAction ────────────────────────────────────────────────

export function websiteSchema(): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@type': 'WebSite',
    name: 'DeviceDestination',
    description: 'Professional security & biometric equipment.',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── Organization ──────────────────────────────────────────────────────────

export function organizationSchema(): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@id': `${SITE_URL}/#organization`,
    '@type': 'Organization',
    name: 'DeviceDestination',
    legalName: 'Insight Business Solutions',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: 'manish@insight-solutions.in',
    telephone: '+91-83685-61919',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 94, 3rd Floor, Block - B, Sector - 13',
      addressLocality: 'Dwarka',
      addressRegion: 'New Delhi',
      postalCode: '110075',
      addressCountry: 'IN',
    },
    sameAs: [] as string[],
  };
}

// ─── LocalBusiness ─────────────────────────────────────────────────────────

export function localBusinessSchema(): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@type': 'LocalBusiness',
    name: 'DeviceDestination',
    description: 'Authorised CP Plus & ESSL dealer — genuine OEM CCTV cameras, NVR systems, and biometric attendance devices.',
    url: SITE_URL,
    email: 'manish@insight-solutions.in',
    telephone: '+91-83685-61919',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 94, 3rd Floor, Block - B, Sector - 13',
      addressLocality: 'Dwarka',
      addressRegion: 'DL',
      postalCode: '110075',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5921,
      longitude: 77.0488,
    },
    priceRange: '₹₹',
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Faridabad' },
      { '@type': 'City', name: 'Dwarka' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    ],
  };
}

// ─── Product ───────────────────────────────────────────────────────────────

export interface ProductSchemaParams {
  url: string;
  name: string;
  description: string;
  brand: string;
  sku: string;
  priceINR: number;       // in paise (e.g. 310000 for ₹3,100.00)
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  image: string;
  additionalImage?: string[];
}

export function productSchema(p: ProductSchemaParams): JsonLdObject {
  return {
    ...JSON_LD_BASE,
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: {
      '@type': 'Brand',
      name: p.brand,
    },
    sku: p.sku,
    mpn: p.sku,
    offers: {
      '@type': 'Offer',
      url: p.url,
      priceCurrency: 'INR',
      price: (p.priceINR / 100).toFixed(2),
      availability: `https://schema.org/${p.availability}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'DeviceDestination',
        url: SITE_URL,
      },
    },
    image: p.image,
  };
}

// ─── Combined helper ───────────────────────────────────────────────────────

export function buildCombinedSchema(schemas: JsonLdObject[]): string {
  const payload = schemas.map((s) => ({
    '@context': 'https://schema.org',
    ...s,
  }));
  return `[${JSON.stringify(payload).replace(/</g, '\\u003c')}]`;
}

