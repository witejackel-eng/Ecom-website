"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { ShoppingCart, Zap, Shield, CheckCircle2, ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || product?.image || "");

  if (!product) return <div className="text-white p-40 text-center">Architecting product data...</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pt-32 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Link */}
        <FadeIn direction="none" delay={0.1}>
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-primary transition-colors uppercase tracking-[0.2em] mb-12 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Collections
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <ScaleIn duration={1}>
              <div className="relative aspect-square rounded-[3rem] glass border-white/10 overflow-hidden bg-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-contain p-12 lg:p-20"
                  />
                </AnimatePresence>
                
                {/* Floating Badge */}
                <div className="absolute top-10 left-10">
                  <span className="glass px-6 py-2 rounded-full border-white/10 text-[10px] font-bold text-primary uppercase tracking-[0.3em] backdrop-blur-2xl">
                    Premium Hardware
                  </span>
                </div>
              </div>
            </ScaleIn>

            <StaggerContainer className="grid grid-cols-4 gap-6">
              {product.images.map((img, i) => (
                <StaggerItem key={i}>
                  <button 
                    onClick={() => setMainImage(img)} 
                    className={`relative aspect-square rounded-3xl overflow-hidden border transition-all duration-500 ${
                      mainImage === img ? "border-primary glass scale-95" : "border-white/5 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover p-2" />
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: Info Panel (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
            <FadeIn direction="up">
              <div className="space-y-4">
                <SectionLabel>{product.brand}</SectionLabel>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mb-4 font-black tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                  Module Architecture: {product.model}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-white/30 line-through text-sm">
                    M.R.P: ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-12 w-[1px] bg-white/10" />
                <div className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
                  Tax Included
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="glass rounded-[2rem] p-8 border-white/10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {product.highlights.map(h => (
                    <div key={h} className="flex items-center gap-3 text-[11px] font-bold text-white/60 uppercase tracking-wider">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {h}
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-8 py-5 rounded-2xl glass border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <ShoppingCart size={18} /> Add to System
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-8 py-5 rounded-2xl bg-premium-gradient text-white font-bold text-sm flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
                  >
                    <Zap size={18} /> Deploy Now
                  </motion.button>
                </div>
              </div>
            </FadeIn>

            {/* Support/Downloads */}
            <FadeIn direction="up" delay={0.4} className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] hover:text-white transition-all">
                <Download size={14} /> Datasheet
              </button>
              <button className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] hover:text-white transition-all">
                <FileText size={14} /> User Manual
              </button>
            </FadeIn>
          </div>
        </div>

        {/* Section 2: Specs Architecture */}
        <section className="mt-40">
          <FadeIn direction="up">
            <div className="mb-16">
              <SectionLabel>Architecture</SectionLabel>
              <h2 className="text-white">Technical <span className="text-gradient">Specifications</span></h2>
            </div>
          </FadeIn>
          
          <div className="glass rounded-[3rem] border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className="p-10 border-b border-r border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 group-hover:translate-x-1 transition-transform">{key}</div>
                  <div className="text-white/80 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-40">
          <FadeIn direction="up">
            <div className="flex items-end justify-between mb-16">
              <div>
                <SectionLabel>Ecosystem</SectionLabel>
                <h2 className="text-white">Related <span className="text-gradient">Technologies</span></h2>
              </div>
              <Link href="/products" className="group flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-[0.2em] glass border-white/10 px-8 py-4 rounded-full hover:bg-white/5 transition-all duration-300">
                All Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </FadeIn>
          
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

function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
