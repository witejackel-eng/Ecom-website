"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { ShoppingCart, Zap, Shield, CheckCircle2, ArrowLeft, Download, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  if (!product) return <div className="text-white p-40 text-center font-black tracking-tighter text-4xl opacity-10">ARCHITECTING ASSET...</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Link */}
        <FadeIn direction="none" delay={0.1}>
          <Link href="/products" className="inline-flex items-center gap-3 text-[10px] font-bold text-white/30 hover:text-primary transition-all uppercase tracking-[0.3em] mb-12 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Collections
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-10">
            <ScaleIn duration={0.8}>
              <div className="relative aspect-square rounded-[3rem] glass border-white/10 overflow-hidden bg-white/5 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-contain p-12 lg:p-20 group-hover:scale-110 transition-transform duration-1000"
                  />
                </AnimatePresence>
                
                {/* Floating Badge */}
                <div className="absolute top-10 left-10">
                  <span className="glass px-6 py-2 rounded-full border-white/10 text-[10px] font-bold text-primary uppercase tracking-[0.3em] backdrop-blur-2xl">
                    High-End Hardware
                  </span>
                </div>
              </div>
            </ScaleIn>

            <StaggerContainer className="grid grid-cols-4 gap-6">
              {product.images.map((img, i) => (
                <StaggerItem key={i}>
                  <button 
                    onClick={() => setMainImage(img)} 
                    className={`relative aspect-square rounded-[2rem] overflow-hidden border transition-all duration-500 ${
                      mainImage === img ? "border-primary glass scale-95" : "border-white/5 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover p-3" />
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
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Module Architecture: {product.model}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-white/20 line-through text-xs font-bold mt-1">
                    M.R.P: ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-12 w-[1px] bg-white/10" />
                <div className="text-primary font-black text-[10px] uppercase tracking-[0.3em] leading-relaxed">
                  Enterprise Tier<br/>Tax Protocols Inc.
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="glass rounded-[3rem] p-10 border-white/10 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  {product.highlights.slice(0, 4).map(h => (
                    <div key={h} className="flex items-center gap-4 text-[11px] font-bold text-white/50 uppercase tracking-widest">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {h}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 flex flex-col gap-4 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em]"
                  >
                    <Zap size={18} /> Deploy System
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-5 rounded-full glass border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <ShoppingCart size={18} /> Add to System
                  </motion.button>
                </div>
              </div>
            </FadeIn>

            {/* Support/Downloads */}
            <FadeIn direction="up" delay={0.4} className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-all">
                <Download size={14} /> Architecture Datasheet
              </button>
              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-all">
                <FileText size={14} /> Operational Manual
              </button>
            </FadeIn>
          </div>
        </div>

        {/* Section 2: Specs Architecture */}
        <section className="mt-48">
          <FadeIn direction="up">
            <div className="mb-20">
              <SectionLabel>Architecture</SectionLabel>
              <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter">Technical <span className="text-gradient">Specifications</span></h2>
            </div>
          </FadeIn>
          
          <div className="glass rounded-[4rem] border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className="p-12 border-b border-r border-white/5 hover:bg-white/[0.02] transition-all group">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 group-hover:translate-x-1 transition-transform">{key}</div>
                  <div className="text-white/70 font-medium text-lg leading-relaxed">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
      </div>
    </main>
  );
}
