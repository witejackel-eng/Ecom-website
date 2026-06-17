"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScaleIn } from "@/components/ui/FadeIn";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
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
      <div className="group relative glass rounded-[24px] overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(255,122,26,0.1)]">
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
              <span className="inline-flex items-center rounded-full bg-background/50 border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                {product.category}
              </span>
            </div>

            {/* Quick View Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <div className="h-10 w-10 rounded-full glass border-white/10 flex items-center justify-center text-white">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                {product.brand} &middot; {product.model}
              </p>
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-white/30 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 border border-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, 1);
                  openCart();
                }}
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>
          </div>
        </Link>
      </div>
    </ScaleIn>
  );
}
