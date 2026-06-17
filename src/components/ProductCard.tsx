"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScaleIn } from "@/components/ui/FadeIn";
import { ShoppingCart, ArrowUpRight, FileText, Eye } from "lucide-react";
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
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  
  return (
    <ScaleIn duration={0.6}>
      <div className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 border-tangerine border-tangerine-hover glow-tangerine glow-tangerine-hover hover:-translate-y-2">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-white/5">
            {/* Image Hover Zoom */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                  <span className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Security Asset</span>
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

          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                {product.brand} &middot; {product.model}
              </p>
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[var(--color-tangerine)] transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2">
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
