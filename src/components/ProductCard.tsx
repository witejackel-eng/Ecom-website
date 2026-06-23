"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleIn } from "@/components/ui/FadeIn";
import { ShoppingCart, ArrowUpRight, FileText, Eye, Star, Camera } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  shortDescription: string;
  images: string[];
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const [imageError, setImageError] = useState(false);
  
  return (
    <ScaleIn duration={0.6}>
      <div className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 border-tangerine border-tangerine-hover glow-tangerine glow-tangerine-hover hover:-translate-y-2 h-full flex flex-col">
        <Link href={`/products/${product.id}`} className="block flex flex-col h-full">
          {/* Fixed height image container */}
          <div className="relative h-[260px] overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              {!imageError && product.images && product.images.length > 0 ? (
                <Image 
                  src={encodeURI(product.images[0])} 
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-all duration-700 group-hover:brightness-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-2">
                  <Camera size={48} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Image Coming Soon</span>
                </div>
              )}
            </motion.div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-navy/50 border border-[rgba(255,138,0,0.3)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-tangerine)] backdrop-blur-md">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="space-y-1 mb-4 flex-grow">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                {product.brand} &middot; {product.model}
              </p>
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[var(--color-tangerine)] transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                {product.name}
              </h3>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < product.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[rgba(245,158,11,0.25)] text-[rgba(245,158,11,0.25)]"} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto mb-6">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-gray-500 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] flex items-center justify-center text-white shadow-lg shadow-tangerine/20 border border-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, 1);
                  openCart();
                }}
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>

            {/* Additional Actions */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[rgba(255,138,0,0.1)]">
              <button className="flex flex-col items-center gap-1 text-[9px] text-gray-400 hover:text-[var(--color-tangerine)] transition-colors">
                <Eye size={14} /> View
              </button>
              <button className="flex flex-col items-center gap-1 text-[9px] text-gray-400 hover:text-[var(--color-tangerine)] transition-colors">
                <FileText size={14} /> Data
              </button>
              <button className="flex flex-col items-center gap-1 text-[9px] text-gray-400 hover:text-[var(--color-tangerine)] transition-colors">
                <ArrowUpRight size={14} /> Details
              </button>
            </div>
          </div>
        </Link>
      </div>
    </ScaleIn>
  );
}
