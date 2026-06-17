"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 z-50 w-full h-20 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-navy-deep)]/80 backdrop-blur-md border-b border-tangerine' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-tangerine)] text-white font-bold text-lg shadow-lg shadow-tangerine/20 group-hover:scale-110 transition-transform duration-300">
            DD
          </div>
          <span className="text-2xl text-white font-bold tracking-tighter">DeviceDestination</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-[13px] font-bold text-gray-300 hover:text-[var(--color-tangerine)] transition-colors uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => openCart()} className="relative p-2 text-gray-300 hover:text-[var(--color-tangerine)] transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-tangerine)] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <Link href="/contact" className="px-6 py-2 rounded-full bg-[var(--color-tangerine)] text-white text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all">
            Get a Quote
          </Link>
          <button className="lg:hidden p-2 text-gray-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
