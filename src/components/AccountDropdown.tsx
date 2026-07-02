"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  FileText,
  Heart,
  MapPin,
  Building2,
  Lock,
  LogOut,
  ChevronDown,
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

export default function AccountDropdown() {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { user, isAuthenticated } = state;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Keyboard navigation within dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = menuItems.length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < menuItems.length) {
          setIsOpen(false);
          router.push(menuItems[focusedIndex].href);
        }
        break;
    }
  };

  if (!isAuthenticated || !user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    router.push("/");
  };

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setFocusedIndex(-1);
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[rgba(255,138,0,0.35)] transition-all group"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-tangerine)] text-white font-bold text-sm">
          {initials}
        </div>
        <span className="hidden lg:block text-sm text-gray-300 group-hover:text-white transition-colors">
          {user.firstName}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-[340px] rounded-2xl bg-[#0D2530] border border-[rgba(255,138,0,0.18)] backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {/* User info header */}
            <div className="px-4 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-tangerine)] text-white font-bold text-sm">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold text-sm truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2" role="menu" aria-label="Account navigation">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  role="menuitem"
                  tabIndex={focusedIndex === index ? 0 : -1}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 ${
                    focusedIndex === index ? "bg-white/5 text-white" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4 text-gray-500 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all duration-200 w-full text-left"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
