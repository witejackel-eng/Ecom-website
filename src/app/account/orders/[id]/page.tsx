"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const paymentStatusColors = {
  paid: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
  refunded: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated, isLoading, orders } = state;
  const order = orders.find((o) => o.id === params.id);

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

  if (!order) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="glass rounded-[2rem] p-12 text-center glow-tangerine max-w-md">
          <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Order Not Found</h2>
          <p className="text-gray-400 text-sm mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/account/orders" className="text-[var(--color-tangerine)] font-semibold hover:underline">Back to Orders</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-4xl mx-auto">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </Link>
        <FadeIn direction="up">
          <div className="glass rounded-[2rem] p-8 glow-tangerine mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">{order.orderNumber}</h1>
                <p className="text-gray-400 text-sm mt-1">Placed on {new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${statusColors[order.deliveryStatus] || "bg-white/5 text-gray-400"}`}>{order.deliveryStatus}</span>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${paymentStatusColors[order.paymentStatus] || "bg-white/5 text-gray-400"}`}>{order.paymentStatus}</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-[2rem] p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-[var(--color-tangerine)]" />
                Order Items
              </h2>

              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <motion.div key={item.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-b-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">{item.model || ""}</p>
                        <p className="text-gray-400 text-xs mt-1">Qty: {item.quantity || 1}</p>
                      </div>
                      <p className="text-white font-semibold text-sm">₹{((item.mrp || 0) * (item.quantity || 1)).toLocaleString("en-IN")}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No item details available.</p>
              )}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{order.subtotal?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">₹{order.tax?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                  <span className="text-gray-300">Total</span>
                  <span className="text-[var(--color-tangerine)]">₹{order.total?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div className="glass rounded-[2rem] p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--color-tangerine)]" />
                Shipping Address
              </h2>
              {order.shippingAddress && Object.keys(order.shippingAddress).length > 0 ? (
                <div className="text-sm text-gray-300 space-y-1">
                  {order.shippingAddress.fullName && <p className="text-white font-medium">{order.shippingAddress.fullName}</p>}
                  {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
                  {order.shippingAddress.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
                  {order.shippingAddress.city && order.shippingAddress.state && (<p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode || ""}</p>)}
                  {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No shipping details available.</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
