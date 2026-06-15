"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FileText, BookOpen, ShieldCheck, ArrowLeft, ShoppingCart, Zap, Check } from "lucide-react";
import { useState, use } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
      router.push("/cart");
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <main className="flex-1 py-12 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <FadeIn direction="up">
          <nav className="mb-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </nav>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <FadeIn direction="right" className="space-y-4">
            <div className="relative aspect-square rounded-2xl bg-surface-hover overflow-hidden border border-border group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xl bg-surface-hover overflow-hidden border border-border group">
                <Image
                  src={product.images[0]}
                  alt={`${product.name} detail 1`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative aspect-square rounded-xl bg-surface-hover overflow-hidden border border-border group">
                <Image
                  src={product.images[1] || product.images[0]}
                  alt={`${product.name} detail 2`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn direction="left" className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500">Brand: {product.brand}</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                Model: {product.model}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            <div className="flex items-baseline gap-4 pt-6 border-t border-border">
              <span className="text-3xl font-semibold text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isAdding ? (
                  <>
                    <Check className="h-5 w-5 animate-in zoom-in duration-200" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                    Add to Cart
                  </>
                )}
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-8 py-4 text-sm font-medium text-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <Zap className="h-5 w-5 transition-transform group-hover:scale-110" />
                Buy Now
              </button>
            </div>

            {/* Key Features */}
            <div className="pt-8 border-t border-border">
              <h2 className="font-heading text-2xl text-foreground mb-4">Key Features</h2>
              <StaggerContainer className="space-y-3">
                {product.features.map((feature, index) => (
                  <StaggerItem key={index} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Specifications */}
            <div className="pt-8 border-t border-border">
              <h2 className="font-heading text-2xl text-foreground mb-4">Specifications</h2>
              <dl className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 px-4 py-3 sm:grid-cols-4 bg-surface hover:bg-surface-hover transition-colors">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-sm text-foreground sm:col-span-3 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Downloads */}
            <div className="pt-8 border-t border-border">
              <h2 className="font-heading text-2xl text-foreground mb-4">Downloads</h2>
              <StaggerContainer className="space-y-3">
                <a href={product.downloads.datasheet} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Product Datasheet</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </a>
                <a href={product.downloads.userManual} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">User Manual</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </a>
                <a href={product.downloads.warranty} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <ShieldCheck className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Warranty Information</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </a>
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <FadeIn direction="up">
              <h2 className="font-heading text-3xl text-foreground mb-8">Related Products</h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </main>
  );
}
