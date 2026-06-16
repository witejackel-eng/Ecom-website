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
    <header className="fixed top-0 left-0 z-50 w-full h-20 glass-navbar transition-all duration-300">
      <nav className="mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-8">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-heading text-lg font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            DD
          </div>
          <span className="font-heading text-2xl text-white font-extrabold tracking-tighter hidden sm:block">DeviceDestination</span>
        </Link>

        {/* Navigation Center */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-[13px] font-bold text-white/70 hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Icons Right */}
        <div className="flex items-center gap-4 sm:gap-6 text-white">
          <div className="hidden sm:flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-white/5 rounded-full transition-all duration-300">
              <Search className="h-5 w-5 cursor-pointer text-white/70 hover:text-white" />
            </button>
            
            <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-all duration-300">
              <ShoppingCart className="h-5 w-5 text-white/70 hover:text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <Link href="/contact" className="px-8 py-3 rounded-full bg-primary text-white text-[13px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 border border-white/10">
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

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#031E2A]/98 backdrop-blur-md p-6 lg:p-20"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <Search className="text-primary h-8 w-8" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent border-b border-white/20 text-4xl text-white placeholder:text-white/20 py-4 focus:outline-none focus:border-primary transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white"><X size={32} /></button>
              </div>
              
              <div className="space-y-4">
                {searchQuery.length >= 2 && filteredProducts.map(product => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex justify-between items-center glass p-6 rounded-2xl hover:border-primary transition-all group"
                  >
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-primary">{product.name}</h4>
                      <p className="text-[10px] uppercase text-white/40">{product.category}</p>
                    </div>
                    <span className="text-lg font-black text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                  </Link>
                ))}
                {searchQuery.length >= 2 && filteredProducts.length === 0 && (
                  <p className="text-white/30 text-center py-20">No products found for '{searchQuery}'</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center gap-8 p-8"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-4xl font-black text-white/90 hover:text-primary tracking-tighter transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="mt-8 px-12 py-5 rounded-full bg-primary text-white text-center font-black uppercase tracking-widest shadow-2xl shadow-primary/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Sales
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
