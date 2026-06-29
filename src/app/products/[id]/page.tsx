"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import FadeIn, { ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { ShoppingCart, Star, Shield, Truck, RefreshCw, Heart, Share2, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!product) return <div className="text-white p-40 text-center font-black tracking-tighter text-4xl opacity-10">ARCHITECTING ASSET...</div>;


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
            <ScaleIn duration={0.8} className="glass rounded-[24px] border-white/10 p-4 aspect-square flex items-center justify-center bg-white">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </motion.div>
            </ScaleIn>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setMainImage(img)} 
                    className={`relative aspect-square rounded-2xl overflow-hidden border transition-all ${
                      mainImage === img ? "border-primary glass" : "border-white/5 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <FadeIn direction="up">
              <h1 className="text-white text-5xl font-black tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{product.model}</p>
              <div className="flex text-[#F59E0B]">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < product.rating ? "text-[#F59E0B]" : "text-white/10"}>&#9733;</span>)}</div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <span className="text-4xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-white/50 line-through text-lg font-semibold ml-3">₹{product.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-[var(--color-tangerine)] text-sm font-bold ml-2">Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}%)</span>
                </>
              )}
              <p className="text-white/60 text-xs font-medium mt-2">✔ Price Includes GST · Taxes Included</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="text-white/70 leading-relaxed font-medium">
              {product.shortDescription}
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap gap-4">
              <button 
                onClick={() => addToCart(product, 1)}
                className="btn-primary flex items-center justify-center gap-3"
              >
                <ShoppingCart size={18}/>Add to Cart
              </button>
              <button 
                onClick={() => {
                  addToCart(product, 1);
                  router.push('/checkout');
                }}
                className="px-8 py-4 rounded-full glass border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all"
              >
                Buy Now
              </button>
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

      </div>
    </main>
  );
}
