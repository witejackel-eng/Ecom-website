"use client";

import { useState, useMemo, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import FilterSidebar from "@/components/FilterSidebar";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";

function ProductsList({ categories, priceRange }: { categories: string[], priceRange: [number, number] }) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [categories, priceRange]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-40">
        <div className="h-20 w-20 rounded-full glass flex items-center justify-center mx-auto mb-8 text-white/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-xs">No matching architectures found</p>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product as any} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  return (
    <main className="flex flex-col md:flex-row min-h-screen pt-40 pb-32">
      <FilterSidebar onFilterChange={(cats, price) => {
        setCategories(cats);
        setPriceRange(price);
      }} />
      <div className="flex-1 px-6 md:px-12 lg:px-20">
        <FadeIn direction="up" className="mb-20">
          <SectionLabel>Collections</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-8">
            The <span className="text-gradient">Ecosystem</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl leading-relaxed font-medium">
            Browse our complete catalog of professional security, surveillance, and biometric systems.
          </p>
        </FadeIn>
        
        <Suspense fallback={
          <div className="text-center py-40">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-8 text-white/20 font-bold uppercase tracking-[0.2em] text-xs">Architecting view...</p>
          </div>
        }>
          <ProductsList categories={categories} priceRange={priceRange} />
        </Suspense>
      </div>
    </main>
  );
}
