"use client";

import { useState, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleIn } from "@/components/ui/FadeIn";
import { ShoppingCart, Camera, Check } from "lucide-react";
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

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  
  const handleAddToCart = useCallback(() => {
    setAdded(true);
    addToCart(product, 1);
    openCart();
    setTimeout(() => setAdded(false), 1200);
  }, [addToCart, openCart, product]);

  return (
    <ScaleIn duration={0.6}>
      <div className="group relative glass rounded-3xl overflow-hidden transition-all duration-300 ease-in-out border-[rgb(var(--tangerine-rgb)_/_0.18)] hover:border-[rgb(var(--tangerine-rgb)_/_0.55)] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 h-full flex flex-col">
        <Link href={"/products/" + product.id} className="block flex flex-col h-full">
          {/* Fixed-dimension image container to prevent layout shift */}
          <div className="relative aspect-square sm:h-[300px] sm:aspect-auto overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
              <span className="inline-flex items-center rounded-full bg-navy/50 border border-[rgb(var(--tangerine-rgb)_/_0.3)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-tangerine)] backdrop-blur-md">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow gap-3">
            <div className="space-y-2 flex-grow">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                {product.brand} &middot; <span className="text-[var(--color-tangerine)] text-[11px]">{product.model}</span>
              </p>
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[var(--color-tangerine)] transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black text-white tracking-tight">
                  {'\u20B9'}{product.mrp.toLocaleString('en-IN')}
                </span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="h-12 w-12 min-w-[48px] rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] flex items-center justify-center text-white shadow-lg shadow-[var(--color-tangerine)]/25 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/35 border border-white/10 transition-shadow duration-300"
                onClick={handleAddToCart}
              >
                {added ? <Check size={18} className="text-white" /> : <ShoppingCart size={18} />}
              </motion.button>
            </div>
          </div>
        </Link>
      </div>
    </ScaleIn>
  );
});

export default ProductCard;
