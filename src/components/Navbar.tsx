"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav 
        className={`relative flex h-20 items-center justify-between px-6 sm:px-10 rounded-[2rem] transition-all duration-500 glass-navbar ${
          isScrolled ? "scale-[0.98] shadow-2xl" : "scale-100"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-premium-gradient text-white font-heading text-lg font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            DD
          </div>
          <span className="font-heading text-2xl text-white font-extrabold tracking-tighter">DeviceDestination</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-[13px] font-bold text-white/70 hover:text-white transition-colors duration-300 uppercase tracking-widest group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6 text-white">
          <div className="hidden sm:flex items-center gap-6">
            <button className="p-2 hover:bg-white/5 rounded-full transition-all duration-300">
              <Search className="h-5 w-5 cursor-pointer text-white/70 hover:text-white" />
            </button>
            
            <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-all duration-300">
              <ShoppingCart className="h-5 w-5 text-white/70 hover:text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <Link href="/contact" className="px-8 py-3 rounded-full bg-premium-gradient text-white text-sm font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 border border-white/10">
              Contact Sales
            </Link>
          </motion.div>

          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden glass-navbar rounded-[2rem] mt-4 overflow-hidden shadow-2xl p-8"
          >
            <div className="flex flex-col gap-6">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-extrabold text-white/90 hover:text-white tracking-tighter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="mt-4 px-8 py-4 rounded-2xl bg-premium-gradient text-white text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
