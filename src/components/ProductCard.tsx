"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

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
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-hover mb-4 border border-border">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm border border-border shadow-sm">
              {product.category}
            </span>
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        </div>
        
        <div className="space-y-2 px-1">
          <h3 className="font-heading text-lg text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Model: {product.model}
          </p>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
          
          <div className="flex items-baseline gap-3 pt-3 border-t border-border/50 mt-3">
            <span className="text-lg font-semibold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
