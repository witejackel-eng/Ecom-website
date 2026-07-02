/**
 * SEO type definitions for DeviceDestination
 */

export interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  price: number;
  mrp: number;
  brand: string;
  badge: string | null;
  rating: number;
  shortDescription: string;
  images: string[];
  datasheet: string | null;
  manual: string | null;
  specs: Record<string, string | null | undefined>;
  highlights: string[];
  useCases: string[];
  inStock: boolean;
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export interface ImageObject {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}
