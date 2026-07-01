/**
 * Shared metadata constants for the DeviceDestination enterprise tech store.
 * Centralises all SEO, Open Graph, Twitter Card, and brand-level metadata
 * so that every route can compose against a single source of truth.
 */

export const SITE_NAME = "DeviceDestination";
export const SITE_URL = "https://devicedestination.com";
export const SITE_DESCRIPTION =
  "DeviceDestination offers CP Plus surveillance cameras, NVR systems, and ESSL biometric attendance machines. Serving Delhi, Noida, Gurgaon, Faridabad and Dwarka with genuine OEM products and warranty support.";
export const SITE_KEYWORDS = [
  "CCTV",
  "security cameras",
  "surveillance cameras",
  "NVR systems",
  "biometric attendance",
  "CP Plus cameras",
  "ESSL biometric",
  "access control",
  "video door phone",
  "security systems Delhi",
  "Dwarka security equipment",
  "DeviceDestination",
];

export const ORGANIZATION = {
  name: "DeviceDestination",
  legalName: "Insight Business Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: SITE_DESCRIPTION,
  email: "manish@insight-solutions.in",
  telephone: "+91 83685 61919",
  address: {
    streetAddress: "Plot No. 94, 3rd Floor, Block - B, Sector - 13",
    addressLocality: "Dwarka",
    addressRegion: "New Delhi",
    postalCode: "110075",
    addressCountry: "IN",
  },
  sameAs: [
    // "https://www.facebook.com/devicedestination",
    // "https://www.linkedin.com/company/devicedestination",
  ],
};

export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: ORGANIZATION.name,
  description: ORGANIZATION.description,
  url: ORGANIZATION.url,
  email: ORGANIZATION.email,
  telephone: ORGANIZATION.telephone,
  address: {
    "@type": "PostalAddress",
    ...ORGANIZATION.address,
  },
  priceRange: "₹₹",
  areaServed: ["Delhi", "Noida", "Gurgaon", "Faridabad", "Dwarka"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:00",
    },
  ],
};

export const OPEN_GRAPH = {
  siteName: SITE_NAME,
  type: "website" as const,
  locale: "en_IN",
};

export const TWITTER = {
  card: "summary_large_image" as const,
  site: "@devicedestination",
  creator: "@devicedestination",
};

export const VIEWPORT = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0E2732",
};

/**
 * Build per-page metadata from a lightweight descriptor.
 *
 * Note: this utility is used only at build time for server components.
 */
export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
  keywords?: string[];
}) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords ?? SITE_KEYWORDS,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: url,
      },
    },
    robots: {
      index: !opts.noIndex,
      follow: !opts.noIndex,
      googleBot: {
        index: !opts.noIndex,
        follow: !opts.noIndex,
      },
    },
    openGraph: {
      ...OPEN_GRAPH,
      url,
      title: opts.title,
      description: opts.description,
      images: [
        {
          url:
            opts.ogImage ??
            `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    twitter: {
      ...TWITTER,
      title: opts.title,
      description: opts.description,
      images: [
        {
          url:
            opts.ogImage ??
            `${SITE_URL}/twitter-image`,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    other: {
      "geo.region": "IN-DL",
      "geo.placename": "New Delhi",
    },
  };
}
