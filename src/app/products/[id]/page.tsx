"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { ShoppingCart, Zap, Download, FileText, MessageSquare, Plus, Check } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || product?.image || "");

  if (!product) return <div className="text-white p-40 text-center font-black tracking-tighter text-4xl opacity-10">ARCHITECTING ASSET...</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <FadeIn direction="none" className="mb-8">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            Home / Products / {product.brand} / {product.category} / {product.model}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Left: Gallery */}
          <div className="space-y-8">
            <ScaleIn duration={0.8} className="glass rounded-[24px] border-white/10 p-4 aspect-square flex items-center justify-center bg-white/5">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </ScaleIn>
            <div className="grid grid-cols-4 gap-4">
              {[...product.images, ...Array(Math.max(0, 4 - product.images.length)).fill(product.images[0])].slice(0, 4).map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)} 
                  className={`relative aspect-square rounded-2xl overflow-hidden border transition-all ${
                    mainImage === img ? "border-primary glass" : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <FadeIn direction="up">
              <h1 className="text-white text-5xl font-black tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{product.model}</p>
              <div className="flex text-primary">★★★★☆</div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <span className="text-4xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="text-white/70 leading-relaxed font-medium">
              {product.shortDescription}
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center justify-center gap-3"><ShoppingCart size={18}/>Add to Cart</button>
              <button className="px-8 py-4 rounded-full glass border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">Buy Now</button>
              <a href={product.datasheet} className="px-8 py-4 rounded-full glass border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all"><Download size={16}/>Datasheet</a>
              <a href={product.manual} className="px-8 py-4 rounded-full glass border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all"><FileText size={16}/>User Manual</a>
            </FadeIn>
          </div>
        </div>

        {/* Highlights */}
        <section className="mb-24">
          <SectionLabel>Key Highlights</SectionLabel>
          <div className="grid md:grid-cols-3 gap-6">
            {product.highlights.map((h, i) => (
              <div key={i} className="glass p-8 rounded-[24px] border-white/5 flex items-center gap-4">
                <Check className="text-primary shrink-0" size={20} />
                <span className="text-white text-sm font-bold tracking-wide">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Overview */}
        <section className="mb-24">
          <SectionLabel>Product Overview</SectionLabel>
          <div className="glass p-12 rounded-[24px] border-white/5 text-white/70 leading-relaxed space-y-6">
            <p>{product.shortDescription}</p>
            <p>Designed for robust performance, this {product.brand} {product.category} provides top-tier security for {product.useCases.join(", ")}.</p>
            <p>With its advanced imaging technology and durable construction, this system ensures long-term operational reliability and superior coverage for your security requirements.</p>
          </div>
        </section>

        {/* Specs Table */}
        <section className="mb-24">
          <SectionLabel>Technical Specifications</SectionLabel>
          <div className="glass rounded-[24px] border-white/5 overflow-hidden">
            {Object.entries(product.specs).map(([key, val], i) => (
              <div key={key} className={`grid grid-cols-2 p-6 border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{key}</span>
                <span className="text-white text-sm font-medium">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <SectionLabel>You May Also Need</SectionLabel>
          <StaggerContainer className="grid md:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard product={p as any} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </div>
    </main>
  );
}
