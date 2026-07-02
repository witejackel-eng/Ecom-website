/**
 * JSON-LD Structured Data generation for DeviceDestination
 * Implements Google-recommended schemas for ecommerce SEO.
 * No fake data — only real product/page information is used.
 */

import { SITE, CATEGORY_SLUGS, BRAND_SLUGS } from "./constants";
import type { Product } from "./types";

/**
 * Build a clean product URL from product data.
 */
function getProductUrl(product: Product): string {
  return `${SITE.url}/products/${product.id}`;
}

/** Organization + WebSite + SearchAction for the homepage */
export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/favicon.svg`,
        description: `${SITE.name} — Authorised CP Plus & eSSL dealer in Delhi NCR.`,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.state,
          postalCode: SITE.address.pincode,
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phone,
          contactType: "sales",
          email: SITE.email,
          availableLanguage: ["English", "Hindi"],
          areaServed: SITE.cities,
        },
        sameAs: [
          SITE.social.facebook,
          SITE.social.instagram,
          SITE.social.youtube,
          SITE.social.linkedin,
        ],
        foundingDate: SITE.foundingDate,
        areaServed: {
          "@type": "City",
          name: SITE.serviceArea,
          sameAs: "https://en.wikipedia.org/wiki/National_Capital_Region_(India)",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: `${SITE.name} — ${SITE.tagline}`,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE.url}/products?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/** CollectionPage + BreadcrumbList for the products listing page */
export function getProductsStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/products`,
        url: `${SITE.url}/products`,
        name: "Security & Surveillance Products – DeviceDestination",
        description: "Browse genuine CP Plus CCTV cameras, NVR recorders, and eSSL biometric machines with OEM warranty.",
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/products#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
        ],
      },
    ],
  };
}

/** Product structured data for individual product pages */
export function getProductStructuredData(product: Product) {
  const productUrl = getProductUrl(product);
  const imageUrls = product.images?.map((img) => `${SITE.url}${img}`) || [];

  const brandSlug = BRAND_SLUGS[product.brand] || product.brand.toLowerCase().replace(/\s+/g, "-");
  const categorySlug = CATEGORY_SLUGS[product.category] || product.category.toLowerCase().replace(/\s+/g, "-");

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    { "@type": "ListItem", position: 3, name: product.brand, item: `${SITE.url}/products/${brandSlug}` },
    { "@type": "ListItem", position: 4, name: product.category, item: `${SITE.url}/products/${brandSlug}/${categorySlug}` },
    { "@type": "ListItem", position: 5, name: product.name },
  ];

  const hasGenuineReviews = typeof product.rating === "number" && product.rating > 0 && product.rating <= 5;

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: product.name,
        description: product.shortDescription,
        sku: product.model,
        mpn: product.model,
        model: product.model,
        image: imageUrls,
        brand: {
          "@type": "Brand",
          "@id": `${SITE.url}/brands/${brandSlug}#brand`,
          name: product.brand,
        },
        category: product.category,
        offers: {
          "@type": "Offer",
          "@id": `${productUrl}#offer`,
          url: productUrl,
          priceCurrency: "INR",
          price: product.mrp,
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", "@id": `${SITE.url}/#organization` },
        },
        ...(hasGenuineReviews && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            bestRating: 5,
            worstRating: 1,
            reviewCount: 1,
          },
        }),
      },
    ],
  };

  return schema;
}
/** FAQ structured data for homepage */
export function getFaqStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** LocalBusiness structured data for Contact page */
export function getLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    image: `${SITE.url}/og-default.jpg`,
    description: `${SITE.name} — Authorised CP Plus & eSSL dealer in Delhi NCR.`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.openingHours.weekdays.opens,
        closes: SITE.openingHours.weekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: SITE.openingHours.saturday.opens,
        closes: SITE.openingHours.saturday.closes,
      },
    ],
    areaServed: {
      "@type": "City",
      name: SITE.serviceArea,
      sameAs: "https://en.wikipedia.org/wiki/National_Capital_Region_(India)",
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.youtube,
      SITE.social.linkedin,
    ],
    foundingDate: SITE.foundingDate,
    priceRange: "₹₹",
  };
}

/** AboutPage structured data */
export function getAboutStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE.url}/about#aboutpage`,
        url: `${SITE.url}/about`,
        name: `About ${SITE.name} – Authorised CP Plus & eSSL Dealer Delhi NCR`,
        description: `Learn about ${SITE.name}, Delhi NCR's authorised OEM supplier of CP Plus CCTV cameras, NVR systems, eSSL biometric machines, and security accessories.`,
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/about#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
        ],
      },
    ],
  };
}

/** ContactPage structured data */
export function getContactStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE.url}/contact#contactpage`,
        url: `${SITE.url}/contact`,
        name: `Contact ${SITE.name} – Dwarka, New Delhi`,
        description: `Get in touch with ${SITE.name} for CP Plus CCTV, eSSL biometric, and security product inquiries.`,
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/contact#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.url}/contact` },
        ],
      },
    ],
  };
}

/** Category breadcrumb list */
export function getCategoryBreadcrumbData(categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/products?category=${encodeURIComponent(categoryName)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
      { "@type": "ListItem", position: 3, name: categoryName, item: `${SITE.url}/products?category=${encodeURIComponent(categoryName)}` },
    ],
  };
}

