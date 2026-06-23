"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 400ms ease, backdrop-filter 400ms ease, padding 400ms ease, box-shadow 400ms ease, border-color 400ms ease',
        background: scrolled ? 'rgba(10, 25, 38, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
      }}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8">
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
