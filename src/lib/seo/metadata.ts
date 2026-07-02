// @refresh 🔄

/**
 * SEO metadata generation for DeviceDestination
 * Generates unique, dynamic metadata for every page based on actual content.
 * Never uses placeholder or reused metadata.
 * Every page has a self-referencing canonical URL.
 */

import type { Metadata } from "next";
import { SITE, BRAND_INFO, CATEGORY_INFO, CATEGORY_SLUGS, BRAND_SLUGS } from "./constants";
import type { Product } from "./types";

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function truncateDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

function getKeywords(words: string[]): string[] {
  return [...new Set(words.map((w) => w.trim()).filter(Boolean))];
}

function getOpenGraph(opts: {
  title: string;
  description: string;
  url: string;
  images: { url: string; width: number; height: number; alt: string }[];
}): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: opts.title,
    description: opts.description,
    url: opts.url,
    images: opts.images,
  };
}

function getTwitterCard(opts: {
  title: string;
  description: string;
  images: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: opts.images,
    creator: "@devicedestination",
  };
}

/** Build a product detail URL */
function getProductUrl(product: Product): string {
  const brandSlug = BRAND_SLUGS[product.brand] || product.brand.toLowerCase().replace(/\s+/g, "-");
  const categorySlug = CATEGORY_SLUGS[product.category] || product.category.toLowerCase().replace(/\s+/g, "-");
  return `${SITE.url}/products/${brandSlug}/${categorySlug}/${product.id}`;
}

/* ─── Site-wide defaults ──────────────────────────────────────────────── */

export function getRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} – ${SITE.tagline}`,
      template: `%s | ${SITE.name}`,
    },
    description:
      `DeviceDestination — authorised CP Plus & eSSL dealer in Delhi NCR. ` +
      `Genuine OEM surveillance cameras, NVR systems, biometric attendance machines. ` +
      `OEM warranty & certified installation partners across Delhi, Noida, Gurgaon, Faridabad.`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: SITE.shortName,
    },
    formatDetection: { telephone: true, email: true, address: true },
    other: {
      "geo.region": "IN-DL",
      "geo.placename": SITE.address.city,
      "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
      "ICBM": `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
    },
  };
}

/* ─── Homepage ────────────────────────────────────────────────────────── */

export function getHomeMetadata(): Metadata {
  const title = `${SITE.name} – CP Plus CCTV, eSSL Biometrics & Security Systems in Delhi NCR`;
  const description =
    `Buy genuine CP Plus CCTV cameras, NVRs, eSSL biometric systems, video door phones ` +
    `and security accessories with OEM warranty, GST invoices and trusted delivery across Delhi NCR.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: SITE.url },
    openGraph: getOpenGraph({
      title,
      description,
      url: SITE.url,
      images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: SITE.name }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-home.jpg" }),
    keywords: getKeywords([
      "DeviceDestination", "CP Plus", "eSSL", "CCTV cameras Delhi NCR",
      "security systems Delhi", "NVR systems", "biometric attendance machines",
      "OEM surveillance cameras", "professional security solutions",
      "CP Plus dealer Delhi", "eSSL biometric Delhi",
      "video door phone", "access control Delhi NCR",
    ]),
  };
}

/* ─── Products listing ────────────────────────────────────────────────── */

export function getProductsMetadata(): Metadata {
  const title = "Security & Surveillance Products – CP Plus, eSSL | DeviceDestination";
  const description =
    "Browse genuine CP Plus CCTV cameras, NVR recorders, and eSSL biometric machines. " +
    "Full product catalogue with OEM warranty. Delhi NCR delivery available. GST invoices.";

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/products` },
    openGraph: getOpenGraph({
      title,
      description,
      url: `${SITE.url}/products`,
      images: [{ url: "/og-products.jpg", width: 1200, height: 630, alt: "Products – DeviceDestination" }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-products.jpg" }),
    keywords: getKeywords([
      "CCTV cameras", "surveillance products", "CP Plus", "eSSL biometric",
      "NVR systems", "security cameras Delhi NCR", "IP cameras",
      "dome cameras", "bullet cameras", "biometric machines",
    ]),
  };
}

/* ─── Category pages ──────────────────────────────────────────────────── */

export function getCategoryMetadata(categoryName: string): Metadata {
  const info = CATEGORY_INFO[categoryName];
  const title = `${categoryName} – Genuine OEM CCTV Cameras | DeviceDestination`;
  const description = info?.description
    ? `${info.description} Genuine OEM products with warranty across Delhi NCR.`
    : `Browse our range of ${categoryName}. OEM-authorised products with full warranty. Shop from DeviceDestination.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/products?category=${encodeURIComponent(categoryName)}` },
    openGraph: getOpenGraph({
      title,
      description,
      url: `${SITE.url}/products?category=${encodeURIComponent(categoryName)}`,
      images: [{ url: info?.image || "/og-products.jpg", width: 1200, height: 630, alt: `${categoryName} – DeviceDestination` }],
    }),
    twitter: getTwitterCard({ title, description, images: info?.image || "/og-products.jpg" }),
    keywords: getKeywords([
      categoryName, "CP Plus", "CCTV", "surveillance", "security cameras",
      "Delhi NCR", "OEM warranty",
    ]),
  };
}

/* ─── Brand pages ─────────────────────────────────────────────────────── */

export function getBrandMetadata(brandName: string): Metadata {
  const brandInfo = BRAND_INFO[brandName];
  const title = `${brandName} Products – Authorised ${brandName} Dealer Delhi NCR | DeviceDestination`;
  const description = brandInfo?.description
    ? `${brandInfo.description} Shop genuine ${brandName} products with OEM warranty across Delhi NCR.`
    : `Browse genuine ${brandName} products at DeviceDestination. Authorised dealer with OEM warranty in Delhi NCR.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/products?brand=${encodeURIComponent(brandName)}` },
    openGraph: getOpenGraph({
      title,
      description,
      url: `${SITE.url}/products?brand=${encodeURIComponent(brandName)}`,
      images: [{ url: "/og-products.jpg", width: 1200, height: 630, alt: `${brandName} – DeviceDestination` }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-products.jpg" }),
    keywords: getKeywords([
      brandName, "CCTV", "security products", "surveillance",
      "Delhi NCR dealer", "authorised dealer", "OEM warranty",
    ]),
  };
}

/* ─── Product detail page ─────────────────────────────────────────────── */

export function getProductMetadata(product: Product): Metadata {
  const productUrl = getProductUrl(product);
  const title = `${product.model} | ${product.brand} ${product.category} | DeviceDestination`;
  const description =
    `Buy genuine ${product.model} ${product.brand} ${product.category}. ` +
    `${product.shortDescription.slice(0, 80)} ` +
    `OEM warranty, GST invoice and trusted delivery across Delhi NCR.`;

  const imageUrl = product.images?.[0]
    ? `${product.images[0]}`
    : "/og-products.jpg";
  const ogImage = { url: imageUrl, width: 1200, height: 630, alt: `${product.model} ${product.name} – DeviceDestination` };

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: productUrl },
    openGraph: getOpenGraph({ title, description, url: productUrl, images: [ogImage] }),
    twitter: getTwitterCard({ title, description, images: imageUrl }),
    keywords: getKeywords([
      product.model, product.name, product.brand, product.category,
      "CCTV", "security camera", "surveillance", "Delhi NCR",
      "OEM warranty", "IP camera",
    ]),
    other: {
      "product:retailer_item_id": product.model,
      "product:brand": product.brand,
      "product:category": product.category,
      "product:price:amount": String(product.mrp),
      "product:price:currency": "INR",
    },
  };
}

/* ─── About page ──────────────────────────────────────────────────────── */

export function getAboutMetadata(): Metadata {
  const title = `About Us – Authorised CP Plus & eSSL Dealer Delhi NCR`;
  const description =
    `DeviceDestination is Delhi NCR's authorised OEM supplier of CP Plus CCTV cameras, ` +
    `NVR systems, eSSL biometric machines, and security accessories. ` +
    `Learn about our OEM warranty commitment, certified installation partners, and service areas in Delhi, Noida, Gurgaon, Faridabad.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/about` },
    openGraph: getOpenGraph({
      title, description, url: `${SITE.url}/about`,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `About ${SITE.name}` }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-default.jpg" }),
    keywords: getKeywords([
      "about DeviceDestination", "CP Plus dealer Delhi", "eSSL authorised partner",
      "CCTV supplier Delhi NCR", "security company Delhi", "biometric supplier",
    ]),
  };
}

/* ─── Contact page ────────────────────────────────────────────────────── */

export function getContactMetadata(): Metadata {
  const title = `Contact Us – CP Plus & eSSL Dealer | Dwarka, New Delhi`;
  const description =
    `Get in touch with DeviceDestination for CP Plus CCTV, eSSL biometric, and security product inquiries. ` +
    `Visit our office in Dwarka, New Delhi or call +91 83685 61919. OEM warranty, GST billing, Delhi NCR delivery.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/contact` },
    openGraph: getOpenGraph({
      title, description, url: `${SITE.url}/contact`,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `Contact ${SITE.name}` }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-default.jpg" }),
    keywords: getKeywords([
      "contact DeviceDestination", "CP Plus dealer Dwarka", "eSSL Delhi",
      "CCTV supplier contact", "security products Delhi NCR",
      "biometric system inquiry",
    ]),
  };
}

/* ─── Support page ────────────────────────────────────────────────────── */

export function getSupportMetadata(): Metadata {
  const title = `Support – Technical Assistance & Warranty | DeviceDestination`;
  const description =
    `DeviceDestination support portal — technical support, asset documentation, and warranty protocols ` +
    `for CP Plus CCTV, NVR, and eSSL biometric systems. OEM warranty assistance across Delhi NCR.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/support` },
    openGraph: getOpenGraph({
      title, description, url: `${SITE.url}/support`,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `Support – ${SITE.name}` }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-default.jpg" }),
    keywords: getKeywords([
      "CCTV support Delhi NCR", "CP Plus warranty", "eSSL technical support",
      "security system assistance", "DeviceDestination support",
    ]),
  };
}

/* ─── Terms & Conditions ──────────────────────────────────────────────── */

export function getTermsMetadata(): Metadata {
  const title = `Terms & Conditions – DeviceDestination`;
  const description =
    `Terms & Conditions for DeviceDestination.com. Governing sales of CP Plus CCTV, eSSL biometric systems, ` +
    `and security accessories. OEM warranty, delivery, payment, and liability. Jurisdiction: New Delhi, India.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/terms` },
    robots: { index: false, follow: true },
  };
}

/* ─── Refund Policy ───────────────────────────────────────────────────── */

export function getRefundMetadata(): Metadata {
  const title = `Refund & Return Policy – DeviceDestination`;
  const description =
    `DeviceDestination's refund and return policy for CP Plus CCTV, eSSL biometric, and security products. ` +
    `48-hour return window for defects, OEM warranty replacement, refund within 7-10 business days.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/refund-policy` },
    robots: { index: false, follow: true },
  };
}

/* ─── Cart page ───────────────────────────────────────────────────────── */

export function getCartMetadata(): Metadata {
  const title = `Shopping Cart – DeviceDestination`;
  const description =
    `Review your security products — CP Plus CCTV cameras, NVR systems, and eSSL biometric machines. ` +
    `Proceed to checkout with OEM warranty and GST billing.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/cart` },
    robots: { index: false, follow: false },
  };
}

/* ─── Checkout page ───────────────────────────────────────────────────── */

export function getCheckoutMetadata(): Metadata {
  const title = `Checkout – DeviceDestination`;
  const description =
    `Complete your order for CP Plus CCTV and eSSL biometric products. ` +
    `Secure checkout with GST billing and Delhi NCR delivery.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/checkout` },
    robots: { index: false, follow: false },
  };
}

/* ─── Login page ────────────────────────────────────────────────────────── */

export function getLoginMetadata(): Metadata {
  const title = `Sign In – DeviceDestination Account`;
  const description =
    `Sign in to your DeviceDestination account to manage orders, quotations, wishlist, ` +
    `and business details for CP Plus and eSSL security products.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/login` },
    robots: { index: false, follow: false },
  };
}

/* ─── Signup page ───────────────────────────────────────────────────────── */

export function getSignupMetadata(): Metadata {
  const title = `Create Account – DeviceDestination`;
  const description =
    `Create a DeviceDestination account to track orders, save wishlist items, ` +
    `manage quotations, and store business details for faster checkout.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/signup` },
    robots: { index: false, follow: false },
  };
}

/* ─── Account pages ───────────────────────────────────────────────────── */

export function getAccountMetadata(): Metadata {
  return {
    title: `My Account – DeviceDestination`,
    description: `Manage your DeviceDestination account — orders, quotations, wishlist, addresses, business details, and password.`,
    alternates: { canonical: `${SITE.url}/account` },
    robots: { index: false, follow: false },
  };
}

export function getAccountOrdersMetadata(): Metadata {
  return {
    title: `My Orders – DeviceDestination`,
    description: `View and track your CP Plus and eSSL product orders. Order history with delivery status and invoice details.`,
    alternates: { canonical: `${SITE.url}/account/orders` },
    robots: { index: false, follow: false },
  };
}

export function getAccountProfileMetadata(): Metadata {
  return { title: `My Profile – DeviceDestination`, robots: { index: false, follow: false } };
}

export function getAccountAddressesMetadata(): Metadata {
  return { title: `Saved Addresses – DeviceDestination`, robots: { index: false, follow: false } };
}

export function getAccountBusinessMetadata(): Metadata {
  return { title: `Business Details – DeviceDestination`, robots: { index: false, follow: false } };
}

export function getAccountWishlistMetadata(): Metadata {
  return { title: `My Wishlist – DeviceDestination`, robots: { index: false, follow: false } };
}

export function getAccountQuotationsMetadata(): Metadata {
  return { title: `Quotations / RFQs – DeviceDestination`, robots: { index: false, follow: false } };
}

export function getAccountChangePasswordMetadata(): Metadata {
  return { title: `Change Password – DeviceDestination`, robots: { index: false, follow: false } };
}

/* ─── Downloads page ───────────────────────────────────────────────────── */

export function getDownloadsMetadata(): Metadata {
  const title = `Technical Assets & Documentation – DeviceDestination`;
  const description =
    `Access secure documentation, datasheets, configuration guides, and warranty protocols ` +
    `for CP Plus CCTV, NVR, and eSSL biometric systems. Technical resources for Delhi NCR customers.`;

  return {
    title,
    description: truncateDescription(description),
    alternates: { canonical: `${SITE.url}/downloads` },
    openGraph: getOpenGraph({
      title, description, url: `${SITE.url}/downloads`,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `Downloads – ${SITE.name}` }],
    }),
    twitter: getTwitterCard({ title, description, images: "/og-default.jpg" }),
    keywords: getKeywords([
      "CP Plus datasheet", "eSSL manual", "CCTV documentation",
      "security system guides", "DeviceDestination downloads",
    ]),
  };
}

export { truncateDescription, getProductUrl };
