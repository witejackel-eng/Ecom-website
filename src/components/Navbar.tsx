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
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F28C38] text-white font-heading text-lg font-bold">
              DD
            </div>
            <span className="font-heading text-2xl text-[#F5F0E8]">DeviceDestination</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Products", "Dome Cameras", "Bullet Cameras", "NVR Systems", "Biometric"].map((item) => (
              <Link
                key={item}
                href={item === "Products" ? "/products" : item === "Biometric" ? "/products?category=Biometric%20Machines" : `/products?category=${encodeURIComponent(item)}`}
                className="text-sm font-bold text-[#F5F0E8] hover:text-[#F28C38] transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-[#F28C38] pb-1"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 text-[#F5F0E8]">
            <div className="relative flex items-center">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:text-[#F28C38]">
                <Search className="h-5 w-5" />
              </button>
            </div>
            
            <Link href="/cart" className="relative p-2 hover:text-[#F28C38]">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F28C38] text-[10px] font-bold text-[#0A0A0A]">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 hover:text-[#F28C38]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#2A2A2A] overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {["Products", "Dome Cameras", "Bullet Cameras", "NVR Systems"].map((item) => (
                <Link
                  key={item}
                  href={item === "Products" ? "/products" : `/products?category=${encodeURIComponent(item)}`}
                  className="text-lg font-bold text-[#F5F0E8] hover:text-[#F28C38] uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function clsx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
