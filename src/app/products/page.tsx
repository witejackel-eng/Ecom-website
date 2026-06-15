"use client";

import { useState, useMemo, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import FilterSidebar from "@/components/FilterSidebar";
import FadeIn from "@/components/ui/FadeIn";

function ProductsList({ categories, priceRange }: { categories: string[], priceRange: [number, number] }) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [categories, priceRange]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product as any} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-white">
      <FilterSidebar onFilterChange={(cats, price) => {
        setCategories(cats);
        setPriceRange(price);
      }} />
      <div className="flex-1 py-16 px-4 md:px-8">
        <div className="mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
            Products
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            Browse our complete catalog of professional security, surveillance, and biometric systems.
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center py-12 text-[#666666]">Loading products...</div>}>
          <ProductsList categories={categories} priceRange={priceRange} />
        </Suspense>
      </div>
    </main>
  );
}
