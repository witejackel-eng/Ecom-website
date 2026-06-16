"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import ProductPlaceholder from "./ProductPlaceholder";

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
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <FadeIn direction="up">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#F28C38]/30 transition-all duration-300 ease-out"
      >
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAFA]">
            <ProductPlaceholder />
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F28C38] backdrop-blur-sm border border-[#F28C38]">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-2">
            <h3 className="font-heading text-xl text-[#1A1A1A] leading-tight group-hover:text-[#F28C38] transition-colors duration-300">
              {product.name}
            </h3>
            
            <p className="text-xs font-medium text-[#666666] uppercase tracking-wider">
              Model: {product.model}
            </p>
            
            {/* Rating */}
            <div className="flex text-[#F28C38] text-sm">★★★★☆</div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-xl font-bold text-[#1A1A1A]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-[#888] line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </Link>
        
        {/* Add to Cart Button */}
        <div className="px-6 pb-6">
          <motion.button 
            whileHover={{ filter: "brightness(0.9)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#F28C38] text-white font-bold rounded-lg transition-all duration-200 shadow-md shadow-[#F28C38]/20"
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </FadeIn>
  );
}
