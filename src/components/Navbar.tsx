"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-heading text-xl font-bold transition-transform group-hover:scale-105">
              K
            </div>
            <span className="font-heading text-2xl text-foreground tracking-tight">
              Konnekt Edge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/products?category=Dome Cameras" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Dome Cameras
            </Link>
            <Link href="/products?category=Bullet Cameras" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Bullet Cameras
            </Link>
            <Link href="/products?category=Network Video Recorders" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              NVR Systems
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors group">
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-in zoom-in duration-200">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 px-4 py-6">
            <Link
              href="/products"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-surface-hover rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/products?category=Dome Cameras"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-surface-hover rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dome Cameras
            </Link>
            <Link
              href="/products?category=Bullet Cameras"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-surface-hover rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bullet Cameras
            </Link>
            <Link
              href="/products?category=Network Video Recorders"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-surface-hover rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NVR Systems
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
              <Link
                href="/cart"
                className="flex items-center justify-between px-3 py-2 text-base font-medium text-foreground hover:bg-surface-hover rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  View Cart
                </span>
                {totalItems > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
