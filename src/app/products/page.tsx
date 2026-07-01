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
      const matchesPrice = product.mrp >= priceRange[0] && product.mrp <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [categories, priceRange]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-40">
        <div className="h-24 w-24 rounded-full glass flex items-center justify-center mx-auto mb-10 text-white/5 border border-white/5">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <p className="text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">No Matching Architectures Found</p>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
    <main className="flex flex-col md:flex-row min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <FilterSidebar onFilterChange={(cats, price) => {
        setCategories(cats);
        setPriceRange(price);
      }} />
      <div className="flex-1 px-6 md:px-12 lg:px-20">
        <FadeIn direction="up" className="mb-24">
          <SectionLabel>Collections</SectionLabel>
          <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            The <span className="text-gradient">Ecosystem.</span>
          </h1>
          <p className="text-white/55 text-xl max-w-2xl leading-relaxed font-medium">
            Browse our complete catalogue of professional security, surveillance, and biometric systems engineered for uncompromising reliability.
          </p>
        </FadeIn>
        
        <Suspense fallback={
          <div className="text-center py-40">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-8 text-white/20 font-bold uppercase tracking-[0.3em] text-[10px]">Architecting View...</p>
          </div>
        }>
          <ProductsList categories={categories} priceRange={priceRange} />
        </Suspense>
      </div>
    </main>
  );
}
