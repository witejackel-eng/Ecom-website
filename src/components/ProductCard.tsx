"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn, { ScaleIn } from "@/components/ui/FadeIn";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
  return (
    <ScaleIn duration={0.8}>
      <div className="group relative glass rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-white/20 shadow-2xl hover:shadow-primary/10">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[1/1] overflow-hidden bg-white/5">
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
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-dark/20">
                  <span className="text-white/20 font-bold uppercase tracking-widest text-[10px]">No Image</span>
                </div>
              )}
            </motion.div>

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center rounded-full glass border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                {product.category}
              </span>
            </div>

            {/* Quick View Icon */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <div className="h-10 w-10 rounded-full glass border-white/10 flex items-center justify-center text-white">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                {product.brand} • {product.model}
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[12px] text-white/30 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-2xl bg-premium-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20 border border-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic here if needed
                }}
              >
                <ShoppingCart size={20} />
              </motion.button>
            </div>
          </div>
        </Link>
      </div>
    </ScaleIn>
  );
}
