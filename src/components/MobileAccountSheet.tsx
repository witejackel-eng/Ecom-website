"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Package,
  FileText,
  Heart,
  MapPin,
  Building2,
  Lock,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { label: "My Profile", href: "/account/profile", icon: User },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Quotations / RFQs", href: "/account/quotations", icon: FileText },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Business Details", href: "/account/business", icon: Building2 },
  { label: "Change Password", href: "/account/change-password", icon: Lock },
];

interface MobileAccountSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileAccountSheet({
  isOpen,
  onClose,
}: MobileAccountSheetProps) {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { user, isAuthenticated } = state;
  const sheetRef = useRef<HTMLDivElement>(null);

  // Escape key support
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "";

  const handleNavigation = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleLogout = () => {
    onClose();
    logout();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-[80] max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-[#0D2530] border-t border-[rgba(255,138,0,0.18)] shadow-2xl shadow-black/40"
          >
            {/* Swipe indicator */}
            <div className="sticky top-0 z-10 pt-2 pb-1 bg-[#0D2530] rounded-t-[2rem]">
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-2" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Close account menu"
            >
              <X size={18} />
            </button>

            <div className="px-6 pb-8">
              {/* Authenticated user section */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-4 pt-4 pb-6 border-b border-white/10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-tangerine)] text-white font-bold text-lg shadow-lg shadow-tangerine/20">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-bold text-base truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              ) : (
                /* Unauthenticated section */
                <div className="pt-4 pb-6 border-b border-white/10 space-y-3">
                  <p className="text-gray-400 text-sm font-medium">
                    Account access
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-bold text-sm shadow-lg shadow-[var(--color-tangerine)]/20 text-center transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30 hover:-translate-y-0.5"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={onClose}
                      className="w-full py-3.5 rounded-full border border-white/10 text-gray-300 text-sm font-semibold text-center hover:bg-white/[0.03] hover:text-white transition-all duration-200"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}

              {/* Menu items */}
              {isAuthenticated && (
                <>
                  <div className="py-3 space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center gap-4 w-full px-3 py-3.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 text-left"
                      >
                        <item.icon className="h-5 w-5 text-gray-500 shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-white/10 pt-3 mt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 w-full px-3 py-3.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-all duration-200 text-left"
                    >
                      <LogOut className="h-5 w-5 shrink-0" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
