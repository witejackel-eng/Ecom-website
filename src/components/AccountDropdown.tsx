"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, MapPin, Lock, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountDropdown() {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { user, isAuthenticated } = state;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const menuItems = [
    { label: "My Profile", href: "/account/profile", icon: User },
    { label: "My Orders", href: "/account/orders", icon: Package },
    { label: "My Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Change Password", href: "/account/change-password", icon: Lock },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[rgba(255,138,0,0.35)] transition-all group"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-tangerine)] text-white font-bold text-sm">
          {initials}
        </div>
        <span className="hidden lg:block text-sm text-gray-300 group-hover:text-white transition-colors">
          {user.firstName}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0D2530] border border-[rgba(255,138,0,0.18)] backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-4 border-b border-white/10">
              <p className="text-white font-semibold text-sm">{user.firstName} {user.lastName}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <item.icon className="h-4 w-4 text-gray-500" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
