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
        whileHover={{ y: -5 }}
        className="group relative bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden transition-colors duration-300 hover:border-[#F28C38]"
      >
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ProductPlaceholder />
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full bg-[#0A0A0A]/80 px-3 py-1 text-xs font-medium text-[#C9A84C] backdrop-blur-sm border border-[#C9A84C]">
                {product.category}
              </span>
            </div>
          </div>
...
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-[#F5F0E8] leading-tight group-hover:text-[#F28C38] transition-colors duration-300">
                {product.name}
              </h3>
            </div>
            
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Model: {product.model}
            </p>
            
            {/* Rating - Hardcoded */}
            <div className="flex text-[#F28C38] text-sm">★★★★☆</div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-xl font-semibold text-[#F28C38]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </Link>
        
        {/* Add to Cart Button */}
        <motion.div 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          className="absolute bottom-0 left-0 w-full p-4 bg-[#1A1A1A] border-t border-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button className="w-full py-2 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#C96E1A] transition-colors">
            Add to Cart
          </button>
        </motion.div>
      </motion.div>
    </FadeIn>
  );
}
