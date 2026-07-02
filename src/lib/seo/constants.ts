/**
 * SEO constants for DeviceDestination
 * Centralised configuration for all SEO-related metadata.
 * Single source of truth – update once, propagate everywhere.
 */

export const SITE = {
  name: "DeviceDestination",
  tagline: "Professional Security & Biometric Solutions",
  shortName: "DD",
  url: "https://www.devicedestination.com",
  defaultLocale: "en-IN",
  themeColor: "#FF8A00",
  backgroundColor: "#081C24",
  email: "manish@insight-solutions.in",
  phone: "+918368561919",
  address: {
    street: "Plot No. 94, 3rd Floor, Block - B, Sector - 13",
    locality: "Dwarka",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110075",
    country: "India",
  },
  geo: {
    latitude: "28.5927",
    longitude: "77.0386",
  },
  foundingDate: "2024",
  serviceArea: "Delhi NCR",
  cities: ["Delhi", "New Delhi", "Dwarka", "Noida", "Gurgaon", "Faridabad"],
  /** Hours in ISO day + HH:mm format */
  openingHours: {
    weekdays: { opens: "10:00", closes: "19:00" },
    saturday: { opens: "10:00", closes: "17:00" },
  },
  social: {
    facebook: "https://facebook.com/devicedestination",
    instagram: "https://instagram.com/devicedestination",
    youtube: "https://youtube.com/@devicedestination",
    linkedin: "https://linkedin.com/company/devicedestination",
  },
} as const;

export const BRAND_INFO: Record<string, { description: string; url: string }> = {
  "CP Plus": {
    description: "Authorised CP Plus dealer in Delhi NCR — genuine OEM surveillance cameras, NVR systems, and accessories with full OEM warranty.",
    url: "https://www.cpplusworld.com",
  },
  eSSL: {
    description: "Authorised eSSL dealer in Delhi NCR — genuine biometric attendance machines, face recognition terminals, and access control systems.",
    url: "https://www.esslsecurity.com",
  },
} as const;

export const CATEGORY_INFO: Record<string, { description: string; image?: string }> = {
  "Dome Cameras": {
    description: "Professional CP Plus dome cameras for indoor and outdoor surveillance with IR night vision, PoE, and IP67 weatherproof housing.",
    image: "/images/categories/dome-cameras.jpg",
  },
  "Bullet Cameras": {
    description: "High-performance CP Plus bullet cameras for perimeter surveillance with long-range IR, weatherproof design, and advanced compression.",
    image: "/images/categories/bullet-cameras.jpg",
  },
  "Color Dome Cameras": {
    description: "Advanced CP Plus color dome cameras with full-color night vision using dual-light technology for 24/7 color surveillance.",
    image: "/images/categories/color-dome-cameras.jpg",
  },
  "Color Bullet Cameras": {
    description: "CP Plus color bullet cameras with full-color night vision for outdoor perimeter security with vivid detail in low-light conditions.",
    image: "/images/categories/color-bullet-cameras.jpg",
  },
  "NVR Systems": {
    description: "CP Plus network video recorders for reliable 24/7 recording with PoE support, H.265 compression, and remote viewing capabilities.",
    image: "/images/categories/nvr-systems.jpg",
  },
  "Biometric Devices": {
    description: "ESSL biometric attendance and access control systems including face recognition terminals, fingerprint scanners, and hybrid solutions.",
    image: "/images/categories/biometric-devices.jpg",
  },
} as const;

export const SEO_LIMITS = {
  titleMin: 50,
  titleMax: 60,
  descriptionMin: 140,
  descriptionMax: 160,
} as const;

/** Slug mappings for brands */
export const BRAND_SLUGS: Record<string, string> = {
  "CP Plus": "cp-plus",
  "ESSL": "essl",
  "eSSL": "essl",
} as const;

/** Reverse slug → brand name */
export const SLUG_TO_BRAND: Record<string, string> = {
  "cp-plus": "CP Plus",
  "essl": "eSSL",
} as const;

/** Slug mappings for categories */
export const CATEGORY_SLUGS: Record<string, string> = {
  "Dome Cameras": "dome-cameras",
  "Bullet Cameras": "bullet-cameras",
  "Color Dome Cameras": "color-dome-cameras",
  "Color Bullet Cameras": "color-bullet-cameras",
  "NVR Systems": "nvr-systems",
  "Biometric Devices": "biometric-devices",
} as const;

export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([k, v]) => [v, k])
);
