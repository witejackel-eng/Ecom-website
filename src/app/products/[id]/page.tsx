"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  if (!product) return <div className="text-white p-20">Product not found.</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] pt-32 pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 1: Product Hero */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-[#2A2A2A]">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)} className="relative aspect-square rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#F28C38]">
                  <Image src={img} alt="thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-medium text-[#F28C38] border border-[#F28C38] rounded-full">
              {product.category}
            </span>
            <h1 className="font-heading text-5xl">{product.name}</h1>
            <p className="text-sm text-gray-500">Model: {product.model}</p>
            <div className="text-xl">★★★★½ <span className="text-sm text-gray-500">(128 reviews)</span></div>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[#F28C38]">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="text-green-500 text-sm">You save ₹{product.mrp - product.price} ({(100 - (product.price / product.mrp) * 100).toFixed(0)}% off)</span>
            </div>
            
            <div className="border-t border-[#C9A84C] pt-6 grid grid-cols-3 gap-4">
              {product.highlights.map(h => (
                <div key={h} className="text-xs text-[#F5F0E8]">{h}</div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <button className="px-8 py-3 border border-[#F28C38] text-[#F28C38] font-bold rounded-lg hover:bg-[#F28C38]/10">Add to Cart</button>
              <button className="px-8 py-3 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Section 2: Specs */}
        <section className="mb-20">
          <h2 className="font-heading text-3xl mb-8">Technical Specifications</h2>
          <div className="border border-[#2A2A2A] rounded-lg overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div key={key} className={`grid grid-cols-2 p-4 ${i % 2 === 0 ? 'bg-[#111]' : 'bg-[#0A0A0A]'}`}>
                <div className="text-[#C9A84C] font-bold">{key}</div>
                <div className="text-[#F5F0E8]">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Related */}
        <section>
          <h2 className="font-heading text-3xl mb-8">You May Also Like</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p as any} />)}
          </div>
        </section>
      </div>
    </motion.main>
  );
}
