"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

export default function WishlistPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated, isLoading, wishlist } = state;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-28">
        <div className="h-10 w-10 border-4 border-[var(--color-tangerine)] border-t-transparent rounded-full animate-spin mx-auto" />
      </main>
    );
  }

  if (!isAuthenticated || !user) return null;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </Link>

        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.25)]">
              <Heart className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">My Wishlist</h1>
              <p className="text-gray-400 text-sm mt-1">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="glass rounded-[2rem] p-16 text-center glow-tangerine">
              <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Your wishlist is empty</h3>
              <p className="text-gray-400 text-sm mb-8">Save your favourite items here and come back to them anytime.</p>
              <Link
                href="/products"
                className="inline-flex bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl p-5 flex gap-4 group hover:border-[rgba(255,138,0,0.45)] transition-all"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl bg-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-600 text-2xl font-bold">{item.name?.charAt(0) || "P"}</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
                    <p className="text-[var(--color-tangerine)] font-bold text-sm mt-1">
                      ₹{(item.price || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-600 text-[11px] mt-1">
                      Added {new Date(item.addedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-9 w-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 hover:bg-teal-500/20 transition-all"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                      title="Remove from Wishlist"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </main>
  );
}
