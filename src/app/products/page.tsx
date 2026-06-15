import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import FilterSidebar from "@/components/FilterSidebar";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function ProductsList({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  
  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  return (
    <main className="flex min-h-screen bg-[#0A0A0A]">
      <FilterSidebar />
      <div className="flex-1 py-16 px-8">
        <div className="mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl text-[#F5F0E8] mb-4">
            {category ? `${category}` : "All Products"}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {category 
              ? `Browse our selection of professional ${category.toLowerCase()} for reliable surveillance.`
              : "Browse our complete catalog of professional security and surveillance equipment."}
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading products...</div>}>
          <ProductsList searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </main>
  );
}
