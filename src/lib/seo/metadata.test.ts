import { describe, it, expect } from "vitest";
import { truncateDescription, getProductUrl } from "@/lib/seo/metadata";
import { SITE, BRAND_SLUGS, CATEGORY_SLUGS, SEO_LIMITS } from "@/lib/seo/constants";

describe("truncateDescription", () => {
  it("returns short text unchanged", () => {
    const text = "Short description.";
    expect(truncateDescription(text)).toBe(text);
  });

  it("truncates text exceeding default 158 chars", () => {
    const text = "A".repeat(200);
    const result = truncateDescription(text);
    expect(result.length).toBe(158);
    expect(result.endsWith("…")).toBe(true);
  });

  it("respects custom max length", () => {
    const text = "A".repeat(100);
    const result = truncateDescription(text, 50);
    expect(result.length).toBe(50);
    expect(result.endsWith("…")).toBe(true);
  });

  it("trims trailing whitespace before ellipsis", () => {
    const text = "Hello world   " + "B".repeat(160);
    const result = truncateDescription(text, 30);
    expect(result.endsWith("…")).toBe(true);
    expect(result.at(-2)).not.toBe(" ");
  });

  it("returns exact-length text unchanged", () => {
    const text = "A".repeat(158);
    expect(truncateDescription(text)).toBe(text);
  });
});

describe("getProductUrl", () => {
  it("builds URL with known brand and category slugs", () => {
    const product = {
      id: "cp-dome-001",
      brand: "CP Plus",
      category: "Dome Cameras",
      model: "CP-DOME-001",
      name: "Test Dome",
      mrp: 5000,
      shortDescription: "A test dome camera.",
      images: ["/test.jpg"],
    } as any;
    const url = getProductUrl(product);
    expect(url).toBe(`${SITE.url}/products/cp-plus/dome-cameras/cp-dome-001`);
  });

  it("falls back to slugified brand/category when not in map", () => {
    const product = {
      id: "test-001",
      brand: "Unknown Brand",
      category: "New Category",
      model: "TEST-001",
      name: "Test",
      mrp: 1000,
      shortDescription: "Test product.",
      images: [],
    } as any;
    const url = getProductUrl(product);
    expect(url).toContain("unknown-brand");
    expect(url).toContain("new-category");
    expect(url).toContain("test-001");
  });
});

describe("SEO constants", () => {
  it("SITE has required fields", () => {
    expect(SITE.name).toBeTruthy();
    expect(SITE.url).toBeTruthy();
    expect(SITE.url.startsWith("https://")).toBe(true);
    expect(SITE.address.city).toBeTruthy();
  });

  it("BRAND_SLUGS covers known brands", () => {
    expect(BRAND_SLUGS["CP Plus"]).toBe("cp-plus");
    expect(BRAND_SLUGS["eSSL"]).toBe("essl");
  });

  it("CATEGORY_SLUGS produces valid URL segments", () => {
    for (const [name, slug] of Object.entries(CATEGORY_SLUGS)) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("SEO_LIMITS has sensible bounds", () => {
    expect(SEO_LIMITS.titleMax).toBeGreaterThan(SEO_LIMITS.titleMin);
    expect(SEO_LIMITS.descriptionMax).toBeGreaterThan(SEO_LIMITS.descriptionMin);
  });
});