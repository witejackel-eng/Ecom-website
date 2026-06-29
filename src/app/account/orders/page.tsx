"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrdersPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated, isLoading, orders } = state;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
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
              <Package className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">My Orders</h1>
              <p className="text-gray-400 text-sm mt-1">Track and manage your orders</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="glass rounded-[2rem] p-16 text-center glow-tangerine">
              <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No orders yet</h3>
              <p className="text-gray-400 text-sm mb-8">Looks like you haven&apos;t placed any orders. Browse our products to get started.</p>
              <Link
                href="/products"
                className="inline-flex bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any, index: number) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-[rgba(255,138,0,0.45)] transition-all block"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold">{order.orderNumber}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColors[order.deliveryStatus] || "bg-white/5 text-gray-400"}`}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>{new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <span>{order.items?.length || 0} item(s)</span>
                        <span className="text-white font-semibold">₹{order.total?.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-[var(--color-tangerine)] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </main>
  );
}
