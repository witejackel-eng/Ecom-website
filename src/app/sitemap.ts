import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE, CATEGORY_SLUGS, BRAND_SLUGS, CATEGORY_INFO } from "@/lib/seo/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const today = new Date().toISOString().split("T")[0];

  /* ─── Static pages ─────────────────────────────────────────────────── */

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: today, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/support`, lastModified: today, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/downloads`, lastModified: today, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: today, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/refund-policy`, lastModified: today, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/login`, lastModified: today, changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/signup`, lastModified: today, changeFrequency: "yearly", priority: 0.1 },
  ];

  /* ─── Product pages ────────────────────────────────────────────────── */

  const productPages: MetadataRoute.Sitemap = products.map((product) => {
    const brandSlug = BRAND_SLUGS[product.brand] || product.brand.toLowerCase().replace(/\s+/g, "-");
    const categorySlug = CATEGORY_SLUGS[product.category] || product.category.toLowerCase().replace(/\s+/g, "-");
    return {
      url: `${baseUrl}/products/${brandSlug}/${categorySlug}/${product.id}`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  /* ─── Category pages ───────────────────────────────────────────────── */

  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORY_SLUGS).map((category) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(category)}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* ─── Brand pages ──────────────────────────────────────────────────── */

  const brandPages: MetadataRoute.Sitemap = Object.keys(BRAND_SLUGS).map((brand) => ({
    url: `${baseUrl}/products?brand=${encodeURIComponent(brand)}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...brandPages];
}
