"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, User, MapPin, Lock, LogOut, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const accountLinks = [
  { label: "My Orders", href: "/account/orders", icon: Package, description: "View your order history and track shipments" },
  { label: "My Profile", href: "/account/profile", icon: User, description: "Update your personal information" },
  { label: "My Addresses", href: "/account/addresses", icon: MapPin, description: "Manage your shipping addresses" },
  { label: "Change Password", href: "/account/change-password", icon: Lock, description: "Update your account password" },
];

export default function AccountPage() {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { user, isAuthenticated, isLoading } = state;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-[var(--color-tangerine)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-6 text-gray-400 text-sm font-medium">Loading your account...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <FadeIn direction="up">
          {/* Welcome header */}
          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-tangerine)] text-white font-bold text-3xl shadow-lg shadow-tangerine/20 shrink-0">
                {initials}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                  Welcome, {user.firstName}
                </h1>
                <p className="text-gray-400 text-sm mb-4">{user.email}</p>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    {user.emailVerified ? "Verified Account" : "Unverified"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {accountLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-[rgba(255,138,0,0.45)] transition-all duration-300 block"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.2)] group-hover:bg-[var(--color-tangerine)]/20 transition-all shrink-0">
                    <link.icon className="h-5 w-5 text-[var(--color-tangerine)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-[15px] group-hover:text-[var(--color-tangerine)] transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{link.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-[var(--color-tangerine)] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Logout */}
          <div className="text-center">
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm group"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
