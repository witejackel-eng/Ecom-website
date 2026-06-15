"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C9A84C]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl text-[#F5F0E8]">Konnekt Edge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Products", "Dome Cameras", "Bullet Cameras", "NVR Systems"].map((item) => (
              <Link
                key={item}
                href={item === "Products" ? "/products" : `/products?category=${encodeURIComponent(item)}`}
                className="text-sm font-bold text-[#F5F0E8] hover:text-[#F28C38] transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-[#F28C38] pb-1"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[#F5F0E8]">
            <div className="relative flex items-center">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:text-[#F28C38]">
                <Search className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    placeholder="Search..."
                    className="absolute right-full mr-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-1 text-sm text-[#F5F0E8] outline-none"
                  />
                )}
              </AnimatePresence>
            </div>
            
            <Link href="/cart" className="relative p-2 hover:text-[#F28C38]">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F28C38] text-[10px] font-bold text-[#0A0A0A]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function clsx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
