"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import FadeIn, { ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { ShoppingCart, Check, FileText } from "lucide-react";
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
  const [docs, setDocs] = useState<{ datasheet: boolean; manual: boolean }>({ datasheet: false, manual: false });
  const [addedCart, setAddedCart] = useState(false);

  if (!product) return;
  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await fetch(`/api/documents/${product.model}`);
        if (res.ok) {
          const data = await res.json();
          setDocs(data);
        }
      } catch {
        // leave default false values on failure
      }
    };
    loadDocs();
  }, [product?.model]);

  if (!product) return <div className="text-white p-40 text-center font-black tracking-tighter text-4xl opacity-10">ARCHITECTING ASSET...</div>;


  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <FadeIn direction="none" className="mb-8">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            Home / Products / {product.brand} / {product.category} / <span className="text-[var(--color-tangerine)]">{product.model}</span>
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
              <p className="text-[var(--color-tangerine)] text-sm font-bold uppercase tracking-[0.25em] mt-3">{product.model}</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <span className="text-4xl font-black text-white">₹{product.mrp.toLocaleString('en-IN')}</span>
              <p className="text-white/60 text-xs font-medium mt-3">✔ Price Includes GST · Taxes Included</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="text-white/70 leading-relaxed font-medium">
              {product.shortDescription}
            </FadeIn>

            {/* ── STQC Certification Badge (Camera categories only) ───── */}
            {product.category.toLowerCase().includes("camera") && (
              <FadeIn direction="up" delay={0.25}>
                <div className="glass rounded-2xl border border-[rgba(255,138,0,0.15)] bg-white/[0.02] p-5 space-y-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-tangerine)]/10 shrink-0">
                      <Check size={14} className="text-[var(--color-tangerine)]" />
                    </div>
                    <span className="text-white text-sm font-bold tracking-wide">
                      STQC Ready
                    </span>
                    <span className="text-white/20 hidden sm:inline">&bull;</span>
                    <span className="text-white/60 text-xs font-medium">
                      Suitable for Government &amp; Enterprise Projects
                    </span>
                  </div>
                  <p className="text-white/40 text-[11px] leading-relaxed pl-0 sm:pl-9">
                    This product is suitable for STQC-compliant surveillance deployments when installed as part of a compliant CCTV solution. Please verify project-specific STQC requirements before procurement.
                  </p>
                </div>
              </FadeIn>
            )}

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setAddedCart(true);
                  addToCart(product, 1);
                  setTimeout(() => setAddedCart(false), 1200);
                }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-bold text-sm shadow-lg shadow-[var(--color-tangerine)]/25 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/35 transition-shadow duration-300 flex items-center justify-center gap-3"
              >
                {addedCart ? <Check size={18} className="text-white" /> : <ShoppingCart size={18} />}{addedCart ? 'Added' : 'Add to Cart'}
              </motion.button>
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

            {/* ── Document Section ────────────────────────────────────── */}
            {(docs.datasheet || docs.manual) && (
              <FadeIn direction="up" delay={0.35} className="pt-6">
                {docs.datasheet && docs.manual ? (
                  /* ── CASE 1 — Both PDFs: two equal-width buttons ── */
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`/api/download/${product.model}/datasheet`}
                      aria-label={`Download ${product.model} Datasheet`}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] hover:bg-white/[0.06]"
                    >
                      <FileText size={16} className="text-[var(--color-tangerine)] shrink-0" />
                      Datasheet
                    </a>
                    <a
                      href={`/api/download/${product.model}/manual`}
                      aria-label={`Download ${product.model} User Manual`}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] hover:bg-white/[0.06]"
                    >
                      <FileText size={16} className="text-[var(--color-tangerine)] shrink-0" />
                      User Manual
                    </a>
                  </div>
                ) : (
                  /* ── CASE 2 — Only one PDF: centered, wider button (~55-70% width) ── */
                  <div className="flex justify-center">
                    {docs.datasheet && (
                      <a
                        href={`/api/download/${product.model}/datasheet`}
                        aria-label={`Download ${product.model} Datasheet`}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] hover:bg-white/[0.06] w-full sm:w-[360px] sm:max-w-[70%]"
                      >
                        <FileText size={16} className="text-[var(--color-tangerine)] shrink-0" />
                        Datasheet
                      </a>
                    )}
                    {docs.manual && (
                      <a
                        href={`/api/download/${product.model}/manual`}
                        aria-label={`Download ${product.model} User Manual`}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] hover:bg-white/[0.06] w-full sm:w-[360px] sm:max-w-[70%]"
                      >
                        <FileText size={16} className="text-[var(--color-tangerine)] shrink-0" />
                        User Manual
                      </a>
                    )}
                  </div>
                )}
              </FadeIn>
            )}
            {/* ── END Document Section ────────────────────────────────── */}
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
