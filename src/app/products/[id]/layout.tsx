import type { Metadata } from "next";
import { products } from "@/data/products";
import { getProductMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };
  
  return getProductMetadata(product);
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
