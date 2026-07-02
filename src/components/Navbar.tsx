"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AccountDropdown from "@/components/AccountDropdown";
import MobileAccountSheet from "@/components/MobileAccountSheet";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileAccount, setShowMobileAccount] = useState(false);
  const { cartCount, openCart } = useCart();
  const { state } = useAuth();
  const { isAuthenticated, isLoading } = state;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 200ms ease, backdrop-filter 200ms ease, padding 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        background: scrolled
          ? "rgba(8, 28, 36, 0.88)"
          : "rgba(8, 28, 36, 0.60)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0,0,0,0.35)"
          : "0 4px 24px rgba(0,0,0,0.15)",
        paddingTop: scrolled ? "10px" : "16px",
        paddingBottom: scrolled ? "10px" : "16px",
      }}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-4 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-tangerine)] text-white font-bold text-base shadow-lg shadow-tangerine/20 group-hover:scale-105 group-hover:shadow-tangerine/30 transition-all duration-200">
            DD
          </div>
          <span className="text-xl text-white font-bold tracking-tight hidden sm:block">
            DeviceDestination
          </span>
        </Link>

        {/* CENTER: Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-[1px] ${
                  active
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-[var(--color-tangerine)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          {/* Account Section */}
          {!isLoading &&
            (isAuthenticated ? (
              <>
                <div className="hidden lg:block">
                  <AccountDropdown />
                </div>
                <button
                  onClick={() => setShowMobileAccount(true)}
                  className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-300 hover:text-[var(--color-tangerine)] hover:border-[rgba(255,138,0,0.3)] transition-all duration-200"
                  aria-label="Account menu"
                >
                  <User className="h-[18px] w-[18px]" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden lg:inline-flex text-[12px] font-bold uppercase tracking-[0.12em] text-gray-400 hover:text-gray-200 transition-all duration-200 hover:-translate-y-[1px]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden lg:inline-flex px-4 py-[7px] rounded-full border border-white/10 text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] transition-all duration-200"
                >
                  Create Account
                </Link>
              </>
            ))}

          {/* Cart */}
          <button
            onClick={() => openCart()}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-gray-300 hover:text-[var(--color-tangerine)] hover:border-[rgba(255,138,0,0.2)] hover:bg-white/[0.03] transition-all duration-200 active:scale-95"
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-[3px] -right-[3px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[var(--color-tangerine)] text-[9px] font-bold text-white px-[4px] shadow-sm shadow-tangerine/30">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Get a Quote CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-[7px] rounded-full bg-[var(--color-tangerine)] text-white text-[12px] font-bold uppercase tracking-[0.12em] shadow-lg shadow-tangerine/20 hover:shadow-xl hover:shadow-tangerine/30 hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] transition-all duration-200"
          >
            Get a Quote
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-300 hover:text-[var(--color-tangerine)] hover:border-[rgba(255,138,0,0.3)] transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Account Sheet */}
      <MobileAccountSheet
        isOpen={showMobileAccount}
        onClose={() => setShowMobileAccount(false)}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1 bg-[#0D2530]/95 backdrop-blur-xl">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all duration-200 ${
                      active
                        ? "text-white bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.2)]"
                        : "text-gray-300 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <hr className="border-white/5 my-4" />
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full bg-[var(--color-tangerine)] text-white text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-tangerine/20 hover:shadow-tangerine/30 transition-all duration-200"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
